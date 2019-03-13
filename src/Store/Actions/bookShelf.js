import { CHANGE_CURRENTLY_READING, CHANGE_READ, CHANGE_WANT_TO_READ } from "../constants";

export const changeRead = (readBooks) => dispatch => dispatch({ type: CHANGE_READ, readBooks });
export const changeWantTORead = (wantToReadBooks) => dispatch => dispatch({ type: CHANGE_WANT_TO_READ, wantToReadBooks });
export const changeCurrentlyReading = (currnetlyReadingBooks) => dispatch => dispatch({ type: CHANGE_CURRENTLY_READING, currnetlyReadingBooks });