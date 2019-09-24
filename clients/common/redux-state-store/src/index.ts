import reducers from "client-common-redux-state-reducers";
import {
  Action,
  applyMiddleware,
  combineReducers,
  createStore,
  Middleware
} from "redux";
import { composeWithDevTools as compose } from "redux-devtools-extension";
import storage from "redux-storage";
import filter from "redux-storage-decorator-filter";
import createEngine from "redux-storage-engine-reactnativeasyncstorage";
import io from "socket.io-client";
import config from "./config";
import parseUrl from "./parse";

const engine: storage.StorageEngine = filter(
  createEngine("redux"),
  [],
  ["user"]
);
const storageMiddleware: Middleware = storage.createMiddleware(engine);

const composeEnhancers = compose({
  actionsBlacklist: ["REDUX_STORAGE_SAVE"] // , "REDUX_STORAGE_LOAD"]
});

let socket: SocketIOClient.Socket;
const queue: Action[] = [];
const socketIoMiddleware: Middleware = () => {
  return next => action => {
    if (
      typeof action.type === "string" &&
      action.type.substring(0, 7) === "server/"
    ) {
      if (socket === undefined) {
        queue.push(action);
      } else {
        socket.emit(action.type, action.data);
      }
    }
    next(action);
  };
};

const store = createStore(
  storage.reducer(
    combineReducers({
      ...reducers
    })
  ),
  composeEnhancers(applyMiddleware(socketIoMiddleware, storageMiddleware))
);

const load: storage.Loader<{}> = storage.createLoader(engine);
load(store)
  // eslint-disable-next-line no-console
  .then(console.debug);

config("/config").then(config => {
  console.log(parseUrl(config.socketIO).toString());
  socket = io(parseUrl(config.socketIO).toString());
  socket.on("action", action => {
    store.dispatch(action);
  });
  for (let i = queue.length; i > 0; i++) {
    store.dispatch(queue.pop());
  }
});

export default store;
