import { call, put, takeLatest } from "redux-saga/effects";
import * as CONSTANTS from "./constant";
import { GetHeaders } from "../../../Utils/headers";
import axios from "axios";

export function* createExerciseHandler(action) {
  let url = `${process.env.NEXT_PUBLIC_APIURL}/create-exercises`;

  try {
    const response = yield call(axios.post, url, action.payload, GetHeaders());
    yield put({ type: CONSTANTS.CREATE_EXERCISES_SUCCESS, 
    response: response.data });
  } catch (error) {
    yield put({
      type: CONSTANTS.CREATE_EXERCISES_FAILURE,
      error: error.response.data,
    });
  }
}

export function* updateExerciseHandler(action) {
  let url = `${process.env.NEXT_PUBLIC_APIURL}/updateExercisesDetails`;

  try {
    const response = yield call(axios.post, url, action.payload, GetHeaders());
    yield put({ type: CONSTANTS.UPDATE_EXERCISES_SUCCESS, 
    response: response.data });
  } catch (error) {
    yield put({
      type: CONSTANTS.UPDATE_EXERCISES_FAILURE,
      error: error.response.data,
    });
  }
}


export default function* ExerciseManagementSaga() {
  yield takeLatest(CONSTANTS.CREATE_EXERCISES, createExerciseHandler);
  yield takeLatest(CONSTANTS.UPDATE_EXERCISES, updateExerciseHandler);
}
