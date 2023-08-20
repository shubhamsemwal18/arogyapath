import { call, put, takeLatest } from "redux-saga/effects";
import * as CONSTANTS from "./constant";
import { GetHeaders } from "../../../../Utils/headers";
import axios from "axios";

export function* createDiseaseSpecificQuestionHandler(action){
  let url = `${process.env.NEXT_PUBLIC_APIURL}/add_disease_specific_question`

  try {
    const response = yield call(axios.post, url, action.payload, GetHeaders());
    yield put({ type: CONSTANTS.CREATE_DISEASE_WITH_SPECIFIC_QUESTION_SUCCESS, 
    response: response.data });
  } catch (error) {
    yield put({
      type: CONSTANTS.CREATE_DISEASE_WITH_SPECIFIC_QUESTION_FAILURE,
      error: error.response.data,
    });
  }
}

export function* updateDiseasesSpecificQuestionsHandler(action){
  let url = `${process.env.NEXT_PUBLIC_APIURL}/update_disease_specific_question`

  try {
    const response = yield call(axios.put, url, action.payload, GetHeaders());
    yield put({ type: CONSTANTS.UPDATE_DISEASE_WITH_SPECIFIC_QUESTION_SUCCESS, 
    response: response.data });
  } catch (error) {
    yield put({
      type: CONSTANTS.UPDATE_DISEASE_WITH_SPECIFIC_QUESTION_FAILURE,
      error: error.response.data,
    });
  }
}

export function* getDiseaseSpecificQuestionsHandler(){
  let url = `${process.env.NEXT_PUBLIC_APIURL}/get_all_disease_specific_question`

  try {
    const response = yield call(axios.get, url, GetHeaders());
    yield put({ type: CONSTANTS.GET_DISEASE_MAPPED_SPECIFIC_QUESTION_SUCCESS, 
    response: response.data });
  } catch (error) {
    yield put({
      type: CONSTANTS.GET_DISEASE_MAPPED_SPECIFIC_QUESTION_FAILURE,
      error: error.response.data,
    });
  }
}

export default function* DiseaseMapSpecificQuestionsSaga() {
  yield takeLatest(CONSTANTS.CREATE_DISEASE_WITH_SPECIFIC_QUESTION, createDiseaseSpecificQuestionHandler);
  yield takeLatest(CONSTANTS.UPDATE_DISEASE_WITH_SPECIFIC_QUESTION, updateDiseasesSpecificQuestionsHandler);
  yield takeLatest(CONSTANTS.GET_DISEASE_MAPPED_SPECIFIC_QUESTION,getDiseaseSpecificQuestionsHandler);
 
}
