import * as CONSTANTS from "./constant";

export function dashboardAccess() {
  return {
    type: CONSTANTS.DASHBOARD_ACCESS,
  };
}


export function getAllDashboardCounter(){
  return{
    type:CONSTANTS.DASHBOARD_COUNTER_LIST
  }
}
export function getAllRecentPatientList(){
  return{
    type:CONSTANTS.DASHBOARD_RECENT_PATIENT_LIST
  }
}


export function resetToInitialState() {
  return {
    type: CONSTANTS.RESET_TO_INITIAL_STATE,
  };
}
