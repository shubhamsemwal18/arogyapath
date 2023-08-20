import * as CONSTANTS from "./constant"
 

export function createDiseaseExerciseInstruction(payload){
    return{
    type:CONSTANTS.CREATE_DISEASE_WITH_EXERCISE_INSTRUCTION,
    payload,
    }
}

export function updateDiseaseExerciseInstruction(payload){
    return{
    type:CONSTANTS.UPDATE_DISEASE_WITH_EXERCISE_INSTRUCTION,
    payload,
    }
}

export function getDiseaseExerciseInstruction(){
    return{
    type:CONSTANTS.GET_DISEASE_MAPPED_EXERCISE_iNSTRUCTION,
    }
}

    export function resetToInitialState(){
    return{
        type:CONSTANTS.RESET_TO_INITIAL_STATE,
    }
}








