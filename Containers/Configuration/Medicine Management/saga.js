import { call, put, takeLatest } from "redux-saga/effects";
import * as CONSTANTS from "./constant";
import { GetHeaders } from "../../../Utils/headers";
import axios from "axios";

export function* createMedicineHandler(action) {
  let url = `${process.env.NEXT_PUBLIC_APIURL}/create-medicine`;

  try {
    const response = yield call(axios.post, url, action.payload, GetHeaders());
    yield put({ type: CONSTANTS.CREATE_MEDICINE_SUCCESS, 
    response: response.data });
  } catch (error) {
    yield put({
      type: CONSTANTS.CREATE_MEDICINE_FAILURE,
      error: error.response.data,
    });
  }
}

export function* updateMedicineHandler(action) {
  let url = `${process.env.NEXT_PUBLIC_APIURL}/updateMedicines`;

  try {
    const response = yield call(axios.post, url, action.payload, GetHeaders());
    yield put({ type: CONSTANTS.UPDATE_MEDICINE_SUCCESS, 
    response: response.data });
  } catch (error) {
    yield put({
      type: CONSTANTS.UPDATE_MEDICINE_FAILURE,
      error: error.response.data,
    });
  }
}


export default function* MedicineManagementSaga() {
  yield takeLatest(CONSTANTS.CREATE_MEDICINE, createMedicineHandler);
  yield takeLatest(CONSTANTS.UPDATE_MEDICINE, updateMedicineHandler);
}

