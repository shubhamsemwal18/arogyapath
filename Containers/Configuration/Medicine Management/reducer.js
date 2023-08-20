import * as CONSTANTS from "./constant";
export const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CONSTANTS.CREATE_MEDICINE_SUCCESS:
      return {
        ...state,
        createMedicineSuccess: action.response,
      };

    case CONSTANTS.CREATE_MEDICINE_FAILURE:
      return {
        ...state,
        createMedicineFailure: action.error,
      };

      case CONSTANTS.UPDATE_MEDICINE_SUCCESS:
      return {
        ...state,
        updateMedicineSuccess: action.response,
      };

    case CONSTANTS.UPDATE_MEDICINE_FAILURE:
      return {
        ...state,
        updateMedicineFailure: action.error,
      };


    case CONSTANTS.RESET_TO_INITIAL_STATE:
      return {};
    default:
      return state;
  }
};
