import * as CONSTANTS from "./constant";
export const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CONSTANTS.CREATE_DISEASE_WITH_MEDICINE_INSTRUCTION_SUCCESS:
      return {
        ...state,
        createDiseaseMedicineInstructionSuccess: action.response,
      };

    case CONSTANTS.CREATE_DISEASE_WITH_MEDICINE_INSTRUCTION_FAILURE:
      return {
        ...state,
        createDiseaseMedicineInstructionFailure: action.error,
      };

      case CONSTANTS.UPDATE_DISEASE_WITH_MEDICINE_INSTRUCTION_SUCCESS:
      return {
        ...state,
        updateDiseaseMedicineInstructionSuccess: action.response,
      };

    case CONSTANTS.UPDATE_DISEASE_WITH_MEDICINE_INSTRUCTION_FAILURE:
      return {
        ...state,
        updateDiseaseMedicineInstructionFailure: action.error,
      };


      case CONSTANTS.GET_DISEASE_MAPPED_MEDICINE_iNSTRUCTION_SUCCESS:
        return {
          ...state,
          getDiseaseMedicineInstructionSuccess: action.response,
        };
  
      case CONSTANTS.GET_DISEASE_MAPPED_MEDICINE_iNSTRUCTION_FAILURE:
        return {
          ...state,
          getDiseaseMedicineInstructionFailure: action.error,
        };
        
    case CONSTANTS.RESET_TO_INITIAL_STATE:
      return {};
    default:
      return state;
  }
};
