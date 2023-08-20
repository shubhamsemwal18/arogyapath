import { call, put, takeLatest } from "redux-saga/effects";
import * as CONSTANTS from "./constant";
import { GetHeaders } from "../../Utils/headers";
import axios from "axios";

export function* createDispensaryHandler(action) {
  let url = `${process.env.NEXT_PUBLIC_APIURL}/create-dispensary`;

  try {
    const response = yield call(axios.post, url, action.payload, GetHeaders());
    yield put({ type: CONSTANTS.CREATE_DISPENSARY_SUCCESS, 
    response: response.data });
  } catch (error) {
    yield put({
      type: CONSTANTS.CREATE_DISPENSARY_FAILURE,
      error: error.response.data,
    });
  }
}

export default function* CreateDispensarySaga() {
  yield takeLatest(CONSTANTS.CREATE_DISPENSARY, createDispensaryHandler);
}
