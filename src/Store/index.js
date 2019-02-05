import { createStore, applyMiddleware } from "redux";
import RootReducer from "./Reducers";
import thunk from "redux-thunk"; // Middleware for handing ASYNC Functions
import logger from "redux-logger"; // Middleware for logging redux actions

const Store = createStore(
    RootReducer, // We can also add our Todo Reducer here Directly Because currently we only have one reducer so if we have one one reducers it is not complsory to combine reducers  
    {},
    applyMiddleware(thunk, logger)
);

export default Store;