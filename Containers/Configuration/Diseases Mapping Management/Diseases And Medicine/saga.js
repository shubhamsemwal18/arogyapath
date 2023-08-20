import { call, put, takeLatest } from "redux-saga/effects";
import * as CONSTANTS from "./constant";
import { GetHeaders } from "../../../../Utils/headers";
import axios from "axios";

export function* createDiseasesAndMedicineMapingHandler(action) {
  let url = `${process.env.NEXT_PUBLIC_APIURL}/create-DiseasesAndMedicineMaping`;

  try {
    const response = yield call(axios.post, url, action.payload, GetHeaders());
    yield put({ type: CONSTANTS.CREATE_DISEASES_AND_MEDICINE_MAPING_SUCCESS, 
    response: response.data });
  } catch (error) {
    yield put({
      type: CONSTANTS.CREATE_DISEASES_AND_MEDICINE_MAPING_FAILURE,
      error: error.response.data,
    });
  }
}

export function* getAllMappedDiseasesAndMedicineHandler(action){
  let url = `${process.env.NEXT_PUBLIC_APIURL}/get-mappedDiseasesAndMedicineByDiseases`

  try {
    const response = yield call(axios.post, url, action.payload, GetHeaders());
    yield put({ type: CONSTANTS.GET_ALL_MAPPED_DISEASESANDMEDICINE_SUCCESS, 
    response: response.data });
  } catch (error) {
    yield put({
      type: CONSTANTS.GET_ALL_MAPPED_DISEASESANDMEDICINE_FAILURE,
      error: error.response.data,
    });
  }
}

export function* updateDiseasesAndMedicineMapingHandler(action) {
  let url = `${process.env.NEXT_PUBLIC_APIURL}/updateDiseasesMedicine`;

  try {
    const response = yield call(axios.put, url, action.payload, GetHeaders());
    yield put({ type: CONSTANTS.UPDATE_DISEASES_AND_MEDICINE_MAPING_SUCCESS, 
    response: response.data });
  } catch (error) {
    yield put({
      type: CONSTANTS.UPDATE_DISEASES_AND_MEDICINE_MAPING_FAILURE,
      error: error.response.data,
    });
  }
}

export default function* DiseaseAndMedicineSaga() {
  yield takeLatest(CONSTANTS.CREATE_DISEASES_AND_MEDICINE_MAPING, createDiseasesAndMedicineMapingHandler);
  yield takeLatest(CONSTANTS.UPDATE_DISEASES_AND_MEDICINE_MAPING, updateDiseasesAndMedicineMapingHandler);
  yield takeLatest(CONSTANTS.GET_ALL_MAPPED_DISEASESANDMEDICINE, getAllMappedDiseasesAndMedicineHandler);
}
