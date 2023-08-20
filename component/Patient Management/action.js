import * as CONSTANTS from "./constant"
 

export function getAllPatient(payload){
    return{
    type:CONSTANTS.GET_ALL_PATIENT,
    payload
    }
}


export function updatePatient(payload){
    return{
    type:CONSTANTS.UPDATE_PATIENT,
    payload,
    }
}

export function generateNewToken(payload){
    return{
    type:CONSTANTS.GENERATE_NEW_TOKEN,
    payload,
    }
}

export function createNewPatient(payload){
    return{
    type:CONSTANTS.CREATE_PATIENT,
    payload,
    }
}

export function changeResponse(payload){
    return{
    type:CONSTANTS.CHANGE_REG_AND_TOKEN_NO,
    payload,
    }
}

export function resetToInitialState(){
    return{
        type:CONSTANTS.RESET_TO_INITIAL_STATE,
    }
}
