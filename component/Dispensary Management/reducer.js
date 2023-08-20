import * as CONSTANTS from "./constant";
export const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CONSTANTS.CREATE_DISPENSARY_SUCCESS:
      return {
        ...state,
        createDispensarySuccess: action.response,
      };

    case CONSTANTS.CREATE_DISPENSARY_FAILURE:
      return {
        ...state,
        createDispensaryFailure: action.error,
      };

    case CONSTANTS.RESET_TO_INITIAL_STATE:
      return {};
    default:
      return state;
  }
};
