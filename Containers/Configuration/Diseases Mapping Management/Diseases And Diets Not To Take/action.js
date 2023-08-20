import * as CONSTANTS from "./constant"
 

export function createDiseaseDietNotToTake(payload){
    return{
    type:CONSTANTS.CREATE_DISEASE_WITH_DIETS_NOT_TO_TAKE,
    payload,
    }
}

export function upateDiseaseDietNotToTake(payload){
    return{
    type:CONSTANTS.UPDATE_DISEASE_WITH_DIETS_NOT_TO_TAKE,
    payload,
    }
}

export function getDiseaseDietNotToTake(){
    return{
    type:CONSTANTS.GET_DISEASE_WITH_DIETS_NOT_TO_TAKE,
    }
}


export function resetToInitialState(){
    return{
        type:CONSTANTS.RESET_TO_INITIAL_STATE,
    }
}
