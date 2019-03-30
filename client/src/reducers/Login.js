import * as types from './../constants/config';

var initialState = []

var TodoList = (state = initialState, action) => {
    switch (action.type) {
        case types.LOGIN_USER:
            state = action.Users;
            return [...state];
        case types.SIGNUP_USER:
            state = action.User;
            return [...state];
        default:
            return [...state];
    }
}

export default TodoList;