import { call, put, takeLatest } from "redux-saga/effects";
import * as CONSTANTS from "./constant";
import { GetHeaders } from "../../../../Utils/headers";
import axios from "axios";

export function* createDiseaseExerciseInstructionHandler(action){
  let url = `${process.env.NEXT_PUBLIC_APIURL}/add_disease_exercise_instruction`

  try {
    const response = yield call(axios.post, url, action.payload, GetHeaders());
    yield put({ type: CONSTANTS.CREATE_DISEASE_WITH_EXERCISE_INSTRUCTION_SUCCESS, 
    response: response.data });
  } catch (error) {
    yield put({
      type: CONSTANTS.CREATE_DISEASE_WITH_EXERCISE_INSTRUCTION_FAILURE,
      error: error.response.data,
    });
  }
}

export function* updateDiseaseExerciseInstructionHandler(action){
  let url = `${process.env.NEXT_PUBLIC_APIURL}/update_disease_exercise_instruction`

  try {
    const response = yield call(axios.put, url, action.payload, GetHeaders());
    yield put({ type: CONSTANTS.UPDATE_DISEASE_WITH_EXERCISE_INSTRUCTION_SUCCESS, 
    response: response.data });
  } catch (error) {
    yield put({
      type: CONSTANTS.UPDATE_DISEASE_WITH_EXERCISE_INSTRUCTION_FAILURE,
      error: error.response.data,
    });
  }
}

export function* getDiseaseExerciseInstructionHandler(){
  let url = `${process.env.NEXT_PUBLIC_APIURL}/get_all_disease_exercise_instruction`

  try {
    const response = yield call(axios.get, url, GetHeaders());
    yield put({ type: CONSTANTS.GET_DISEASE_MAPPED_EXERCISE_iNSTRUCTION_SUCCESS, 
    response: response.data });
  } catch (error) {
    yield put({
      type: CONSTANTS.GET_DISEASE_MAPPED_EXERCISE_iNSTRUCTION_FAILURE,
      error: error.response.data,
    });
  }
}

export default function* DiseaseMapExerciseInstructionSaga() {
  yield takeLatest(CONSTANTS.CREATE_DISEASE_WITH_EXERCISE_INSTRUCTION, createDiseaseExerciseInstructionHandler);
  yield takeLatest(CONSTANTS.UPDATE_DISEASE_WITH_EXERCISE_INSTRUCTION, updateDiseaseExerciseInstructionHandler);
  yield takeLatest(CONSTANTS.GET_DISEASE_MAPPED_EXERCISE_iNSTRUCTION,getDiseaseExerciseInstructionHandler);
 
}
