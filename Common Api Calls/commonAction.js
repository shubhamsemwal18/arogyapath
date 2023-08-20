import * as CONSTANTS from "./commonConstant";

export function getTodayTokens(payload) {
  return {
    type: CONSTANTS.GET_TODAY_TOKEN,
    payload,
  };
}

export function getAllHerbs(payload) {
  return {
    type: CONSTANTS.GET_ALL_HERBS,
    payload,
  };
}

export function getPatientByToken(payload) {
  return {
    type: CONSTANTS.GET_PATIENT_BY_TOKEN_NO,
    payload,
  };
}

export function getAllMedicine() {
  return {
    type: CONSTANTS.GET_ALL_MEDICINE,
  };
}

export function getAllDiseases() {
  return {
    type: CONSTANTS.GET_ALL_DISEASES,
  };
}

export function getAllExercises() {
  return {
    type: CONSTANTS.GET_ALL_EXERCISES,
  };
}

export function getAllDiets() {
  return {
    type: CONSTANTS.GET_ALL_DIETS,
  };
}

export function getPatientConsultationDetailByToken(payload) {
  return {
    type: CONSTANTS.GET_PATIENT_CONSULTATION_DETAIL_BY_TOKEN,
    payload,
  };
}

export function getPatientPreConsultationDetailByToken(payload) {
  return {
    type: CONSTANTS.GET_PATIENT_PRECONSULTATION_DETAIL_BY_TOKEN,
    payload,
  };
}

export function getAllDiseasesExercises() {
  return {
    type: CONSTANTS.GET_ALL_MAPPED_DISEASES_EXERCISES,
  };
}

// export function getAllDiseasesQuestions() {
//   return {
//     type: CONSTANTS.GET_QUESTIONS_BY_DISEASES,
//   };
// }

export function getRecentPatients(payload) {
  return {
    type: CONSTANTS.GET_RECENT_PATIENT,
    payload,
  };
}

export function getPrevPreConsultationDetail(payload) {
  return {
    type: CONSTANTS.PREV_PRECONSULTATIONDETAILS,
    payload,
  };
}

export function getPrevConsultationDetail(payload) {
  return {
    type: CONSTANTS.PREV_CONSULTATIONDETAILS,
    payload,
  };
}

export function searchPatient(payload){
  return {
    type: CONSTANTS.PATIENT_SEARCH,
    payload,
  };
}

export function generateNewToken(payload){
  return{
  type:CONSTANTS.GENERATE_NEW_TOKEN,
  payload,
  }
}

export function getExercisesByDiseasesId(payload) {
  return {
    type: CONSTANTS.GET_EXERCISES_BY_DISEASES,
    payload,
  };
}

export function getDietsByDiseasesId(payload) {
  return {
    type: CONSTANTS.GET_DIETS_BY_DISEASES,
    payload,
  };
}

// Handle Logout APi

export function logout() {
  return {
    type: CONSTANTS.LOGOUT,
  };
}

// Reset to Initial State

export function resetToInitialState() {
  return {
    type: CONSTANTS.RESET_TO_INITIAL_STATE,
  };
}

// Get Patient All Consultation Dates.

export function getPatientAllPrevData(payload) {
  return {
    type: CONSTANTS.GET_PATIENT_ALL_PRE_DATA,
    payload,
  };
}


export function getPatientTodayAllData(payload) {
  return {
    type: CONSTANTS.GET_PATIENT_TODAY_ALL_DATA,
    payload,
  };
}

export function getAllPreConsultationReport() {
  return {
    type: CONSTANTS.GET_PRE_CONSULTATION_REPORTS,
  };
}

export function getDietsNotToTake() {
  return {
    type: CONSTANTS.GET_DIETS_NOT_TO_TAKE,
  };
}

export function getDietsToTake() {
  return {
    type: CONSTANTS.GET_DIETS_TO_TAKE,
  };
}

export function getAllQuestions() {
  return {
    type: CONSTANTS.GET_ALL_QUESTIONS,
  };
}

export function getMedicineInstruction() {
  return {
    type: CONSTANTS.GET_MEDICINE_INSTRUCTION,
  };
}

export function getExerciseInstruction() {
  return {
    type: CONSTANTS.GET_EXERCISE_INSTRUCTION,
  };
}

export function getSpecialInstruction() {
  return {
    type: CONSTANTS.GET_SPECIAL_INSTRUCTION,
  };
}

export function getPulseObservation() {
  return {
    type: CONSTANTS.GET_PULSE_OBSERVATION,
  };
}

export function getToungeObservation() {
  return {
    type: CONSTANTS.GET_TOUNGE_OBSERVATION,
  };
}

export function getDataMappedWithDiseaseByParam(payload) {
  return {
    type: CONSTANTS.GET_DATA_MAPPED_WITH_DISEASE_BY_PARAM,
    payload
  };
}

export function getDataNotMappedWithDiseaseByParam(payload) {
  return {
    type: CONSTANTS.GET_DATA_NOT_MAPPED_WITH_DISEASE_BY_PARAM,
    payload
  };
}
