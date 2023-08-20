import * as CONSTANTS from "./constant";
export const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CONSTANTS.CREATE_HERBS_SUCCESS:
      return {
        ...state,
        createHerbsSuccess: action.response,
      };

    case CONSTANTS.CREATE_HERBS_FAILURE:
      return {
        ...state,
        createHerbsFailure: action.error,
      };

      case CONSTANTS.UPDATE_HERBS_SUCCESS:
      return {
        ...state,
        updateHerbsSuccess: action.response,
      };

    case CONSTANTS.UPDATE_HERBS_FAILURE:
      return {
        ...state,
        updateHerbsFailure: action.error,
      };

    case CONSTANTS.RESET_TO_INITIAL_STATE:
      return {};
    default:
      return state;
  }
};
