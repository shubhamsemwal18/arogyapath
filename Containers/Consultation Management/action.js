import * as CONSTANTS from "./constant"
 

export function registerConsultation(payload){
    return{
    type:CONSTANTS.REGISTER_CONSULTATION,
    payload,
    }
}

export function getPatientDetails(payload){
    return{
    type:CONSTANTS.GET_PATIENT_DETAILS_FOR_CONSULTATION,
    payload,
    }
}

export function getDiseaseSpecificAllData(payload){
    return{
    type:CONSTANTS.GET_DISEASE_SPECIFIC_ALL_DATA,
    payload,
    }
}

export function getAllCommonData(){
    return{
    type:CONSTANTS.GET_ALL_COMMON_DATA,
    }
}

export function resetToInitialState(){
    return{
        type:CONSTANTS.RESET_TO_INITIAL_STATE,
    }
}
