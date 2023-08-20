import * as CONSTANTS from "./constant";
export const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CONSTANTS.CREATE_DISEASE_WITH_EXERCISE_INSTRUCTION_SUCCESS:
      return {
        ...state,
        createDiseaseExerciseInstructionSuccess: action.response,
      };

    case CONSTANTS.CREATE_DISEASE_WITH_EXERCISE_INSTRUCTION_FAILURE:
      return {
        ...state,
        createDiseaseExerciseInstructionFailure: action.error,
      };

      case CONSTANTS.UPDATE_DISEASE_WITH_EXERCISE_INSTRUCTION_SUCCESS:
      return {
        ...state,
        updateDiseaseExerciseInstructionSuccess: action.response,
      };

    case CONSTANTS.UPDATE_DISEASE_WITH_EXERCISE_INSTRUCTION_FAILURE:
      return {
        ...state,
        updateDiseaseExerciseInstructionFailure: action.error,
      };


      case CONSTANTS.GET_DISEASE_MAPPED_EXERCISE_iNSTRUCTION_SUCCESS:
        return {
          ...state,
          getDiseaseExerciseInstructionSuccess: action.response,
        };
  
      case CONSTANTS.GET_DISEASE_MAPPED_EXERCISE_iNSTRUCTION_FAILURE:
        return {
          ...state,
          getDiseaseExerciseInstructionFailure: action.error,
        };
        
    case CONSTANTS.RESET_TO_INITIAL_STATE:
      return {};
    default:
      return state;
  }
};
