import * as types from './../constants/config';

var initialState = []

var TodoList = (state = initialState , action) =>{
    switch(action.type){
        case types.TODO_LIST:
            state = action.exams;
            return [...state];
        default:
            return [...state];
    }
}

export default TodoList;