import * as CONSTANTS from "./constant"
 

export function createDiseaseTimeTable(payload){
    return{
    type:CONSTANTS.CREATE_DISEASE_WITH_TIME_TABLE,
    payload,
    }
}

export function updateDiseaseTimeTable(payload){
    return{
    type:CONSTANTS.UPDATE_DISEASE_WITH_TIME_TABLE,
    payload,
    }
}

export function getDiseaseTimeTable(){
    return{
    type:CONSTANTS.GET_DISEASE_MAPPED_TIME_TABLE,
    }
}


    export function resetToInitialState(){
    return{
        type:CONSTANTS.RESET_TO_INITIAL_STATE,
    }
}


export function getDiseaseBasedMedicine(payload){
    return{
    type:CONSTANTS.GET_DISEASE_MAPPED_MEDICINE,
    payload,
    }
}








