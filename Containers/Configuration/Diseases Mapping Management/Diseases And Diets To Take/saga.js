import { call, put, takeLatest } from "redux-saga/effects";
import * as CONSTANTS from "./constant";
import { GetHeaders } from "../../../../Utils/headers";
import axios from "axios";

export function* CreateDiseaseDietToTakeHandler(action){
  let url = `${process.env.NEXT_PUBLIC_APIURL}/add_disease_diet_take_mapping`

  try {
    const response = yield call(axios.post, url, action.payload, GetHeaders());
    yield put({ type: CONSTANTS.CREATE_DISEASE_WITH_DIETS_TO_TAKE_SUCCESS, 
    response: response.data });
  } catch (error) {
    yield put({
      type: CONSTANTS.CREATE_DISEASE_WITH_DIETS_TO_TAKE_FAILURE,
      error: error.response.data,
    });
  }
}

export function* UpdateDiseaseDietToTakeHandler(action){
  let url = `${process.env.NEXT_PUBLIC_APIURL}/update_disease_diet_take_mapping`

  try {
    const response = yield call(axios.put, url, action.payload, GetHeaders());
    yield put({ type: CONSTANTS.UPDATE_DISEASE_WITH_DIETS_TO_TAKE_SUCCESS, 
    response: response.data });
  } catch (error) {
    yield put({
      type: CONSTANTS.UPDATE_DISEASE_WITH_DIETS_TO_TAKE_FAILURE,
      error: error.response.data,
    });
  }
}


export function* GetDiseaseDietToTakeHandler(){
  let url = `${process.env.NEXT_PUBLIC_APIURL}/get_all_mapped_diets_take`

  try {
    const response = yield call(axios.get, url, GetHeaders());
    yield put({ type: CONSTANTS.GET_DISEASE_WITH_DIETS_TO_TAKE_SUCCESS, 
    response: response.data });
  } catch (error) {
    yield put({
      type: CONSTANTS.GET_DISEASE_WITH_DIETS_TO_TAKE_FAILURE,
      error: error.response.data,
    });
  }
}

export default function* DiseaseMapDietToTakeSaga() {
  yield takeLatest(CONSTANTS.CREATE_DISEASE_WITH_DIETS_TO_TAKE, CreateDiseaseDietToTakeHandler);
  yield takeLatest(CONSTANTS.UPDATE_DISEASE_WITH_DIETS_TO_TAKE, UpdateDiseaseDietToTakeHandler);
  yield takeLatest(CONSTANTS.GET_DISEASE_WITH_DIETS_TO_TAKE, GetDiseaseDietToTakeHandler);
}
