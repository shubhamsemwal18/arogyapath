import * as CONSTANTS from "./constant"
 

export function createDiseaseDietToTake(payload){
    return{
    type:CONSTANTS.CREATE_DISEASE_WITH_DIETS_TO_TAKE,
    payload,
    }
}

export function upateDiseaseDietToTake(payload){
    return{
    type:CONSTANTS.UPDATE_DISEASE_WITH_DIETS_TO_TAKE,
    payload,
    }
}

export function GetDiseaseDietToTake(){
  
    return{
    type:CONSTANTS.GET_DISEASE_WITH_DIETS_TO_TAKE,
    }
}


export function resetToInitialState(){
    return{
        type:CONSTANTS.RESET_TO_INITIAL_STATE,
    }
}
