import * as CONSTANTS from "./constant";
export const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    
    // Pulse

    case CONSTANTS.CREATE_DISEASE_WITH_DIETS_TO_TAKE_SUCCESS:
      return {
        ...state,
        createDiseaseDietToTakeSuccess: action.response,
      };

    case CONSTANTS.CREATE_DISEASE_WITH_DIETS_TO_TAKE_FAILURE:
      return {
        ...state,
        createDiseaseDietToTakeFailure: action.error,
      };

      case CONSTANTS.UPDATE_DISEASE_WITH_DIETS_TO_TAKE_SUCCESS:
      return {
        ...state,
        updateDiseaseDietToTakeSuccess: action.response,
      };

    case CONSTANTS.UPDATE_DISEASE_WITH_DIETS_TO_TAKE_FAILURE:
      return {
        ...state,
        updateDiseaseDietToTakeFailure: action.error,
      };

      // Tounge

      case CONSTANTS.GET_DISEASE_WITH_DIETS_TO_TAKE_SUCCESS:
      return {
        ...state,
        getDiseaseDietToTakeSuccess: action.response,
      };

    case CONSTANTS.GET_DISEASE_WITH_DIETS_TO_TAKE_FAILURE:
      return {
        ...state,
        getDiseaseDietToTakeFailure: action.error,
      };

      // End



    case CONSTANTS.RESET_TO_INITIAL_STATE:
      return {};
    default:
      return state;
  }
};
