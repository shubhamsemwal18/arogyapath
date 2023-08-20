import { call, put, takeLatest } from "redux-saga/effects";
import * as CONSTANTS from "./constant";
import { GetHeaders } from "../../../Utils/headers";
import axios from "axios";


export function* getDispensaryDateWiseDataHandler(action) {
  let url = `${process.env.NEXT_PUBLIC_APIURL}/dateWiseDispensaryReport`;
  try {
    const response = yield call(axios.post, url, action.payload, GetHeaders());
    yield put({ type: CONSTANTS.GET_DISPENSARY_DATE_WISE_DATA_SUCCESS, 
    response: response.data });
  } catch (error) {
    yield put({
      type: CONSTANTS.GET_DISPENSARY_DATE_WISE_DATA_FAILURE,
      error: error.response.data,
    });
  }
}



export default function* DispensaryReportManagementSaga() {
 
  yield takeLatest(CONSTANTS.GET_DISPENSARY_DATE_WISE_DATA, getDispensaryDateWiseDataHandler);
  
}
