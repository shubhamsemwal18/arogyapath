import { call, put, takeLatest } from "redux-saga/effects";
import * as CONSTANTS from "./constant";
import { GetHeaders } from "../../Utils/headers";
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
export function* getAllExercises() {
  let url = `${process.env.NEXT_PUBLIC_APIURL}/getAllExercises`;

  try {
    const response = yield call(axios.get, url, GetHeaders());
    yield put({ type: CONSTANTS.GET_ALL_EXERCISES_SUCCESS, 
    response: response.data });
  } catch (error) {
    yield put({
      type: CONSTANTS.GET_ALL_EXERCISES_FAILURE,
      error: error.response.data,
    });
  }
}




export default function* CreateExerciseSaga() {
  yield takeLatest(CONSTANTS.CREATE_EXERCISES, createExerciseHandler);
  yield takeLatest(CONSTANTS.GET_ALL_EXERCISES, getAllExercises);
}
