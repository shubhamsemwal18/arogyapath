import { call, put, takeLatest } from "redux-saga/effects";
import * as CONSTANTS from "./constant";
import { GetHeaders } from "../../Utils/headers";
import axios from "axios";

export function* registerPreConsultationHandler(action){
  let url = `${process.env.NEXT_PUBLIC_APIURL}/register-pre-consultation`;
  
  try {
    const response = yield call(axios.post, url, action.payload, GetHeaders());
    yield put({ type: CONSTANTS.REGISTER_PRE_CONSULTAION_SUCCESS, 
    response: response.data });
  } catch (error) {
    yield put({
      type: CONSTANTS.REGISTER_PRE_CONSULTAION_FAILURE,
      error: error.response.data,
    });
  }
}

export default function* PreConsultationSaga() {
  yield takeLatest(CONSTANTS.REGISTER_PRE_CONSULTAION, registerPreConsultationHandler)
}
