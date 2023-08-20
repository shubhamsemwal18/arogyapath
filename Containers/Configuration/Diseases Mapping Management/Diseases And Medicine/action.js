import * as CONSTANTS from "./constant"
 

export function createDiseasesAndMedicineMaping(payload){
    return{
    type:CONSTANTS.CREATE_DISEASES_AND_MEDICINE_MAPING,
    payload,
    }
}

export function getDiseaseMappedData(payload){
    return{
        type:CONSTANTS.GET_ALL_MAPPED_DISEASESANDMEDICINE,
        payload,
        }
}

export function updateDiseasesAndMedicineMaping(payload){
    return{
    type:CONSTANTS.UPDATE_DISEASES_AND_MEDICINE_MAPING,
    payload,
    }
}

export function resetToInitialState(){
    return{
        type:CONSTANTS.RESET_TO_INITIAL_STATE,
    }
}
