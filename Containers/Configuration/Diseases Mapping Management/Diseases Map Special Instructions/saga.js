import { call, put, takeLatest } from "redux-saga/effects";
import * as CONSTANTS from "./constant";
import { GetHeaders } from "../../../../Utils/headers";
import axios from "axios";

export function* createDiseaseSpecialInstructionHandler(action){
  let url = `${process.env.NEXT_PUBLIC_APIURL}/add_disease_special_instruction`

  try {
    const response = yield call(axios.post, url, action.payload, GetHeaders());
    yield put({ type: CONSTANTS.CREATE_DISEASE_WITH_SPECIAL_INSTRUCTION_SUCCESS, 
    response: response.data });
  } catch (error) {
    yield put({
      type: CONSTANTS.CREATE_DISEASE_WITH_SPECIAL_INSTRUCTION_FAILURE,
      error: error.response.data,
    });
  }
}

export function* updateDiseaseSpecialInstructionHandler(action){
  let url = `${process.env.NEXT_PUBLIC_APIURL}/update_disease_special_instruction`

  try {
    const response = yield call(axios.put, url, action.payload, GetHeaders());
    yield put({ type: CONSTANTS.UPDATE_DISEASE_WITH_SPECIAL_INSTRUCTION_SUCCESS, 
    response: response.data });
  } catch (error) {
    yield put({
      type: CONSTANTS.UPDATE_DISEASE_WITH_SPECIAL_INSTRUCTION_FAILURE,
      error: error.response.data,
    });
  }
}

export function* getDiseaseSpecialInstructionHandler(){
  let url = `${process.env.NEXT_PUBLIC_APIURL}/get_all_disease_special_instruction`

  try {
    const response = yield call(axios.get, url, GetHeaders());
    yield put({ type: CONSTANTS.GET_DISEASE_MAPPED_SPECIAL_iNSTRUCTION_SUCCESS, 
    response: response.data });
  } catch (error) {
    yield put({
      type: CONSTANTS.GET_DISEASE_MAPPED_SPECIAL_iNSTRUCTION_FAILURE,
      error: error.response.data,
    });
  }
}

export default function* DiseaseMapSpecialInstructionSaga() {
  yield takeLatest(CONSTANTS.CREATE_DISEASE_WITH_SPECIAL_INSTRUCTION, createDiseaseSpecialInstructionHandler);
  yield takeLatest(CONSTANTS.UPDATE_DISEASE_WITH_SPECIAL_INSTRUCTION, updateDiseaseSpecialInstructionHandler);
  yield takeLatest(CONSTANTS.GET_DISEASE_MAPPED_SPECIAL_iNSTRUCTION,getDiseaseSpecialInstructionHandler);
 
}
