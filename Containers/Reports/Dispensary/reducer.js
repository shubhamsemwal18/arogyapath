import * as CONSTANTS from "./constant";
export const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CONSTANTS.GET_DISPENSARY_DATE_WISE_DATA_SUCCESS:
      return {
        ...state,
        getDispensaryDateWiseDataSuccess: action.response,
      };

    case CONSTANTS.GET_DISPENSARY_DATE_WISE_DATA_FAILURE:
      return {
        ...state,
        getDispensaryDateWiseDataFailure: action.error,
      };

    case CONSTANTS.RESET_TO_INITIAL_STATE:
      return {};

    default:
      return state;
  }
};
