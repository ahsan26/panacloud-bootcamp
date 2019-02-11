import { ADDERROR, REMOVEERROR, REMOVEERRORS } from "../../Contants";

export default (state = { hasError: false, error: {} }, action) => {
    switch (action.type) {
        case ADDERROR:
            state = { ...state, hasError: true, error: action.error };
            return state;
        case REMOVEERROR:
            state = { ...state, hasError: Object.keys(action.error).length > 0 ? true : false, error: action.error };
        case REMOVEERRORS:
            state = { ...state, hasError: false, error: {} };
            return state;
        default:
            return state;
    }
};