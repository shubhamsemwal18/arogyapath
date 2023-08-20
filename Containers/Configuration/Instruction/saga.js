import { call, put, takeLatest } from "redux-saga/effects";
import * as CONSTANTS from "./constant";
import { GetHeaders } from "../../../Utils/headers";
import axios from "axios";

export function* createMedicineInstructionHandler(action){
  let url = `${process.env.NEXT_PUBLIC_APIURL}/add_medicine_instruction`

  try {
    const response = yield call(axios.post, url, action.payload, GetHeaders());
    yield put({ type: CONSTANTS.CREATE_MEDICINE_INSTRUCTION_SUCCESS, 
    response: response.data });
  } catch (error) {
    yield put({
      type: CONSTANTS.CREATE_MEDICINE_INSTRUCTION_FAILURE,
      error: error.response.data,
    });
  }
}

export function* updateMedicineInstructionHandler(action){
  let url = `${process.env.NEXT_PUBLIC_APIURL}/update_medicine_instruction`

  try {
    const response = yield call(axios.put, url, action.payload, GetHeaders());
    yield put({ type: CONSTANTS.UPDATE_MEDICINE_INSTRUCTION_SUCCESS, 
    response: response.data });
  } catch (error) {
    yield put({
      type: CONSTANTS.UPDATE_MEDICINE_INSTRUCTION_FAILURE,
      error: error.response.data,
    });
  }
}


export function* createExerciseInstructionHandler(action){
  let url = `${process.env.NEXT_PUBLIC_APIURL}/add_exercise_instruction`

  try {
    const response = yield call(axios.post, url, action.payload, GetHeaders());
    yield put({ type: CONSTANTS.CREATE_EXERCISE_INSTRUCTION_SUCCESS, 
    response: response.data });
  } catch (error) {
    yield put({
      type: CONSTANTS.CREATE_EXERCISE_INSTRUCTION_FAILURE,
      error: error.response.data,
    });
  }
}

export function* updateExerciseInstructionHandler(action){
  let url = `${process.env.NEXT_PUBLIC_APIURL}/update_exercise_instruction`

  try {
    const response = yield call(axios.put, url, action.payload, GetHeaders());
    yield put({ type: CONSTANTS.UPDATE_EXERCISE_INSTRUCTION_SUCCESS, 
    response: response.data });
  } catch (error) {
    yield put({
      type: CONSTANTS.UPDATE_EXERCISE_INSTRUCTION_FAILURE,
      error: error.response.data,
    });
  }
}


export function* createSpecialInstructionHandler(action){
  let url = `${process.env.NEXT_PUBLIC_APIURL}/add_special_instruction`

  try {
    const response = yield call(axios.post, url, action.payload, GetHeaders());
    yield put({ type: CONSTANTS.CREATE_SPECIAL_INSTRUCTION_SUCCESS, 
    response: response.data });
  } catch (error) {
    yield put({
      type: CONSTANTS.CREATE_SPECIAL_INSTRUCTION_FAILURE,
      error: error.response.data,
    });
  }
}

export function* updateSpecialInstructionHandler(action){
  let url = `${process.env.NEXT_PUBLIC_APIURL}/update_special_instruction`

  try {
    const response = yield call(axios.put, url, action.payload, GetHeaders());
    yield put({ type: CONSTANTS.UPDATE_SPECIAL_INSTRUCTION_SUCCESS, 
    response: response.data });
  } catch (error) {
    yield put({
      type: CONSTANTS.UPDATE_SPECIAL_INSTRUCTION_FAILURE,
      error: error.response.data,
    });
  }
}


export default function* InstructionManagementSaga() {
  yield takeLatest(CONSTANTS.CREATE_MEDICINE_INSTRUCTION, createMedicineInstructionHandler);
  yield takeLatest(CONSTANTS.UPDATE_MEDICINE_INSTRUCTION, updateMedicineInstructionHandler);
  yield takeLatest(CONSTANTS.CREATE_EXERCISE_INSTRUCTION, createExerciseInstructionHandler);
  yield takeLatest(CONSTANTS.UPDATE_EXERCISE_INSTRUCTION, updateExerciseInstructionHandler);
  yield takeLatest(CONSTANTS.CREATE_SPECIAL_INSTRUCTION, createSpecialInstructionHandler);
  yield takeLatest(CONSTANTS.UPDATE_SPECIAL_INSTRUCTION, updateSpecialInstructionHandler);
}
