import { call, put, takeLatest } from "redux-saga/effects";
import * as CONSTANTS from "./constant";
import { GetHeaders } from "../../../Utils/headers";
import axios from "axios";

export function* createDietsToTakeHandler(action){
  let url = `${process.env.NEXT_PUBLIC_APIURL}/add_diets_to_take`

  try {
    const response = yield call(axios.post, url, action.payload, GetHeaders());
    yield put({ type: CONSTANTS.CREATE_DIETS_TO_TAKE_SUCCESS, 
    response: response.data });
  } catch (error) {
    yield put({
      type: CONSTANTS.CREATE_DIETS_TO_TAKE_FAILURE,
      error: error.response.data,
    });
  }
}

export function* updateDietsToTakeHandler(action){
  let url = `${process.env.NEXT_PUBLIC_APIURL}/update_diets_to_take`

  try {
    const response = yield call(axios.put, url, action.payload, GetHeaders());
    yield put({ type: CONSTANTS.UPDATE_DIETS_TO_TAKE_SUCCESS, 
    response: response.data });
  } catch (error) {
    yield put({
      type: CONSTANTS.UPDATE_DIETS_TO_TAKE_FAILURE,
      error: error.response.data,
    });
  }
}


export function* createDietsNotToTakeHandler(action){
  let url = `${process.env.NEXT_PUBLIC_APIURL}/add_diets_not_to_take`

  try {
    const response = yield call(axios.post, url, action.payload, GetHeaders());
    yield put({ type: CONSTANTS.CREATE_DIETS_NOT_TO_TAKE_SUCCESS, 
    response: response.data });
  } catch (error) {
    yield put({
      type: CONSTANTS.CREATE_DIETS_NOT_TO_TAKE_FAILURE,
      error: error.response.data,
    });
  }
}

export function* updateDietsNotToTakeHandler(action){
  let url = `${process.env.NEXT_PUBLIC_APIURL}/update_diets_not_to_take`

  try {
    const response = yield call(axios.put, url, action.payload, GetHeaders());
    yield put({ type: CONSTANTS.UPDATE_DIETS_NOT_TO_TAKE_SUCCESS, 
    response: response.data });
  } catch (error) {
    yield put({
      type: CONSTANTS.UPDATE_DIETS_NOT_TO_TAKE_FAILURE,
      error: error.response.data,
    });
  }
}







export default function* DietsManagementSaga() {
  yield takeLatest(CONSTANTS.CREATE_DIETS_TO_TAKE, createDietsToTakeHandler);
  yield takeLatest(CONSTANTS.UPDATE_DIETS_TO_TAKE, updateDietsToTakeHandler);
  yield takeLatest(CONSTANTS.CREATE_DIETS_NOT_TO_TAKE, createDietsNotToTakeHandler);
  yield takeLatest(CONSTANTS.UPDATE_DIETS_NOT_TO_TAKE, updateDietsNotToTakeHandler);
}
