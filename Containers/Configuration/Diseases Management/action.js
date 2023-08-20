import * as CONSTANTS from "./constant"
 
export function createDiseases(payload){
    return{
    type:CONSTANTS.CREATE_DISEASES,
    payload,
    }
}

export function updateDiseases(payload){
    return{
    type:CONSTANTS.UPDATE_DISEASES,
    payload,
    }
}

export function resetToInitialState(){
    return{
        type:CONSTANTS.RESET_TO_INITIAL_STATE,
    }
}
