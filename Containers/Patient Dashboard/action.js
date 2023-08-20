import * as CONSTANTS from "./constant";

export function getAllPatientDate(){
    return{
      type:CONSTANTS.PATIENT_DATE
    }
  }


export function getAllPatientDateWiseData(date){
  return{
    type:CONSTANTS.PATIENT_DATEWISE_DATA,
    date
  }
}

export function resetToInitialState(){
  return{
      type:CONSTANTS.RESET_TO_INITIAL_STATE,
  }
}