import { SET_USERS, SET_LOGGED_USER, LOGOUT } from "../../constants";

export const setUsers = users => dispatch => {
  dispatch({
    type: SET_USERS,
    users
  });
};

export const setLoggedUser = loggedUser => dispatch => {
  console.log("action", loggedUser);
  dispatch({
    type: SET_LOGGED_USER,
    loggedUser
  });
};

export const logOut = _ => dispatch => {
  dispatch({
    type: LOGOUT
  });
};
