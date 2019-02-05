import Todo from "./todo";
import { combineReducers } from "redux";

const RootReducer = combineReducers({ todo: Todo });

export default RootReducer;