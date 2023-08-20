import * as CONSTANTS from "./constant"
 
export function createQuestion(payload){
    return{
    type:CONSTANTS.CREATE_QUESTION,
    payload,
    }
}

export function updateQuestion(payload){
    return{
    type:CONSTANTS.UPDATE_QUESTION,
    payload,
    }
}

export function resetToInitialState(){
    return{
        type:CONSTANTS.RESET_TO_INITIAL_STATE,
    }
}
