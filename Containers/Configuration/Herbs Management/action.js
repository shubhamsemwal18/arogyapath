import * as CONSTANTS from "./constant"
 
export function createHerbs(payload){
    return{
    type:CONSTANTS.CREATE_HERBS,
    payload,
    }
}

export function updateHerbs(payload){
    return{
    type:CONSTANTS.UPDATE_HERBS,
    payload,
    }
}

export function resetToInitialState(){
    return{
        type:CONSTANTS.RESET_TO_INITIAL_STATE,
    }
}
