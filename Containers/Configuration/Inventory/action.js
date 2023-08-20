import * as CONSTANTS from "./constant"
 
export function addInventory(payload){
    return{
    type:CONSTANTS.ADD_INVENTORY,
    payload,
    }
}

export function resetToInitialState(){
    return{
        type:CONSTANTS.RESET_TO_INITIAL_STATE,
    }
}
