import * as CONSTANTS from "./constant";
export const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CONSTANTS.CREATE_DISEASE_WITH_SPECIAL_INSTRUCTION_SUCCESS:
      return {
        ...state,
        createDiseaseSpecialInstructionSuccess: action.response,
      };

    case CONSTANTS.CREATE_DISEASE_WITH_SPECIAL_INSTRUCTION_FAILURE:
      return {
        ...state,
        createDiseaseSpecialInstructionFailure: action.error,
      };

      case CONSTANTS.UPDATE_DISEASE_WITH_SPECIAL_INSTRUCTION_SUCCESS:
      return {
        ...state,
        updateDiseaseSpecialInstructionSuccess: action.response,
      };

    case CONSTANTS.UPDATE_DISEASE_WITH_SPECIAL_INSTRUCTION_FAILURE:
      return {
        ...state,
        updateDiseaseSpecialInstructionFailure: action.error,
      };


      case CONSTANTS.GET_DISEASE_MAPPED_SPECIAL_iNSTRUCTION_SUCCESS:
        return {
          ...state,
          getDiseaseSpecialInstructionSuccess: action.response,
        };
  
      case CONSTANTS.GET_DISEASE_MAPPED_SPECIAL_iNSTRUCTION_FAILURE:
        return {
          ...state,
          getDiseaseSpecialInstructionFailure: action.error,
        };
        
    case CONSTANTS.RESET_TO_INITIAL_STATE:
      return {};
    default:
      return state;
  }
};
