import * as CONSTANTS from "./constant"
 

export function createDiseaseSpecialInstruction(payload){
    return{
    type:CONSTANTS.CREATE_DISEASE_WITH_SPECIAL_INSTRUCTION,
    payload,
    }
}

export function updateDiseaseSpecialInstruction(payload){
    return{
    type:CONSTANTS.UPDATE_DISEASE_WITH_SPECIAL_INSTRUCTION,
    payload,
    }
}

export function getDiseaseSpecialInstruction(){
    return{
    type:CONSTANTS.GET_DISEASE_MAPPED_SPECIAL_iNSTRUCTION,
    }
}

    export function resetToInitialState(){
    return{
        type:CONSTANTS.RESET_TO_INITIAL_STATE,
    }
}








