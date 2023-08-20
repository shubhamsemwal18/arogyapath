import { call, put, takeLatest } from "redux-saga/effects";
import * as CONSTANTS from "./constant";
import { GetHeaders } from "../../../../Utils/headers";
import axios from "axios";

export function* diseasesExercisesHandler(action){
  let url = `${process.env.NEXT_PUBLIC_APIURL}/create-DiseasesExercises`

  try {
    const response = yield call(axios.post, url, action.payload, GetHeaders());
    yield put({ type: CONSTANTS.CREATE_DISEASES_AND_EXERCISES_MAPING_SUCCESS, 
    response: response.data });
  } catch (error) {
    yield put({
      type: CONSTANTS.CREATE_DISEASES_AND_EXERCISES_MAPING_FAILURE,
      error: error.response.data,
    });
  }
}

export function* updateDiseasesExercisesHandler(action){
  let url = `${process.env.NEXT_PUBLIC_APIURL}/updateDiseasesExercises`

  try {
    const response = yield call(axios.put, url, action.payload, GetHeaders());
    yield put({ type: CONSTANTS.UPDATE_DISEASES_AND_EXERCISES_MAPING_SUCCESS, 
    response: response.data });
  } catch (error) {
    yield put({
      type: CONSTANTS.UPDATE_DISEASES_AND_EXERCISES_MAPING_FAILURE,
      error: error.response.data,
    });
  }
}




export default function* DiseaseAndExerciseMappingSaga() {
  yield takeLatest(CONSTANTS.CREATE_DISEASES_AND_EXERCISES_MAPING, diseasesExercisesHandler);
  yield takeLatest(CONSTANTS.UPDATE_DISEASES_AND_EXERCISES_MAPING, updateDiseasesExercisesHandler);
}
