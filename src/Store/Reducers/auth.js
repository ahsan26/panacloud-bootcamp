import { SET_USERS, SET_LOGGED_USER, LOGOUT } from "../../constants";

export default (
  state = { users: {}, loggedUser: {}, isLogged: false },
  action
) => {
  switch (action.type) {
    case SET_USERS:
      state = { ...state, users: action.users };
      return state;
    case SET_LOGGED_USER:
      state = { ...state, loggedUser: action.loggedUser, isLogged: true };
      return state;
    case LOGOUT:
      state = { ...state, isLogged: false, loggedUser: {} };
      return state;
    default:
      return state;
  }
};
