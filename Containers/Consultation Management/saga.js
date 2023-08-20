import { call, put, takeLatest } from "redux-saga/effects";
import * as CONSTANTS from "./constant";
import axios from "axios";
import { GetHeaders } from "../../Utils/headers";

export function* registerConsultationHandler(action) {
  let url = `${process.env.NEXT_PUBLIC_APIURL}/register-consultation`;

  try {
    const response = yield call(axios.post, url, action.payload, GetHeaders());
    yield put({ type: CONSTANTS.REGISTER_CONSULTATION_SUCCESS, 
    response: response.data });
  } catch (error) {
    yield put({
      type: CONSTANTS.REGISTER_CONSULTATION_FAILURE,
      error: error.response.data,
    });
  }
}

export function* getPatientDetailForConsultationHandler(action) {
  let url = `${process.env.NEXT_PUBLIC_APIURL}/getPatientDetailsForConsultaion`;

  try {
    const response = yield call(axios.post, url, action.payload, GetHeaders());
    yield put({ type: CONSTANTS.GET_PATIENT_DETAILS_FOR_CONSULTATION_SUCCESS, 
    response: response.data });
  } catch (error) {
    yield put({
      type: CONSTANTS.GET_PATIENT_DETAILS_FOR_CONSULTATION_FAILURE,
      error: error.response.data,
    });
  }
}

export function* getAllCommonDataHandler() {
  let url = `${process.env.NEXT_PUBLIC_APIURL}/getAllCommonDataForConsultation`;

  try {
    const response = yield call(axios.get, url, GetHeaders());
    yield put({ type: CONSTANTS.GET_ALL_COMMON_DATA_SUCCESS, 
    response: response.data });
  } catch (error) {
    yield put({
      type: CONSTANTS.GET_ALL_COMMON_DATA_FAILURE,
      error: error.response.data,
    });
  }
}

export function* getDiseaseSpecificAllDataHandler(action){
  let url = `${process.env.NEXT_PUBLIC_APIURL}/getDiseaseSpecificAllDataForConsultation/${action.payload}`;

  try {
    const response = yield call(axios.get, url, GetHeaders());
    yield put({ type: CONSTANTS.GET_DISEASE_SPECIFIC_ALL_DATA_SUCCESS, 
    response: response.data });
  } catch (error) {
    yield put({
      type: CONSTANTS.GET_DISEASE_SPECIFIC_ALL_DATA_FAILURE,
      error: error.response.data,
    });
  }
}


export default function* ConsultationManagementSaga() {

  yield takeLatest(CONSTANTS.GET_PATIENT_DETAILS_FOR_CONSULTATION, getPatientDetailForConsultationHandler);
  yield takeLatest(CONSTANTS.REGISTER_CONSULTATION, registerConsultationHandler);
  yield takeLatest(CONSTANTS.GET_ALL_COMMON_DATA, getAllCommonDataHandler);
  yield takeLatest(CONSTANTS.GET_DISEASE_SPECIFIC_ALL_DATA, getDiseaseSpecificAllDataHandler);
  
}
