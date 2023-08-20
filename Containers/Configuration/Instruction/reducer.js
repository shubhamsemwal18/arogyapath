import * as CONSTANTS from "./constant";
export const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    
    
    case CONSTANTS.CREATE_MEDICINE_INSTRUCTION_SUCCESS:
      return {
        ...state,
        createMedicineInstructionSuccess: action.response,
      };

    case CONSTANTS.CREATE_MEDICINE_INSTRUCTION_FAILURE:
      return {
        ...state,
        createMedicineInstructionFailure: action.error,
      };

      case CONSTANTS.UPDATE_MEDICINE_INSTRUCTION_SUCCESS:
      return {
        ...state,
        updateMedicineInstructionSuccess: action.response,
      };

    case CONSTANTS.UPDATE_MEDICINE_INSTRUCTION_FAILURE:
      return {
        ...state,
        updateMedicineInstructionFailure: action.error,
      };

      // Exercise

      case CONSTANTS.CREATE_EXERCISE_INSTRUCTION_SUCCESS:
      return {
        ...state,
        createExerciseInstructionSuccess: action.response,
      };

    case CONSTANTS.CREATE_EXERCISE_INSTRUCTION_FAILURE:
      return {
        ...state,
        createExerciseInstructionFailure: action.error,
      };

      case CONSTANTS.UPDATE_EXERCISE_INSTRUCTION_SUCCESS:
      return {
        ...state,
        updateExerciseInstructionSuccess: action.response,
      };

    case CONSTANTS.UPDATE_EXERCISE_INSTRUCTION_FAILURE:
      return {
        ...state,
        updateExerciseInstructionFailure: action.error,
      };

      // Special

      
      case CONSTANTS.CREATE_SPECIAL_INSTRUCTION_SUCCESS:
      return {
        ...state,
        createSpecialInstructionSuccess: action.response,
      };

    case CONSTANTS.CREATE_SPECIAL_INSTRUCTION_FAILURE:
      return {
        ...state,
        createSpecialInstructionFailure: action.error,
      };

      case CONSTANTS.UPDATE_SPECIAL_INSTRUCTION_SUCCESS:
      return {
        ...state,
        updateSpecialInstructionSuccess: action.response,
      };

    case CONSTANTS.UPDATE_SPECIAL_INSTRUCTION_FAILURE:
      return {
        ...state,
        updateSpecialInstructionFailure: action.error,
      };

      // End



    case CONSTANTS.RESET_TO_INITIAL_STATE:
      return {};
    default:
      return state;
  }
};
