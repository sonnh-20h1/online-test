import * as types from './../constants/config';
var initialState = {
    Questions:[],
    Exam:{
        id:"",
        name:"",
        time:0,
        random:0,
        List:[]
    },
    status:false
}

var updateStateData = (state = initialState , action) =>{
    switch(action.type){
        case types.UPDATE_STATE_DATA:
            state = action.updateData;
            return {
                ...state
            };
        default:
            return state;
    }
}

export default updateStateData;