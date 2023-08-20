import * as CONSTANTS from "./constant";
export const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CONSTANTS.CREATE_DISEASES_SUCCESS:
      return {
        ...state,
        createDiseasesSuccess: action.response,
      };

    case CONSTANTS.CREATE_DISEASES_FAILURE:
      return {
        ...state,
        createDiseasesFailure: action.error,
      };

      case CONSTANTS.UPDATE_DISEASES_SUCCESS:
      return {
        ...state,
        updateDiseasesSuccess: action.response,
      };

    case CONSTANTS.UPDATE_DISEASES_FAILURE:
      return {
        ...state,
        updateDiseasesFailure: action.error,
      };
      

    case CONSTANTS.RESET_TO_INITIAL_STATE:
      return {};
    default:
      return state;
  }
};
