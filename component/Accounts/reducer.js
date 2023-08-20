import * as CONSTANTS from "./constant";
export const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CONSTANTS.CREATE_ACCOUNTS_SUCCESS:
      return {
        ...state,
        createAccountsSuccess: action.response,
      };

    case CONSTANTS.CREATE_ACCOUNTS_FAILURE:
      return {
        ...state,
        createAccountsFailure: action.error,
      };

    case CONSTANTS.RESET_TO_INITIAL_STATE:
      return {};
    default:
      return state;
  }
};
