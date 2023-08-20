import * as CONSTANTS from "./constant";

export function getDispensaryDatewiseData(payload){
    return{
      type:CONSTANTS.GET_DISPENSARY_DATE_WISE_DATA,
      payload,
    }
  }


  export function resetToInitialState(){
    return{
        type:CONSTANTS.RESET_TO_INITIAL_STATE,
    }
}