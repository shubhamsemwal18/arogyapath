import * as CONSTANTS from "./constant";
export const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    
    // Pulse

    case CONSTANTS.CREATE_DISEASE_WITH_DIETS_NOT_TO_TAKE_SUCCESS:
      return {
        ...state,
        createDiseaseDietNotToTakeSuccess: action.response,
      };

    case CONSTANTS.CREATE_DISEASE_WITH_DIETS_NOT_TO_TAKE_FAILURE:
      return {
        ...state,
        createDiseaseDietNotToTakeFailure: action.error,
      };

      case CONSTANTS.UPDATE_DISEASE_WITH_DIETS_NOT_TO_TAKE_SUCCESS:
      return {
        ...state,
        updateDiseaseDietNotToTakeSuccess: action.response,
      };

    case CONSTANTS.UPDATE_DISEASE_WITH_DIETS_NOT_TO_TAKE_FAILURE:
      return {
        ...state,
        updateDiseaseDietNotToTakeFailure: action.error,
      };

      // Tounge

      case CONSTANTS.GET_DISEASE_WITH_DIETS_NOT_TO_TAKE_SUCCESS:
      return {
        ...state,
        getDiseaseDietNotToTakeSuccess: action.response,
      };

    case CONSTANTS.GET_DISEASE_WITH_DIETS_NOT_TO_TAKE_FAILURE:
      return {
        ...state,
        getDiseaseDietNotToTakeFailure: action.error,
      };

      // End



    case CONSTANTS.RESET_TO_INITIAL_STATE:
      return {};
    default:
      return state;
  }
};
