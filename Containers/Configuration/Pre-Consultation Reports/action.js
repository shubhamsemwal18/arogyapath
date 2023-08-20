import * as CONSTANTS from "./constant"
 
export function addReport(payload){

    return{
    type:CONSTANTS.ADD_REPORT,
    payload,
    }
}

export function updateReport(payload){
    return{
    type:CONSTANTS.UPDATE_REPORT,
    payload,
    }
}

export function resetToInitialState(){
    return{
        type:CONSTANTS.RESET_TO_INITIAL_STATE,
    }
}
