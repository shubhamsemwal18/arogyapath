import { call, put, takeLatest } from "redux-saga/effects";
import * as CONSTANTS from "./constant";
import { GetHeaders } from "../../../Utils/headers";
import axios from "axios";

export function* addReportHandler(action) {
  let url = `${process.env.NEXT_PUBLIC_APIURL}/createReport`;

  try {
    const response = yield call(axios.post, url, action.payload, GetHeaders());
    yield put({ type: CONSTANTS.ADD_REPORT_SUCCESS, 
    response: response.data });
  } catch (error) {
    yield put({
      type: CONSTANTS.ADD_REPORT_FAILURE,
      error: error.response.data,
    });
  }
}

export function* updateReportHandler(action){
  let url = `${process.env.NEXT_PUBLIC_APIURL}/updateReport`;

  try {
    const response = yield call(axios.put, url, action.payload, GetHeaders());
    yield put({ type: CONSTANTS.UPDATE_REPORT_SUCCESS, 
    response: response.data });
  } catch (error) {
    yield put({
      type: CONSTANTS.UPDATE_REPORT_FAILURE,
      error: error.response.data,
    });
  }
}


export default function* Pre_ConsultationReportSaga() {
  yield takeLatest(CONSTANTS.ADD_REPORT, addReportHandler);
  yield takeLatest(CONSTANTS.UPDATE_REPORT, updateReportHandler);
}
