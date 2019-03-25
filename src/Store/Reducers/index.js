import Auth from "./auth";
import Poll from "./poll";
import { combineReducers } from "redux";

export default combineReducers({ auth: Auth, poll: Poll });
