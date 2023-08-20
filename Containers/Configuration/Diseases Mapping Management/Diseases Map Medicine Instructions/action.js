import * as CONSTANTS from "./constant"
 

export function createDiseaseMedicineInstruction(payload){
    return{
    type:CONSTANTS.CREATE_DISEASE_WITH_MEDICINE_INSTRUCTION,
    payload,
    }
}

export function updateDiseaseMedicineInstruction(payload){
    return{
    type:CONSTANTS.UPDATE_DISEASE_WITH_MEDICINE_INSTRUCTION,
    payload,
    }
}

export function getDiseaseMedicineInstruction(){
    return{
    type:CONSTANTS.GET_DISEASE_MAPPED_MEDICINE_iNSTRUCTION,
    }
}

    export function resetToInitialState(){
    return{
        type:CONSTANTS.RESET_TO_INITIAL_STATE,
    }
}








