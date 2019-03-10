import { createStore, combineReducers, applyMiddleware } from "redux";
import createSocketIoMiddleware from "redux-socket.io";
import io from "socket.io-client";
import { composeWithDevTools as compose } from "redux-devtools-extension";
import * as storage from "redux-storage";
import createEngine from "redux-storage-engine-reactnativeasyncstorage";
import filter from "redux-storage-decorator-filter";
import reducers from "reducers";

const engine = filter(createEngine("redux"), [], ["user"]);
const storageMiddleware = storage.createMiddleware(engine);

const composeEnhancers = compose({
  actionsBlacklist: ["REDUX_STORAGE_SAVE"] // , "REDUX_STORAGE_LOAD"]
});

const socket = io("http://localhost:3030");
const socketIoMiddleware = createSocketIoMiddleware(socket, "server/", {
  execute: (action, emit, next) => {
    const { data } = action;
    const type = action.type
      .split("/")
      .splice(1)
      .join("/");
    emit(type, data);
    next(action);
  }
});
const store = createStore(
  storage.reducer(
    combineReducers({
      ...reducers
    })
  ),
  // JSON.parse(window.localStorage.getItem('state') | '{matches:[], match: {}}'),
  composeEnhancers(applyMiddleware(socketIoMiddleware, storageMiddleware))
);
// export default applyMiddleware(socketIoMiddleware)(createStore)(combineReducers(reducers))

const load = storage.createLoader(engine);
load(store)
  // eslint-disable-next-line no-console
  .then(console.debug)
  // eslint-disable-next-line no-console
  .catch(console.debug);

export default store;
