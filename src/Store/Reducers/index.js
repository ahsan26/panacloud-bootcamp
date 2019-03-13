import {combineReducers,compose} from "redux"
import BookShelf from "./booksShelf";

export  default combineReducers({bookShelf: BookShelf});