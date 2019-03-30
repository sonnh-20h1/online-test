import * as types from './../constants/config';

var initialState = []

var TodoList = (state = initialState , action) =>{
    switch(action.type){
        case types.GET_EXAM:
            state = action.ListQuestion;
            return [...state];
        case types.QUESTION_RESPONSE:
            state = action.QuestionResponse;
            return[...state];
        default:
            return [...state];
    }
}

export default TodoList;