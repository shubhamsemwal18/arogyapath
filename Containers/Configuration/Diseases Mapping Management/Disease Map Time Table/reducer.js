import * as CONSTANTS from "./constant";
export const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CONSTANTS.CREATE_DISEASE_WITH_TIME_TABLE_SUCCESS:
      return {
        ...state,
        createDiseaseTimeTableSuccess: action.response,
      };

    case CONSTANTS.CREATE_DISEASE_WITH_TIME_TABLE_FAILURE:
      return {
        ...state,
        createDiseaseTimeTableFailure: action.error,
      };

      case CONSTANTS.UPDATE_DISEASE_WITH_TIME_TABLE_SUCCESS:
      return {
        ...state,
        updateDiseaseTimeTableSuccess: action.response,
      };

    case CONSTANTS.UPDATE_DISEASE_WITH_TIME_TABLE_FAILURE:
      return {
        ...state,
        updateDiseaseTimeTableFailure: action.error,
      };


      case CONSTANTS.GET_DISEASE_MAPPED_TIME_TABLE_SUCCESS:
        return {
          ...state,
          getDiseaseTimeTableSuccess: action.response,
        };
  
      case CONSTANTS.GET_DISEASE_MAPPED_TIME_TABLE_FAILURE:
        return {
          ...state,
          getDiseaseTimeTableFailure: action.error,
        };

        
      case CONSTANTS.GET_DISEASE_MAPPED_MEDICINE_SUCCESS:
        return {
          ...state,
          getDiseaseMedicineSuccess: action.response,
        };
  
      case CONSTANTS.GET_DISEASE_MAPPED_MEDICINE_FAILURE:
        return {
          ...state,
          getDiseaseMedicineFailure: action.error,
        };
        
        
    case CONSTANTS.RESET_TO_INITIAL_STATE:
      return {};
    default:
      return state;
  }
};
