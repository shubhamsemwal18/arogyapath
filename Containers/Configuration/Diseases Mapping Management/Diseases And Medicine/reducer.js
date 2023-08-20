import * as CONSTANTS from "./constant";
export const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CONSTANTS.CREATE_DISEASES_AND_MEDICINE_MAPING_SUCCESS:
      return {
        ...state,
        createDiseasesAndMedicineMapingSuccess: action.response,
      };

    case CONSTANTS.CREATE_DISEASES_AND_MEDICINE_MAPING_FAILURE:
      return {
        ...state,
        createDiseasesAndMedicineMapingFailure: action.error,
      };

      case CONSTANTS.UPDATE_DISEASES_AND_MEDICINE_MAPING_SUCCESS:
      return {
        ...state,
        updateDiseasesAndMedicineMapingSuccess: action.response,
      };

    case CONSTANTS.UPDATE_DISEASES_AND_MEDICINE_MAPING_FAILURE:
      return {
        ...state,
        updateDiseasesAndMedicineMapingFailure: action.error,
      };

      case CONSTANTS.GET_ALL_MAPPED_DISEASESANDMEDICINE_SUCCESS:
      return {
        ...state,
        getAllMappedDiseasesAndMedicineSuccess: action.response,
      };

    case CONSTANTS.GET_ALL_MAPPED_DISEASESANDMEDICINE_FAILURE:
      return {
        ...state,
        getAllMappedDiseasesAndMedicineFailure: action.error,
      };

    case CONSTANTS.RESET_TO_INITIAL_STATE:
      return {};
    default:
      return state;
  }
};
