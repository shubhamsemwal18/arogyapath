import { call, put, takeLatest } from "redux-saga/effects";
import * as CONSTANTS from "./constant";
import { GetHeaders } from "../../../../Utils/headers";
import axios from "axios";

export function* createDiseaseTimeTableHandler(action){
  let url = `${process.env.NEXT_PUBLIC_APIURL}/add_disease_time_table`

  try {
    const response = yield call(axios.post, url, action.payload, GetHeaders());
    yield put({ type: CONSTANTS.CREATE_DISEASE_WITH_TIME_TABLE_SUCCESS, 
    response: response.data });
  } catch (error) {
    yield put({
      type: CONSTANTS.CREATE_DISEASE_WITH_TIME_TABLE_FAILURE,
      error: error.response.data,
    });
  }
}

export function* updateDiseaseTimeTableHandler(action){
  let url = `${process.env.NEXT_PUBLIC_APIURL}/update_disease_time_table`

  try {
    const response = yield call(axios.post, url, action.payload, GetHeaders());
    yield put({ type: CONSTANTS.UPDATE_DISEASE_WITH_TIME_TABLE_SUCCESS, 
    response: response.data });
  } catch (error) {
    yield put({
      type: CONSTANTS.UPDATE_DISEASE_WITH_TIME_TABLE_FAILURE,
      error: error.response.data,
    });
  }
}

export function* getDiseaseTimeTableHandler(){
  let url = `${process.env.NEXT_PUBLIC_APIURL}/get_all_mapped_time_table`

  try {
    const response = yield call(axios.get, url, GetHeaders());
    yield put({ type: CONSTANTS.GET_DISEASE_MAPPED_TIME_TABLE_SUCCESS, 
    response: response.data });
  } catch (error) {
    yield put({
      type: CONSTANTS.GET_DISEASE_MAPPED_TIME_TABLE_FAILURE,
      error: error.response.data,
    });
  }
}


export function* getDiseaseMedicineHandler(action){
  let url = `${process.env.NEXT_PUBLIC_APIURL}/getDiseaseMedicine/${action.payload}`

  try {
    const response = yield call(axios.get, url, GetHeaders());
    yield put({ type: CONSTANTS.GET_DISEASE_MAPPED_MEDICINE_SUCCESS, 
    response: response.data });
  } catch (error) {
    yield put({
      type: CONSTANTS.GET_DISEASE_MAPPED_MEDICINE_FAILURE,
      error: error.response.data,
    });
  }
}


export default function* DiseaseMapTimeTableSaga() {
  yield takeLatest(CONSTANTS.CREATE_DISEASE_WITH_TIME_TABLE, createDiseaseTimeTableHandler);
  yield takeLatest(CONSTANTS.UPDATE_DISEASE_WITH_TIME_TABLE, updateDiseaseTimeTableHandler);
  yield takeLatest(CONSTANTS.GET_DISEASE_MAPPED_TIME_TABLE,getDiseaseTimeTableHandler);
  yield takeLatest(CONSTANTS.GET_DISEASE_MAPPED_MEDICINE,getDiseaseMedicineHandler);
 
}
