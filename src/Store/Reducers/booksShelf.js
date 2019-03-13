import { CHANGE_CURRENTLY_READING, CHANGE_READ, CHANGE_WANT_TO_READ } from "../constants";

export default (state = { wantToRead: [], read: [], currentlyReading:[] }, action) => {
    switch (action.type) {
        case CHANGE_CURRENTLY_READING:
            state = { ...state, currentlyReading: action.currnetlyReadingBooks };
            return state;
        case CHANGE_READ:
            state = { ...state, read: action.readBooks };
            return state;
        case CHANGE_WANT_TO_READ:
            state = { ...state, wantToRead: action.wantToReadBooks };
            return state;
        default:
            return state;
    }
};