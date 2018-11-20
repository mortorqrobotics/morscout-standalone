import { createStore, combineReducers, applyMiddleware } from "redux";
import createSocketIoMiddleware from "redux-socket.io";
import io from "socket.io-client";
import { composeWithDevTools as compose } from "redux-devtools-extension";
import reducers from "reducers";

// eslint-disable-next-line no-underscore-dangle
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const socketIoMiddleware = createSocketIoMiddleware(
  io("http://localhost:3002/io"),
  "server/",
  {
    execute: (action, emit, next) => {
      const { data } = action;
      const type = action.type
        .split("/")
        .splice(1)
        .join("/");
      emit(type, data);
      next(action);
    },
  },
);
export default createStore(
  combineReducers({
    ...reducers,
  }),
  // JSON.parse(window.localStorage.getItem('state') | '{matches:[], match: {}}'),
  composeEnhancers(applyMiddleware(socketIoMiddleware)),
);
// export default applyMiddleware(socketIoMiddleware)(createStore)(combineReducers(reducers))
