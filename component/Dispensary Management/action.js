import * as CONSTANTS from "./constant"
 
export function createDispansary(payload){
    return{
    type:CONSTANTS.CREATE_DISPENSARY,
    payload,
    }
}

export function resetToInitialState(){
    return{
        type:CONSTANTS.RESET_TO_INITIAL_STATE,
    }
}
