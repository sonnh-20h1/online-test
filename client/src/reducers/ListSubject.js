import * as types from './../constants/config';

var initialState = []

var TodoList = (state = initialState, action) => {
    switch (action.type) {
        case types.LIST_SUB:
            // console.log(action)
            state = action.subjects
            return [...state];
        default:
            return [...state];
    }
}

export default TodoList;