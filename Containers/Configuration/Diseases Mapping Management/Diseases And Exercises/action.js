import * as CONSTANTS from "./constant"
 

export function diseasesExercises(payload){
    return{
    type:CONSTANTS.CREATE_DISEASES_AND_EXERCISES_MAPING,
    payload,
    }
}

export function updateDiseasesExercises(payload){
    return{
    type:CONSTANTS.UPDATE_DISEASES_AND_EXERCISES_MAPING,
    payload,
    }
}


export function resetToInitialState(){
    return{
        type:CONSTANTS.RESET_TO_INITIAL_STATE,
    }
}
