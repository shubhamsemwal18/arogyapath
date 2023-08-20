import * as CONSTANTS from "./constant";
export const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {

    case CONSTANTS.REGISTER_CONSULTATION_SUCCESS:
      return {
        ...state,
        registerConsultationSuccess: action.response,
      };

    case CONSTANTS.REGISTER_CONSULTATION_FAILURE:
      return {
        ...state,
        registerConsultationFailure: action.error,
      };


    // Get Patient Detail For Consultaion

    case CONSTANTS.GET_PATIENT_DETAILS_FOR_CONSULTATION_SUCCESS:
      return {
        ...state,
        patientDetailsSuccess: action.response,
      };

    case CONSTANTS.GET_PATIENT_DETAILS_FOR_CONSULTATION_FAILURE:
      return {
        ...state,
        patientDetailsFailure: action.error,
      };

    // End get patient Detail for consultation


        // Get All Common Data 

        case CONSTANTS.GET_ALL_COMMON_DATA_SUCCESS:
          return {
            ...state,
            getAllCommonDataSuccess: action.response,
          };
    
        case CONSTANTS.GET_ALL_COMMON_DATA_FAILURE:
          return {
            ...state,
            getAllCommonDataFailure: action.error,
          };

        
        
        // End Get All Common Data


        // Get All Disease Specific Data

        
        case CONSTANTS.GET_DISEASE_SPECIFIC_ALL_DATA_SUCCESS:
          return {
            ...state,
            getDiseaseSpecificDataSuccess: action.response,
          };
    
        case CONSTANTS.GET_DISEASE_SPECIFIC_ALL_DATA_FAILURE:
          return {
            ...state,
            getDiseaseSpecificDataFailure: action.error,
          };

        // End Get Disease Specific All Data


    case CONSTANTS.RESET_TO_INITIAL_STATE:
      return {};
    default:
      return state;
  }
};
