import Auth from "./auth";
import Errors from "./error";
import { combineReducers } from "redux";

const RootReducer = combineReducers({ Auth, Errors });

export default RootReducer;