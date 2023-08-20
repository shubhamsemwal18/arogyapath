import { call, put, takeLatest } from "redux-saga/effects";
import * as CONSTANTS from "./constant";
import { GetHeaders } from "../../../Utils/headers";
import axios from "axios";

export function* createQuestionHandler(action) {
  let url = `${process.env.NEXT_PUBLIC_APIURL}/addQuestion`;

  try {
    const response = yield call(axios.post, url, action.payload, GetHeaders());
    yield put({ type: CONSTANTS.CREATE_QUESTION_SUCCESS,
    response: response.data });
  } catch (error) {
    yield put({
      type: CONSTANTS.CREATE_QUESTION_FAILURE,
      error: error.response.data,
    });
  }
}

export function* updateQuestionHandler(action) {
  let url = `${process.env.NEXT_PUBLIC_APIURL}/updateQuestion`;

  try {
    const response = yield call(axios.put, url, action.payload, GetHeaders());
    yield put({ type: CONSTANTS.UPDATE_QUESTION_SUCCESS, 
    response: response.data });
  } catch (error) {
    yield put({
      type: CONSTANTS.UPDATE_QUESTION_FAILURE,
      error: error.response.data,
    });
  }
}

export default function* QuestionManagementSaga() {
  yield takeLatest(CONSTANTS.CREATE_QUESTION, createQuestionHandler);
  yield takeLatest(CONSTANTS.UPDATE_QUESTION, updateQuestionHandler);
}
