import { call, put, takeLatest } from "redux-saga/effects";
import * as CONSTANTS from "./constant";
import { GetHeaders } from "../../Utils/headers";
import axios from "axios";

export function* dashboardAccessHandler(action) {
  let url = `${process.env.NEXT_PUBLIC_APIURL}/userDetails`;
  
  try {
    const response = yield call(axios.get, url, GetHeaders());
    yield put({ type: CONSTANTS.DASHBOARD_ACCESS_SUCCESS, 
    response: response.data });
  } catch (error) {
    yield put({
      type: CONSTANTS.DASHBOARD_ACCESS_FAILURE,
      error: error.response.data,
    });
  }
}

export function* getAllCounters() {
  let url = `${process.env.NEXT_PUBLIC_APIURL}/getDashboardCounters`;

  try {
    const response = yield call(axios.get, url, GetHeaders());
    yield put({ type: CONSTANTS.DASHBOARD_COUNTER_SUCCESS, 
    response: response.data });
  } catch (error) {
    yield put({
      type: CONSTANTS.DASHBOARD_COUNTER_FAILURE,
      error: error.response.data,
    });
  }
}

export function* getAllRecentPatientList() {
  let url = `${process.env.NEXT_PUBLIC_APIURL}/getAllPatient`;

  try {
    const response = yield call(axios.get, url, GetHeaders());
    yield put({ type: CONSTANTS.DASHBOARD_RECENT_PATIENT_SUCCESS, 
    response: response.data });
  } catch (error) {
    yield put({
      type: CONSTANTS.DASHBOARD_RECENT_PATIENT_FAILURE,
      error: error.response.data,
    });
  }
}

export default function* DashboardAccessSaga() {
  yield takeLatest(CONSTANTS.DASHBOARD_ACCESS, dashboardAccessHandler);
  yield takeLatest(CONSTANTS.DASHBOARD_COUNTER_LIST, getAllCounters);
  yield takeLatest(CONSTANTS.DASHBOARD_RECENT_PATIENT_LIST,getAllRecentPatientList);
  
}
