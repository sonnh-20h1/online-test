import * as types from './../constants/config';
var initialState = {
    Questions:[],
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