import * as types from './../constants/config';

var initialState = []

var TodoList = (state = initialState , action) =>{
    switch(action.type){
        case types.GET_ANSER:
            state = action.answer;
            return [...state];
        default:
            return [...state];
    }
}

export default TodoList;