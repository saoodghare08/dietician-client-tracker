import { compose, createStore, applyMiddleware } from "redux";
import middleware from "./middleware";
import rootReducer from "./reducers";

const composeEnhancers =
  (process.env.NODE_ENV === "development" &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const configureStore = (services) =>
  createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(...middleware.map((f) => f(services))))
  );

export default configureStore;