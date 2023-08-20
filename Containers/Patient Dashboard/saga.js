import { call, put, takeLatest } from "redux-saga/effects";
import * as CONSTANTS from "./constant";
import { GetHeaders } from "../../Utils/headers";
import axios from "axios";


export function* getAllDates() {
  let url = `${process.env.NEXT_PUBLIC_APIURL}/getPatientAllConsultationDates`;

  try {
    const response = yield call(axios.get, url, GetHeaders());
    yield put({ type: CONSTANTS.PATIENT_DATE_SUCCESS, 
    response: response.data });
  } catch (error) {
    yield put({
      type: CONSTANTS.PATIENT_DATE_FAILURE,
      error: error.response.data,
    });
  }
}

export function* getAllDateWiseData(action) {
  let url = `${process.env.NEXT_PUBLIC_APIURL}/getPatientDetailByDate/${action.date}`;
  try {
    const response = yield call(axios.get, url, GetHeaders());
    yield put({ type: CONSTANTS.PATIENT_DATEWISE_DATA_SUCCESS, 
    response: response.data });
  } catch (error) {
    yield put({
      type: CONSTANTS.PATIENT_DATEWISE_DATA_FAILURE,
      error: error.response.data,
    });
  }
}



export default function* PatientDashboardSaga() {
 
  yield takeLatest(CONSTANTS.PATIENT_DATE, getAllDates);
  yield takeLatest(CONSTANTS.PATIENT_DATEWISE_DATA, getAllDateWiseData);
  
}
