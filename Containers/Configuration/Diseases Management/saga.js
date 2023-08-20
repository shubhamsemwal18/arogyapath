import { call, put, takeLatest } from "redux-saga/effects";
import * as CONSTANTS from "./constant";
import { GetHeaders } from "../../../Utils/headers";
import axios from "axios";

export function* createDiseasesHandler(action) {
  let url = `${process.env.NEXT_PUBLIC_APIURL}/create-diseases`;

  try {
    const response = yield call(axios.post, url, action.payload, GetHeaders());
    yield put({ type: CONSTANTS.CREATE_DISEASES_SUCCESS, 
    response: response.data });
  } catch (error) {
    yield put({
      type: CONSTANTS.CREATE_DISEASES_FAILURE,
      error: error.response.data,
    });
  }
}

export function* updateDiseasesHandler(action) {
  let url = `${process.env.NEXT_PUBLIC_APIURL}/updateDiseasesDetails`;

  try {
    const response = yield call(axios.put, url, action.payload, GetHeaders());
    yield put({ type: CONSTANTS.UPDATE_DISEASES_SUCCESS, 
    response: response.data });
  } catch (error) {
    yield put({
      type: CONSTANTS.UPDATE_DISEASES_FAILURE,
      error: error.response.data,
    });
  }
}

export default function* DiseasesManagementSaga() {
  yield takeLatest(CONSTANTS.CREATE_DISEASES, createDiseasesHandler);
  yield takeLatest(CONSTANTS.UPDATE_DISEASES, updateDiseasesHandler);
}
