import * as CONSTANTS from "./constant"
 

export function createMedicineInstruction(payload){
    return{
    type:CONSTANTS.CREATE_MEDICINE_INSTRUCTION,
    payload,
    }
}

export function updateMedicineInstruction(payload){
    return{
    type:CONSTANTS.UPDATE_MEDICINE_INSTRUCTION,
    payload,
    }
}

export function createExerciseInstruction(payload){
    return{
    type:CONSTANTS.CREATE_EXERCISE_INSTRUCTION,
    payload,
    }
}

export function updateExerciseInstruction(payload){
    return{
    type:CONSTANTS.UPDATE_EXERCISE_INSTRUCTION,
    payload,
    }
}

export function createSpecialInstruction(payload){
    return{
    type:CONSTANTS.CREATE_SPECIAL_INSTRUCTION,
    payload,
    }
}

export function updateSpecialInstruction(payload){
    return{
    type:CONSTANTS.UPDATE_SPECIAL_INSTRUCTION,
    payload,
    }
}


export function resetToInitialState(){
    return{
        type:CONSTANTS.RESET_TO_INITIAL_STATE,
    }
}
