import { LOGIN, LOGOUT } from "../../Contants";

const initialState = {
    logIn: false,
    users: [
        { usrName: 'ahsan', passw: '15c6w8c' },
        { usrName: 'aamir', passw: '1430ce68w' },
        { usrName: 'adil', passw: 'cownc85cw' }
    ],
    currentUser: {}
};

export default (state = initialState, action) => {
    switch (action.type) {
        case LOGIN:
            state = { ...state, logIn: true,currentUser:action.currentUser };
            return state;
        case LOGOUT:
            state = { ...state, logIn: false,currentUser:{} };
            return state;
        default:
            return state;
    }
}