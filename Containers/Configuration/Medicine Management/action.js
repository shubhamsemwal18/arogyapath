import * as CONSTANTS from "./constant"
 
export function createMedicine(payload){
    return{
    type:CONSTANTS.CREATE_MEDICINE,
    payload,
    }
}

export function updateMedicine(payload){
    return{
    type:CONSTANTS.UPDATE_MEDICINE,
    payload,
    }
}

export function resetToInitialState(){
    return{
        type:CONSTANTS.RESET_TO_INITIAL_STATE,
    }
}
