import * as CONSTANTS from "./constant";
export const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {

    // -----------------------------------------------------//
    // ----------------ALL Patient----------------------//
    // -----------------------------------------------------//

    case CONSTANTS.GET_ALL_PATIENT_SUCCESS:
      return {
        ...state,
        getAllPatientSuccess: action.response,
      };

    case CONSTANTS.GET_ALL_PATIENT_FAILURE:
      return {
        ...state,
        getAllPatientFailure: action.error,
      };

      
    // -----------------------------------------------------//
    // ----------------Update Patient----------------------//
    // -----------------------------------------------------//

    case CONSTANTS.UPDATE_PATIENT_SUCCESS:
      return {
        ...state,
        updatePatientSuccess: action.response,
      };

    case CONSTANTS.UPDATE_PATIENT_FAILURE:
      return {
        ...state,
        updatePatientFailure: action.error,
      };

      // -----------------------------------------------------//
      // -------------Generate New Token----------------------//
      // -----------------------------------------------------//

      case CONSTANTS.GENERATE_NEW_TOKEN_SUCCESS:
        return {
          ...state,
          generateNewTokenSuccess: action.response,
        };
  
      case CONSTANTS.GENERATE_NEW_TOKEN_FAILURE:
        return {
          ...state,
          generateNewTokenFailure: action.error,
        };

      // -----------------------------------------------------//
      // -------------  Create Patient  ----------------------//
      // -----------------------------------------------------//

      case CONSTANTS.CREATE_PATIENT_SUCCESS:
        return {
          ...state,
          createPatientSuccess: action.response,
        };
  
      case CONSTANTS.CREATE_PATIENT_FAILURE:
        return {
          ...state,
          createPatientFailure: action.error,
        };      

      // -----------------------------------------------------//
      // ------------- Change Resgistration And Toke No  ----------------------//
      // -----------------------------------------------------//

      case CONSTANTS.CHANGE_REG_AND_TOKEN_NO_SUCCESS:
        return {
          ...state,
          changeResponseSuccess: action.response,
        };
  
      case CONSTANTS.CHANGE_REG_AND_TOKEN_NO_FAILURE:
        return {
          ...state,
          changeResponseFailure: action.error,
        };    

      // -----------------------------------------------------//
      // ------------- Reset to intial state ----------------------//
      // -----------------------------------------------------//


    case CONSTANTS.RESET_TO_INITIAL_STATE:
      return {};
    default:
      return state;
  }
};
