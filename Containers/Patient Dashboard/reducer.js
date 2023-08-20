import * as CONSTANTS from "./constant";
export const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CONSTANTS.PATIENT_DATE_SUCCESS:
      return {
        ...state,
        getAllDateSuccess: action.response,
      };

    case CONSTANTS.PATIENT_DATE_FAILURE:
      return {
        ...state,
        getAllDateFailure: action.error,
      };
       
    case CONSTANTS.PATIENT_DATEWISE_DATA_SUCCESS:
      return {
        ...state,
        getPatientDatewiseDataSuccess: action.response,
      };

    case CONSTANTS.PATIENT_DATEWISE_DATA_FAILURE:
      return {
        ...state,
        getPatientDatewiseDataFaliure: action.error,
      };

    case CONSTANTS.RESET_TO_INITIAL_STATE:
    return {};

    default:
      return state;
  }
};
