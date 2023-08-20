import * as CONSTANTS from "./constant"
 

export function createDiseaseSpecificQuestions(payload){
    return{
    type:CONSTANTS.CREATE_DISEASE_WITH_SPECIFIC_QUESTION,
    payload,
    }
}

export function updateDiseaseSpecificQuestions(payload){
    return{
    type:CONSTANTS.UPDATE_DISEASE_WITH_SPECIFIC_QUESTION,
    payload,
    }
}

export function getDiseaseSpecificQuestions(){
    return{
    type:CONSTANTS.GET_DISEASE_MAPPED_SPECIFIC_QUESTION,
    }
}

    export function resetToInitialState(){
    return{
        type:CONSTANTS.RESET_TO_INITIAL_STATE,
    }
}








