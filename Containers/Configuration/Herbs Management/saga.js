import { call, put, takeLatest } from "redux-saga/effects";
import * as CONSTANTS from "./constant";
import { GetHeaders } from "../../../Utils/headers";
import axios from "axios";

export function* createHerbsHandler(action) {
  let url = `${process.env.NEXT_PUBLIC_APIURL}/create-herbs`;

  try {
    const response = yield call(axios.post, url, action.payload, GetHeaders());
    yield put({ type: CONSTANTS.CREATE_HERBS_SUCCESS, 
    response: response.data });
  } catch (error) {
    yield put({
      type: CONSTANTS.CREATE_HERBS_FAILURE,
      error: error.response.data,
    });
  }
}

export function* updateHerbsHandler(action){
  let url = `${process.env.NEXT_PUBLIC_APIURL}/updateHerbsDetails`;

  try {
    const response = yield call(axios.put, url, action.payload, GetHeaders());
    yield put({ type: CONSTANTS.UPDATE_HERBS_SUCCESS, 
    response: response.data });
  } catch (error) {
    yield put({
      type: CONSTANTS.UPDATE_HERBS_FAILURE,
      error: error.response.data,
    });
  }
}


export default function* HerbsManagementSaga() {
  yield takeLatest(CONSTANTS.CREATE_HERBS, createHerbsHandler);
  yield takeLatest(CONSTANTS.UPDATE_HERBS, updateHerbsHandler);
}
