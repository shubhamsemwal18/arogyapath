import * as CONSTANTS from "./constant";
export const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CONSTANTS.CREATE_DIETS_TO_TAKE_SUCCESS:
      return {
        ...state,
        createDietsToTakeSuccess: action.response,
      };

    case CONSTANTS.CREATE_DIETS_TO_TAKE_FAILURE:
      return {
        ...state,
        createDietsToTakeFailure: action.error,
      };

      case CONSTANTS.UPDATE_DIETS_TO_TAKE_SUCCESS:
      return {
        ...state,
        updateDietsToTakeSuccess: action.response,
      };

    case CONSTANTS.UPDATE_DIETS_TO_TAKE_FAILURE:
      return {
        ...state,
        updateDietsToTakeFailure: action.error,
      };



      case CONSTANTS.CREATE_DIETS_NOT_TO_TAKE_SUCCESS:
        return {
          ...state,
          createDietsNotToTakeSuccess: action.response,
        };
  
      case CONSTANTS.CREATE_DIETS_NOT_TO_TAKE_FAILURE:
        return {
          ...state,
          createDietsNotToTakeFailure: action.error,
        };
  
        case CONSTANTS.UPDATE_DIETS_NOT_TO_TAKE_SUCCESS:
        return {
          ...state,
          updateDietsNotToTakeSuccess: action.response,
        };
  
      case CONSTANTS.UPDATE_DIETS_NOT_TO_TAKE_FAILURE:
        return {
          ...state,
          updateDietsNotToTakeFailure: action.error,
        };
  

    case CONSTANTS.RESET_TO_INITIAL_STATE:
      return {};
    default:
      return state;
  }
};
