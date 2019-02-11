import { LOGIN, LOGOUT } from "../../Contants";

export default class AuthActions {
    static Login(currentUser) {
        return dispatch => {
            dispatch({
                type: LOGIN,
                currentUser
            });
        }
    }
    static LogOut() {
        return dispatch => {
            dispatch({
                type: LOGOUT
            });
        }
    };
}