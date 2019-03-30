import * as types from './../constants/config';

var initialState = []

var TodoList = (state = initialState , action) =>{
    switch(action.type){
        case types.DETAIL_EXAM:
            state = action.DetailExam
            // console.log(action.DetailExam)
            return [...state];
        default:
            return [...state];
    }
}

export default TodoList;