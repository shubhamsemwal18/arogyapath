import * as CONSTANTS from "./commonConstant";
export const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {

    case CONSTANTS.GET_TODAY_TOKEN_SUCCESS:
      return {
        ...state,
        GetTodayTokenSuccess: action.response,
      };

    case CONSTANTS.GET_TODAY_TOKEN_FAILURE:
      return {
        ...state,
        GetTodayTokenFailure: action.error,
      };

    case CONSTANTS.GET_PATIENT_BY_TOKEN_NO_SUCCESS:
      return {
        ...state,
        GetPatientByTokenNoSuccess: action.response,
      };

    case CONSTANTS.GET_PATIENT_BY_TOKEN_NO_FAILURE:
      return {
        ...state,
        GetPatientByTokenNoFailure: action.error,
      };

    case CONSTANTS.GET_ALL_DISEASES_SUCCESS:
      return {
        ...state,
        GetAllDiseasesSuccess: action.response,
      };

    case CONSTANTS.GET_ALL_DISEASES_FAILURE:
      return {
        ...state,
        GetAllDiseasesFailure: action.error,
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

    case CONSTANTS.GET_ALL_MEDICINE_SUCCESS:
      return {
        ...state,
        getAllMedicineSuccess: action.response,
      };

    case CONSTANTS.GET_ALL_MEDICINE_FAILURE:
      return {
        ...state,
        getAllMedicineFailure: action.error,
      };

    case CONSTANTS.GET_PATIENT_CONSULTATION_DETAIL_BY_TOKEN_SUCCESS:
      return {
        ...state,
        getPatientConsultationDetailByTokenSuccess: action.response,
      };

    case CONSTANTS.GET_PATIENT_CONSULTATION_DETAIL_BY_TOKEN_FAILURE:
      return {
        ...state,
        getPatientConsultationDetailByTokenFailure: action.error,
      };

    case CONSTANTS.GET_PATIENT_PRECONSULTATION_DETAIL_BY_TOKEN_SUCCESS:
      return {
        ...state,
        getPatientPreConsultationDetailByTokenSuccess: action.response,
      };

    case CONSTANTS.GET_PATIENT_PRECONSULTATION_DETAIL_BY_TOKEN_FAILURE:
      return {
        ...state,
        getPatientPreConsultationDetailByTokenFailure: action.error,
      };

    case CONSTANTS.GET_ALL_EXERCISES_SUCCESS:
      return {
        ...state,
        getAllExercisesSuccess: action.response,
      };

    case CONSTANTS.GET_ALL_EXERCISES_FAILURE:
      return {
        ...state,
        getAllExercisesFailure: action.error,
      };

    case CONSTANTS.GET_RECENT_PATIENT_SUCCESS:
      return {
        ...state,
        getRecentPatientsSuccess: action.response,
      };

    case CONSTANTS.GET_RECENT_PATIENT_FAILURE:
      return {
        ...state,
        getRecentPatientsFailure: action.error,
      };

    case CONSTANTS.GET_ALL_HERBS_SUCCESS:
      return {
        ...state,
        getAllHerbsSuccess: action.response,
      };

    case CONSTANTS.GET_ALL_HERBS_FAILURE:
      return {
        ...state,
        getAllHerbsFailure: action.error,
      };

    case CONSTANTS.GET_ALL_DIETS_SUCCESS:
      return {
        ...state,
        getAllDietsSuccess: action.response,
      };

    case CONSTANTS.GET_ALL_DIETS_FAILURE:
      return {
        ...state,
        getAllDietsFailure: action.error,
      };

    case CONSTANTS.GET_ALL_MAPPED_DISEASES_EXERCISES_SUCCESS:
      return {
        ...state,
        diseasesExercisesSuccess: action.response,
      };

    case CONSTANTS.GET_ALL_MAPPED_DISEASES_EXERCISES_FAILURE:
      return {
        ...state,
        diseasesExercisesFailure: action.error,
      };

    case CONSTANTS.LOGOUT_SUCCESS:
      return {
        ...state,
        getLogoutSuccess: action.response,
      };

    case CONSTANTS.LOGOUT_FAILURE:
      return {
        ...state,
        getLogoutFailure: action.error,
      };
    case CONSTANTS.PREV_PRECONSULTATIONDETAILS_SUCCESS:
      return {
        ...state,
        prevPreConsultaionSuccess: action.response,
      };

    case CONSTANTS.PREV_PRECONSULTATIONDETAILS_FAILURE:
      return {
        ...state,
        prevPreConsultaionFailure: action.error,
      };

      case CONSTANTS.PREV_CONSULTATIONDETAILS_SUCCESS:
      return {
        ...state,
        prevConsultaionSuccess: action.response,
      };

    case CONSTANTS.PREV_CONSULTATIONDETAILS_FAILURE:
      return {
        ...state,
        prevConsultaionFailure: action.error,
      };

      case CONSTANTS.PATIENT_SEARCH_SUCCESS:
      return {
        ...state,
        patientSearchSuccess: action.response,
      };

    case CONSTANTS.PATIENT_SEARCH_FAILURE:
      return {
        ...state,
        patientSearchFailure: action.error,
      };

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

      case CONSTANTS.GET_EXERCISES_BY_DISEASES_SUCCESS:
      return {
        ...state,
        getExercisesByDiseasesIdSuccess: action.response,
      };

    case CONSTANTS.GET_EXERCISES_BY_DISEASES_FAILURE:
      return {
        ...state,
        getExercisesByDiseasesIdFailure: action.error,
      };

      case CONSTANTS.GET_DIETS_BY_DISEASES_SUCCESS:
      return {
        ...state,
        getDietsByDiseasesIdSuccess: action.response,
      };

    case CONSTANTS.GET_DIETS_BY_DISEASES_FAILURE:
      return {
        ...state,
        getDietsByDiseasesIdFailure: action.error,
      };

      case CONSTANTS.GET_PATIENT_ALL_PRE_DATA_SUCCESS:
      return {
        ...state,
        getAllPrevDataSuccess: action.response,
      };

    case CONSTANTS.GET_PATIENT_ALL_PRE_DATA_FAILURE:
      return {
        ...state,
        getAllPrevDataFailure: action.error,
      };


      case CONSTANTS.GET_PATIENT_TODAY_ALL_DATA_SUCCESS:
      return {
        ...state,
        getPatientTodayAllDataSuccess: action.response,
      };

    case CONSTANTS.GET_PATIENT_TODAY_ALL_DATA_FAILURE:
      return {
        ...state,
        getPatientTodayAllDataFailure: action.error,
      };



      case CONSTANTS.GET_PRE_CONSULTATION_REPORTS_SUCCESS:
      return {
        ...state,
        getPreConsultationResportSuccess: action.response,
      };

    case CONSTANTS.GET_PRE_CONSULTATION_REPORTS_FAILURE:
      return {
        ...state,
        getPreConsultationResportFailure: action.error,
      };

      // Diets New Management

      case CONSTANTS.GET_DIETS_NOT_TO_TAKE_SUCCESS:
      return {
        ...state,
        getDietsNotToTakeSuccess: action.response,
      };

    case CONSTANTS.GET_DIETS_NOT_TO_TAKE_FAILURE:
      return {
        ...state,
        getDietsNotToTakeFailure: action.error,
      };

      case CONSTANTS.GET_DIETS_TO_TAKE_SUCCESS:
      return {
        ...state,
        getDietsToTakeSuccess: action.response,
      };

    case CONSTANTS.GET_DIETS_TO_TAKE_FAILURE:
      return {
        ...state,
        getDietsToTakeFailure: action.error,
      };

      case CONSTANTS.GET_ALL_QUESTIONS_SUCCESS:
        return {
          ...state,
          GetAllQuestionSuccess: action.response,
        };
  
      case CONSTANTS.GET_ALL_QUESTIONS_FAILURE:
        return {
          ...state,
          GetAllQuestionFailure: action.error,
        };

        case CONSTANTS.GET_MEDICINE_INSTRUCTION_SUCCESS:
          return {
            ...state,
            getMedicineInstructionSuccess: action.response,
          };
    
        case CONSTANTS.GET_MEDICINE_INSTRUCTION_FAILURE:
          return {
            ...state,
            getMedicineInstructionFailure: action.error,
          };

          case CONSTANTS.GET_EXERCISE_INSTRUCTION_SUCCESS:
            return {
              ...state,
              getExerciseInstructionSuccess: action.response,
            };
      
          case CONSTANTS.GET_EXERCISE_INSTRUCTION_FAILURE:
            return {
              ...state,
              getExerciseInstructionFailure: action.error,
            };

            case CONSTANTS.GET_SPECIAL_INSTRUCTION_SUCCESS:
            return {
              ...state,
              getSpecialInstructionSuccess: action.response,
            };
      
          case CONSTANTS.GET_SPECIAL_INSTRUCTION_FAILURE:
            return {
              ...state,
              getSpecialInstructionFailure: action.error,
            };

            case CONSTANTS.GET_PULSE_OBSERVATION_SUCCESS:
            return {
              ...state,
              getPulseObservationSuccess: action.response,
            };
      
          case CONSTANTS.GET_PULSE_OBSERVATION_FAILURE:
            return {
              ...state,
              getPulseObservationFailure: action.error,
            };

            case CONSTANTS.GET_TOUNGE_OBSERVATION_SUCCESS:
            return {
              ...state,
              getToungeObservationSuccess: action.response,
            };
      
          case CONSTANTS.GET_TOUNGE_OBSERVATION_FAILURE:
            return {
              ...state,
              getToungeObservationFailure: action.error,
            };

            // 

            case CONSTANTS.GET_DATA_MAPPED_WITH_DISEASE_BY_PARAM_SUCCESS:
            return {
              ...state,
              getDataMappedWIthDiseaseByParamSuccess: action.response,
            };
      
          case CONSTANTS.GET_DATA_MAPPED_WITH_DISEASE_BY_PARAM_FAILURE:
            return {
              ...state,
              getDataMappedWIthDiseaseByParamFailure: action.error,
            };

            case CONSTANTS.GET_DATA_NOT_MAPPED_WITH_DISEASE_BY_PARAM_SUCCESS:
            return {
              ...state,
              getDataNotMappedWIthDiseaseByParamSuccess: action.response,
            };
      
          case CONSTANTS.GET_DATA_NOT_MAPPED_WITH_DISEASE_BY_PARAM_FAILURE:
            return {
              ...state,
              getDataNotMappedWIthDiseaseByParamFailure: action.error,
            };
      

      // reset to initial state

    case CONSTANTS.RESET_TO_INITIAL_STATE:
      return {};
    default:
      return state;
  }
};
