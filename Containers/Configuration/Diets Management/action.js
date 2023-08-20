import * as CONSTANTS from "./constant"
 

export function createDietsToTake(payload){
    return{
    type:CONSTANTS.CREATE_DIETS_TO_TAKE,
    payload,
    }
}

export function updateDietsToTake(payload){
    return{
    type:CONSTANTS.UPDATE_DIETS_TO_TAKE,
    payload,
    }
}

export function createDietsNotToTake(payload){
    return{
    type:CONSTANTS.CREATE_DIETS_NOT_TO_TAKE,
    payload,
    }
}

export function updateDietsNotToTake(payload){
    return{
    type:CONSTANTS.UPDATE_DIETS_NOT_TO_TAKE,
    payload,
    }
}





export function resetToInitialState(){
    return{
        type:CONSTANTS.RESET_TO_INITIAL_STATE,
    }
}
