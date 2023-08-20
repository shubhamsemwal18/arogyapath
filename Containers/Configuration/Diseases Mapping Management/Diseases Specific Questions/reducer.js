import * as CONSTANTS from "./constant";
export const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CONSTANTS.CREATE_DISEASE_WITH_SPECIFIC_QUESTION_SUCCESS:
      return {
        ...state,
        createDiseaseSpecificQuestionsSuccess: action.response,
      };

    case CONSTANTS.CREATE_DISEASE_WITH_SPECIFIC_QUESTION_FAILURE:
      return {
        ...state,
        createDiseaseSpecificQuestionsFailure: action.error,
      };

      case CONSTANTS.UPDATE_DISEASE_WITH_SPECIFIC_QUESTION_SUCCESS:
      return {
        ...state,
        updateDiseaseSpecificQuestionsSuccess: action.response,
      };

    case CONSTANTS.UPDATE_DISEASE_WITH_SPECIFIC_QUESTION_FAILURE:
      return {
        ...state,
        updateDiseaseSpecificQuestionsFailure: action.error,
      };


      case CONSTANTS.GET_DISEASE_MAPPED_SPECIFIC_QUESTION_SUCCESS:
        return {
          ...state,
          getDiseaseSpecificQuestionsSuccess: action.response,
        };
  
      case CONSTANTS.GET_DISEASE_MAPPED_SPECIFIC_QUESTION_FAILURE:
        return {
          ...state,
          getDiseaseSpecificQuestionsFailure: action.error,
        };
        
    case CONSTANTS.RESET_TO_INITIAL_STATE:
      return {};
    default:
      return state;
  }
};
