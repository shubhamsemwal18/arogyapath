import * as CONSTANTS from "./constant";
export const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CONSTANTS.DASHBOARD_ACCESS_SUCCESS:
      return {
        ...state,
        AccessDashboardSuccess: action.response,
      };

    case CONSTANTS.DASHBOARD_ACCESS_FAILURE:
      return {
        ...state,
        AccessDashboardFailure: action.error,
      };
      case CONSTANTS.DASHBOARD_COUNTER_SUCCESS:
        return{
          ...state,
          getAllCountersSuccess:action.response
        }
      
      case CONSTANTS.DASHBOARD_COUNTER_FAILURE:
        return{
          ...state,
          getAllCountersFailure:action.error

        }

        case CONSTANTS.DASHBOARD_RECENT_PATIENT_SUCCESS:
          return{
            ...state,
            getRecentPatientSuccess:action.response
          }
        
        case CONSTANTS.DASHBOARD_RECENT_PATIENT_FAILURE:
          return{
            ...state,
            getRecentPatientFailure:action.error
  
          }



    case CONSTANTS.RESET_TO_INITIAL_STATE:
      return {};
    default:
      return state;
  }
};
