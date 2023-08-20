import * as CONSTANTS from "./constant";

export function getAccountsDatewiseData(payload){
    return{
      type:CONSTANTS.GET_ACCOUNTS_DATE_WISE_DATA,
      payload,
    }
  }


  export function resetToInitialState(){
    return{
        type:CONSTANTS.RESET_TO_INITIAL_STATE,
    }
}