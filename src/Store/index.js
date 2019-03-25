import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import RootReducer from "./Reducers";
import logger from "redux-logger";

export default createStore(RootReducer, {}, applyMiddleware(thunk, logger));
