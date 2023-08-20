import * as CONSTANTS from "./constant"
 
// pehla obj for creating medicine
export function createExercise(payload){
    return{
    type:CONSTANTS.CREATE_EXERCISES,
    payload,
    }
}

export function getAllExercisesList(){
    return{
        type:CONSTANTS.GET_ALL_EXERCISES,
    }
}
// dusra form ko khali karane k liye reset to intial state

export function resetToInitialState(){
    return{
        type:CONSTANTS.RESET_TO_INITIAL_STATE,
    }
}
