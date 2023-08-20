import * as CONSTANTS from "./constant"
 
export function createAccounts(payload){
    return{
    type:CONSTANTS.CREATE_ACCOUNTS,
    payload,
    }
}

export function resetToInitialState(){
    return{
        type:CONSTANTS.RESET_TO_INITIAL_STATE,
    }
}
