import { call, put, takeLatest } from "redux-saga/effects";
import * as CONSTANTS from "./constant";
import { GetHeaders } from "../../Utils/headers";
import axios from "axios";

export function* getAllPatientHandler(action) {
  let url = `${process.env.NEXT_PUBLIC_APIURL}/getAllPatient?page=${action.payload.currentPage}`;

  try {
    const response = yield call(axios.post, url, action.payload, GetHeaders());
    yield put({ type: CONSTANTS.GET_ALL_PATIENT_SUCCESS, 
    response: response.data });
  } catch (error) {
    yield put({
      type: CONSTANTS.GET_ALL_PATIENT_FAILURE,
      error: error.response.data,
    });
  }
}


export function* updatePatientHandler(action) {
  let url = `${process.env.NEXT_PUBLIC_APIURL}/updatePatientDetails`;

  try {
    const response = yield call(axios.put, url, action.payload, GetHeaders());
    yield put({ type: CONSTANTS.UPDATE_PATIENT_SUCCESS, 
    response: response.data });
  } catch (error) {
    yield put({
      type: CONSTANTS.UPDATE_PATIENT_FAILURE,
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

export function* createPatientHandler(action) {
  let url = `${process.env.NEXT_PUBLIC_APIURL}/create-patient`;

  try {
    const response = yield call(axios.post, url, action.payload, GetHeaders());
    yield put({ type: CONSTANTS.CREATE_PATIENT_SUCCESS, 
    response: response.data });
  } catch (error) {
    yield put({
      type: CONSTANTS.CREATE_PATIENT_FAILURE,
      error: error.response.data,
    });
  }
}

export function* changeResponseHandler(action) {
  let url = `${process.env.NEXT_PUBLIC_APIURL}/updateRegistrationAndTokenNO`;

  try {
    const response = yield call(axios.post, url, action.payload, GetHeaders());
    yield put({ type: CONSTANTS.CHANGE_REG_AND_TOKEN_NO_SUCCESS, 
    response: response.data });
  } catch (error) {
    yield put({
      type: CONSTANTS.CHANGE_REG_AND_TOKEN_NO_FAILURE,
      error: error.response.data,
    });
  }
}



export default function* PatientSaga() {
  yield takeLatest(CONSTANTS.GET_ALL_PATIENT, getAllPatientHandler);
  yield takeLatest(CONSTANTS.UPDATE_PATIENT, updatePatientHandler);
  yield takeLatest(CONSTANTS.GENERATE_NEW_TOKEN, generateNewTokenHandler);
  yield takeLatest(CONSTANTS.CREATE_PATIENT, createPatientHandler);
  yield takeLatest(CONSTANTS.CHANGE_REG_AND_TOKEN_NO, changeResponseHandler);
}
