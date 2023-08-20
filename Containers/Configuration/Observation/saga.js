import { call, put, takeLatest } from "redux-saga/effects";
import * as CONSTANTS from "./constant";
import { GetHeaders } from "../../../Utils/headers";
import axios from "axios";

export function* CreatePulseObservationHandler(action){
  let url = `${process.env.NEXT_PUBLIC_APIURL}/addPulseObservation`

  try {
    const response = yield call(axios.post, url, action.payload, GetHeaders());
    yield put({ type: CONSTANTS.CREATE_PULSE_OBSERVATION_SUCCESS, 
    response: response.data });
  } catch (error) {
    yield put({
      type: CONSTANTS.CREATE_PULSE_OBSERVATION_FAILURE,
      error: error.response.data,
    });
  }
}

export function* UpdatePulseObservationHandler(action){
  let url = `${process.env.NEXT_PUBLIC_APIURL}/updatePulseObservation`

  try {
    const response = yield call(axios.put, url, action.payload, GetHeaders());
    yield put({ type: CONSTANTS.UPDATE_PULSE_OBSERVATION_SUCCESS, 
    response: response.data });
  } catch (error) {
    yield put({
      type: CONSTANTS.UPDATE_PULSE_OBSERVATION_FAILURE,
      error: error.response.data,
    });
  }
}


export function* CreateToungeObservationHandler(action){
  let url = `${process.env.NEXT_PUBLIC_APIURL}/addToungeObservation`

  try {
    const response = yield call(axios.post, url, action.payload, GetHeaders());
    yield put({ type: CONSTANTS.CREATE_TOUNGE_OBSERVATION_SUCCESS, 
    response: response.data });
  } catch (error) {
    yield put({
      type: CONSTANTS.CREATE_TOUNGE_OBSERVATION_FAILURE,
      error: error.response.data,
    });
  }
}

export function* UpdateToungeObservationHandler(action){
  let url = `${process.env.NEXT_PUBLIC_APIURL}/updateToungeObservation`

  try {
    const response = yield call(axios.put, url, action.payload, GetHeaders());
    yield put({ type: CONSTANTS.UPDATE_TOUNGE_OBSERVATION_SUCCESS, 
    response: response.data });
  } catch (error) {
    yield put({
      type: CONSTANTS.UPDATE_TOUNGE_OBSERVATION_FAILURE,
      error: error.response.data,
    });
  }
}



export default function* ObservationManagementSaga() {
  yield takeLatest(CONSTANTS.CREATE_PULSE_OBSERVATION, CreatePulseObservationHandler);
  yield takeLatest(CONSTANTS.UPDATE_PULSE_OBSERVATION, UpdatePulseObservationHandler);
  yield takeLatest(CONSTANTS.CREATE_TOUNGE_OBSERVATION, CreateToungeObservationHandler);
  yield takeLatest(CONSTANTS.UPDATE_TOUNGE_OBSERVATION, UpdateToungeObservationHandler);
}
