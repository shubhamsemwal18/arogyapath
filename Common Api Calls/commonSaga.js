import { call, put, takeLatest } from "redux-saga/effects";
import * as CONSTANTS from "./commonConstant";
import { GetHeaders } from "../Utils/headers";
import axios from "axios";

export function* getTodayTokensHandler(action) {
  let url = `${process.env.NEXT_PUBLIC_APIURL}/getTodayTokens/`+action.payload;
  
  try {
    const response = yield call(axios.get, url, GetHeaders());
    yield put({ type: CONSTANTS.GET_TODAY_TOKEN_SUCCESS, 
    response: response.data });
  } catch (error) {
    yield put({
      type: CONSTANTS.GET_TODAY_TOKEN_FAILURE,
      error: error.response.data,
    });
  }
}

export function* getPatientByTokenNOHandler(action){
  let url = `${process.env.NEXT_PUBLIC_APIURL}/get-patientByTokenNo`;
  
  try {
    const response = yield call(axios.post, url, action.payload, GetHeaders());
    yield put({ type: CONSTANTS.GET_PATIENT_BY_TOKEN_NO_SUCCESS, 
    response: response.data });
  } catch (error) {
    yield put({
      type: CONSTANTS.GET_PATIENT_BY_TOKEN_NO_FAILURE,
      error: error.response.data,
    });
  }
}

export function* getAllDiseasesHandler(){
  let url = `${process.env.NEXT_PUBLIC_APIURL}/getAllDiseases`;

  try {
    const response = yield call(axios.get, url, GetHeaders());
    yield put({ type: CONSTANTS.GET_ALL_DISEASES_SUCCESS, 
    response: response.data });
  } catch (error) {
    yield put({
      type: CONSTANTS.GET_ALL_DISEASES_FAILURE,
      error: error.response.data,
    });
  }
}

// make api call for get all medicine
export function* getAllMedicine() {
  let url = `${process.env.NEXT_PUBLIC_APIURL}/getAllMedicine`;
  
  try {
    const response = yield call(axios.get, url, GetHeaders());
    yield put({ type: CONSTANTS.GET_ALL_MEDICINE_SUCCESS, 
    response: response.data });
  } catch (error) {
    yield put({
      type: CONSTANTS.GET_ALL_MEDICINE_FAILURE,
      error: error.response.data,
    });
  }
}

// Make Api call to get patient Consultation Detail By Token

export function* getPatientConsultationDetailByTokenHandler(action){
  let url = `${process.env.NEXT_PUBLIC_APIURL}/get-consultationDetailByTokenId`;
  
  try {
    const response = yield call(axios.post, url, action.payload, GetHeaders());
    yield put({ type: CONSTANTS.GET_PATIENT_CONSULTATION_DETAIL_BY_TOKEN_SUCCESS, 
    response: response.data });
  } catch (error) {
    yield put({
      type: CONSTANTS.GET_PATIENT_CONSULTATION_DETAIL_BY_TOKEN_FAILURE,
      error: error.response.data,
    });
  }
}

// Make Api call to get patient Pre-Consultation Detail By Token

export function* getPatientPreConsultationDetailByTokenHandler(action){
  let url = `${process.env.NEXT_PUBLIC_APIURL}/get-preConsultationDetailByTokenId`;
  
  try {
    const response = yield call(axios.post, url, action.payload, GetHeaders());
    yield put({ type: CONSTANTS.GET_PATIENT_PRECONSULTATION_DETAIL_BY_TOKEN_SUCCESS, 
    response: response.data });
  } catch (error) {
    yield put({
      type: CONSTANTS.GET_PATIENT_PRECONSULTATION_DETAIL_BY_TOKEN_FAILURE,
      error: error.response.data,
    });
  }
}


// Make Api Call to Get All Exercises

export function* getAllExercisesHandler() {
  let url = `${process.env.NEXT_PUBLIC_APIURL}/getAllExercises`;

  try {
    const response = yield call(axios.get, url, GetHeaders());
    yield put({ type: CONSTANTS.GET_ALL_EXERCISES_SUCCESS, 
    response: response.data });
  } catch (error) {
    yield put({
      type: CONSTANTS.GET_ALL_EXERCISES_FAILURE,
      error: error.response.data,
    });
  }
}

// get recent Patient By given count

export function* getRecentPatientHandler(action) {
  let url = `${process.env.NEXT_PUBLIC_APIURL}/recentPatient/`+action.payload;

  try {
    const response = yield call(axios.get, url, GetHeaders());
    yield put({ type: CONSTANTS.GET_RECENT_PATIENT_SUCCESS, 
    response: response.data });
  } catch (error) {
    yield put({
      type: CONSTANTS.GET_RECENT_PATIENT_FAILURE,
      error: error.response.data,
    });
  }
}

// logOut Api Handler

export function* logoutHandler() {
  let url = `${process.env.NEXT_PUBLIC_APIURL}/logout`;

  try {
    const response = yield call(axios.get, url, GetHeaders());
    yield put({ type: CONSTANTS.LOGOUT_SUCCESS, 
    response: response.data });
  } catch (error) {
    yield put({
      type: CONSTANTS.LOGOUT_FAILURE,
      error: error.response.data,
    });
  }
}

export function* getAllHerbsHandler() {
  let url = `${process.env.NEXT_PUBLIC_APIURL}/getAllHerbs`;

  try {
    const response = yield call(axios.get, url, GetHeaders());
    yield put({ type: CONSTANTS.GET_ALL_HERBS_SUCCESS, 
    response: response.data });
  } catch (error) {
    yield put({
      type: CONSTANTS.GET_ALL_HERBS_FAILURE,
      error: error.response.data,
    });
  }
}


export function* getAllDietsHandler() {
  let url = `${process.env.NEXT_PUBLIC_APIURL}/getAllDiets`;

  try {
    const response = yield call(axios.get, url, GetHeaders());
    yield put({ type: CONSTANTS.GET_ALL_DIETS_SUCCESS, 
    response: response.data });
  } catch (error) {
    yield put({
      type: CONSTANTS.GET_ALL_DIETS_FAILURE,
      error: error.response.data,
    });
  } 
}

export function* getDiseaseExercisesHandler() {
  let url = `${process.env.NEXT_PUBLIC_APIURL}/getAllDiseaseMappedExercises`;

  try {
    const response = yield call(axios.get, url, GetHeaders());
    yield put({ type: CONSTANTS.GET_ALL_MAPPED_DISEASES_EXERCISES_SUCCESS, 
    response: response.data });
  } catch (error) {
    yield put({
      type: CONSTANTS.GET_ALL_MAPPED_DISEASES_EXERCISES_FAILURE,
      error: error.response.data,
    });
  }
}


export function* prevPreconsultationHandler(action) {
  let url = `${process.env.NEXT_PUBLIC_APIURL}/Prev-PreConsultationDetails/`+action.payload;;

  try {
    const response = yield call(axios.get, url, GetHeaders());
    yield put({ type: CONSTANTS.PREV_PRECONSULTATIONDETAILS_SUCCESS, 
    response: response.data });
  } catch (error) {
    yield put({
      type: CONSTANTS.PREV_PRECONSULTATIONDETAILS_FAILURE,
      error: error.response.data,
    });
  }
}

export function* prevConsultationHandler(action) {
  let url = `${process.env.NEXT_PUBLIC_APIURL}/Prev-ConsultationDetails/`+action.payload;;

  try {
    const response = yield call(axios.get, url, GetHeaders());
    yield put({ type: CONSTANTS.PREV_CONSULTATIONDETAILS_SUCCESS, 
    response: response.data });
  } catch (error) {
    yield put({
      type: CONSTANTS.PREV_CONSULTATIONDETAILS_FAILURE,
      error: error.response.data,
    });
  }
}

export function* patientSearchHandler(action) {
  let url = `${process.env.NEXT_PUBLIC_APIURL}/searchPatient?page=${action.payload.currentPage}`;

  try {
    const response = yield call(axios.post, url, action.payload, GetHeaders());
    yield put({ type: CONSTANTS.PATIENT_SEARCH_SUCCESS, 
    response: response.data });
  } catch (error) {
    yield put({
      type: CONSTANTS.PATIENT_SEARCH_FAILURE,
      error: error.response.data,
    });
  }
}

export function* generateNewTokenHandler(action) {
  let url = `${process.env.NEXT_PUBLIC_APIURL}/generateNewToken`;

  try {
    const response = yield call(axios.post, url, action.payload, GetHeaders());
    yield put({ type: CONSTANTS.GENERATE_NEW_TOKEN_SUCCESS, 
    response: response.data });
  } catch (error) {
    yield put({
      type: CONSTANTS.GENERATE_NEW_TOKEN_FAILURE,
      error: error.response.data,
    });
  }
}

export function* getExerciseByDiseaseHandler(action){
  let url = `${process.env.NEXT_PUBLIC_APIURL}/get-ExercisesByDiseases`;
  
  try {
    const response = yield call(axios.post, url, action.payload, GetHeaders());
    yield put({ type: CONSTANTS.GET_EXERCISES_BY_DISEASES_SUCCESS, 
    response: response.data });
  } catch (error) {
    yield put({
      type: CONSTANTS.GET_EXERCISES_BY_DISEASES_FAILURE,
      error: error.response.data,
    });
  }
}

export function* getDietsByDiseaseHandler(action){
  let url = `${process.env.NEXT_PUBLIC_APIURL}/get-DietsByDiseases`;
  
  try {
    const response = yield call(axios.post, url, action.payload, GetHeaders());
    yield put({ type: CONSTANTS.GET_DIETS_BY_DISEASES_SUCCESS, 
    response: response.data });
  } catch (error) {
    yield put({
      type: CONSTANTS.GET_DIETS_BY_DISEASES_FAILURE,
      error: error.response.data,
    });
  }
}

export function* getPatientAllPrevDataHandler(action){
  let url = `${process.env.NEXT_PUBLIC_APIURL}/getPatientAllPrevData`;
  
  try {
    const response = yield call(axios.post, url, action.payload, GetHeaders());
    yield put({ type: CONSTANTS.GET_PATIENT_ALL_PRE_DATA_SUCCESS, 
    response: response.data });
  } catch (error) {
    yield put({
      type: CONSTANTS.GET_PATIENT_ALL_PRE_DATA_FAILURE,
      error: error.response.data,
    });
  }
}

export function* getPatientTodayALlDataHandler(action){
  let url = `${process.env.NEXT_PUBLIC_APIURL}/getPatientTodayAllData`;
  
  try {
    const response = yield call(axios.post, url, action.payload, GetHeaders());
    yield put({ type: CONSTANTS.GET_PATIENT_TODAY_ALL_DATA_SUCCESS, 
    response: response.data });
  } catch (error) {
    yield put({
      type: CONSTANTS.GET_PATIENT_TODAY_ALL_DATA_FAILURE,
      error: error.response.data,
    });
  }
}

export function* getPreConsultationReportHandler(){
  let url = `${process.env.NEXT_PUBLIC_APIURL}/getReport`;
  
  try {
    const response = yield call(axios.get, url, GetHeaders());
    yield put({ type: CONSTANTS.GET_PRE_CONSULTATION_REPORTS_SUCCESS, 
    response: response.data });
  } catch (error) {
    yield put({
      type: CONSTANTS.GET_PRE_CONSULTATION_REPORTS_FAILURE,
      error: error.response.data,
    });
  }
}

export function* getDietsToTakeHandler(){
  let url = `${process.env.NEXT_PUBLIC_APIURL}/get_diets_to_take`;
  
  try {
    const response = yield call(axios.get, url, GetHeaders());
    yield put({ type: CONSTANTS.GET_DIETS_TO_TAKE_SUCCESS, 
    response: response.data });
  } catch (error) {
    yield put({
      type: CONSTANTS.GET_DIETS_TO_TAKE_FAILURE,
      error: error.response.data,
    });
  }
}

export function* getDietsNotToTakeHandler(){
  let url = `${process.env.NEXT_PUBLIC_APIURL}/get_diets_not_to_take`;
  
  try {
    const response = yield call(axios.get, url, GetHeaders());
    yield put({ type: CONSTANTS.GET_DIETS_NOT_TO_TAKE_SUCCESS, 
    response: response.data });
  } catch (error) {
    yield put({
      type: CONSTANTS.GET_DIETS_NOT_TO_TAKE_FAILURE,
      error: error.response.data,
    });
  }
}


export function* getAllQuestionsHandler(){
  let url = `${process.env.NEXT_PUBLIC_APIURL}/getallQuestion`;

  try {
    const response = yield call(axios.get, url, GetHeaders());
    yield put({ type: CONSTANTS.GET_ALL_QUESTIONS_SUCCESS,
    response: response.data });
  } catch (error) {
    yield put({
      type: CONSTANTS.GET_ALL_QUESTIONS_FAILURE,
      error: error.response.data,
    });
  }
}


// export function* getDiseaseQuestionsHandler() {
//   let url = `${process.env.NEXT_PUBLIC_APIURL}/getAllDiseaseMappedExercises`;

//   try {
//     const response = yield call(axios.get, url, GetHeaders());
//     yield put({ type: CONSTANTS.GET_ALL_MAPPED_DISEASES_EXERCISES_SUCCESS, 
//     response: response.data });
//   } catch (error) {
//     yield put({
//       type: CONSTANTS.GET_ALL_MAPPED_DISEASES_EXERCISES_FAILURE,
//       error: error.response.data,
//     });
//   }
// }


export function* getMedicineInstructionHandler() {
  let url = `${process.env.NEXT_PUBLIC_APIURL}/get_medicine_instruction`;

  try {
    const response = yield call(axios.get, url, GetHeaders());
    yield put({ type: CONSTANTS.GET_MEDICINE_INSTRUCTION_SUCCESS, 
    response: response.data });
  } catch (error) {
    yield put({
      type: CONSTANTS.GET_MEDICINE_INSTRUCTION_FAILURE,
      error: error.response.data,
    });
  }
}


export function* getExerciseInstructionHandler() {
  let url = `${process.env.NEXT_PUBLIC_APIURL}/get_exercise_instruction`;

  try {
    const response = yield call(axios.get, url, GetHeaders());
    yield put({ type: CONSTANTS.GET_EXERCISE_INSTRUCTION_SUCCESS, 
    response: response.data });
  } catch (error) {
    yield put({
      type: CONSTANTS.GET_EXERCISE_INSTRUCTION_FAILURE,
      error: error.response.data,
    });
  }
}


export function* getSpecialInstructionHandler() {
  let url = `${process.env.NEXT_PUBLIC_APIURL}/get_special_instruction`;

  try {
    const response = yield call(axios.get, url, GetHeaders());
    yield put({ type: CONSTANTS.GET_SPECIAL_INSTRUCTION_SUCCESS, 
    response: response.data });
  } catch (error) {
    yield put({
      type: CONSTANTS.GET_SPECIAL_INSTRUCTION_FAILURE,
      error: error.response.data,
    });
  }
}


export function* getPulseObservationHandler() {
  let url = `${process.env.NEXT_PUBLIC_APIURL}/getPulseObservation`;

  try {
    const response = yield call(axios.get, url, GetHeaders());
    yield put({ type: CONSTANTS.GET_PULSE_OBSERVATION_SUCCESS, 
    response: response.data });
  } catch (error) {
    yield put({
      type: CONSTANTS.GET_PULSE_OBSERVATION_FAILURE,
      error: error.response.data,
    });
  }
}

export function* getToungeObservationHandler() {
  let url = `${process.env.NEXT_PUBLIC_APIURL}/getToungeObservation`;

  try {
    const response = yield call(axios.get, url, GetHeaders());
    yield put({ type: CONSTANTS.GET_TOUNGE_OBSERVATION_SUCCESS, 
    response: response.data });
  } catch (error) {
    yield put({
      type: CONSTANTS.GET_TOUNGE_OBSERVATION_FAILURE,
      error: error.response.data,
    });
  }
}


export function* getDataMappedWithDiseaseByParamHandler(action) {
  let url = `${process.env.NEXT_PUBLIC_APIURL}/get_disease_mapped/${action.payload}`;

  try {
    const response = yield call(axios.get, url, GetHeaders());
    yield put({ type: CONSTANTS.GET_DATA_MAPPED_WITH_DISEASE_BY_PARAM_SUCCESS, 
    response: response.data });
  } catch (error) {
    yield put({
      type: CONSTANTS.GET_DATA_MAPPED_WITH_DISEASE_BY_PARAM_FAILURE,
      error: error.response.data,
    });
  }
}

export function* getDataNotMappedWithDiseaseByParamHandler(action) {
  let url = `${process.env.NEXT_PUBLIC_APIURL}/get_disease_not_mapped/${action.payload}`;

  try {
    const response = yield call(axios.get, url, GetHeaders());
    yield put({ type: CONSTANTS.GET_DATA_NOT_MAPPED_WITH_DISEASE_BY_PARAM_SUCCESS, 
    response: response.data });
  } catch (error) {
    yield put({
      type: CONSTANTS.GET_DATA_NOT_MAPPED_WITH_DISEASE_BY_PARAM_FAILURE,
      error: error.response.data,
    });
  }
}





export default function* commonSaga() {
  yield takeLatest(CONSTANTS.GET_ALL_HERBS, getAllHerbsHandler);
  yield takeLatest(CONSTANTS.GET_TODAY_TOKEN, getTodayTokensHandler);
  yield takeLatest(CONSTANTS.GET_PATIENT_BY_TOKEN_NO, getPatientByTokenNOHandler)
  yield takeLatest(CONSTANTS.GET_ALL_DISEASES, getAllDiseasesHandler)
  yield takeLatest(CONSTANTS.GET_ALL_MEDICINE, getAllMedicine)
  yield takeLatest(CONSTANTS.GET_ALL_EXERCISES, getAllExercisesHandler)
  yield takeLatest(CONSTANTS.GET_RECENT_PATIENT, getRecentPatientHandler)
  yield takeLatest(CONSTANTS.GET_ALL_DIETS, getAllDietsHandler)
  yield takeLatest(CONSTANTS.LOGOUT, logoutHandler)
  yield takeLatest(CONSTANTS.GET_ALL_MAPPED_DISEASES_EXERCISES, getDiseaseExercisesHandler)
  yield takeLatest(CONSTANTS.GET_PATIENT_CONSULTATION_DETAIL_BY_TOKEN, getPatientConsultationDetailByTokenHandler)
  yield takeLatest(CONSTANTS.GET_PATIENT_PRECONSULTATION_DETAIL_BY_TOKEN, getPatientPreConsultationDetailByTokenHandler)
  yield takeLatest(CONSTANTS.PREV_PRECONSULTATIONDETAILS, prevPreconsultationHandler)
  yield takeLatest(CONSTANTS.PREV_CONSULTATIONDETAILS, prevConsultationHandler)
  yield takeLatest(CONSTANTS.PATIENT_SEARCH, patientSearchHandler)
  yield takeLatest(CONSTANTS.GENERATE_NEW_TOKEN, generateNewTokenHandler)
  yield takeLatest(CONSTANTS.GET_EXERCISES_BY_DISEASES,getExerciseByDiseaseHandler)
  yield takeLatest(CONSTANTS.GET_DIETS_BY_DISEASES,getDietsByDiseaseHandler)
  yield takeLatest(CONSTANTS.GET_PATIENT_ALL_PRE_DATA,getPatientAllPrevDataHandler)
  yield takeLatest(CONSTANTS.GET_PATIENT_TODAY_ALL_DATA,getPatientTodayALlDataHandler)
  yield takeLatest(CONSTANTS.GET_PRE_CONSULTATION_REPORTS,getPreConsultationReportHandler)

  
  yield takeLatest(CONSTANTS.GET_DIETS_TO_TAKE,getDietsToTakeHandler)
  yield takeLatest(CONSTANTS.GET_DIETS_NOT_TO_TAKE,getDietsNotToTakeHandler)
  yield takeLatest(CONSTANTS.GET_ALL_QUESTIONS, getAllQuestionsHandler)
  yield takeLatest(CONSTANTS.GET_MEDICINE_INSTRUCTION,getMedicineInstructionHandler)
  yield takeLatest(CONSTANTS.GET_EXERCISE_INSTRUCTION,getExerciseInstructionHandler)
  yield takeLatest(CONSTANTS.GET_SPECIAL_INSTRUCTION,getSpecialInstructionHandler)
  yield takeLatest(CONSTANTS.GET_PULSE_OBSERVATION,getPulseObservationHandler)
  yield takeLatest(CONSTANTS.GET_TOUNGE_OBSERVATION,getToungeObservationHandler)


  // yield takeLatest(CONSTANTS.GET_QUESTIONS_BY_DISEASES, getDiseaseQuestionsHandler)
  yield takeLatest(CONSTANTS.GET_DATA_MAPPED_WITH_DISEASE_BY_PARAM, getDataMappedWithDiseaseByParamHandler)
  yield takeLatest(CONSTANTS.GET_DATA_NOT_MAPPED_WITH_DISEASE_BY_PARAM, getDataNotMappedWithDiseaseByParamHandler)
}
