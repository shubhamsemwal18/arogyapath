import * as CONSTANTS from "./constant";
export const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CONSTANTS.ADD_REPORT_SUCCESS:
      return {
        ...state,
        addReportSuccess: action.response,
      };

    case CONSTANTS.ADD_REPORT_FAILURE:
      return {
        ...state,
        addReportFailure: action.error,
      };

      case CONSTANTS.UPDATE_REPORT_SUCCESS:
      return {
        ...state,
        updateReportSuccess: action.response,
      };

    case CONSTANTS.UPDATE_REPORT_FAILURE:
      return {
        ...state,
        updateReportFailure: action.error,
      };

    case CONSTANTS.RESET_TO_INITIAL_STATE:
      return {};
    default:
      return state;
  }
};
