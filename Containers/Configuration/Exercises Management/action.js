import * as CONSTANTS from "./constant"
 
export function createExercise(payload){
    return{
    type:CONSTANTS.CREATE_EXERCISES,
    payload,
    }
}

export function updateExercise(payload){
    return{
    type:CONSTANTS.UPDATE_EXERCISES,
    payload,
    }
}

export function resetToInitialState(){
    return{
        type:CONSTANTS.RESET_TO_INITIAL_STATE,
    }
}
