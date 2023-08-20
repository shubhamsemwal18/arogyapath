import { call, put, takeLatest } from "redux-saga/effects";
import * as CONSTANTS from "./constant";
import { GetHeaders } from "../../../../Utils/headers";
import axios from "axios";

export function* createDiseaseMedicineInstructionHandler(action){
  let url = `${process.env.NEXT_PUBLIC_APIURL}/add_disease_medicine_instruction`

  try {
    const response = yield call(axios.post, url, action.payload, GetHeaders());
    yield put({ type: CONSTANTS.CREATE_DISEASE_WITH_MEDICINE_INSTRUCTION_SUCCESS, 
    response: response.data });
  } catch (error) {
    yield put({
      type: CONSTANTS.CREATE_DISEASE_WITH_MEDICINE_INSTRUCTION_FAILURE,
      error: error.response.data,
    });
  }
}

export function* updateDiseaseMedicineInstructionHandler(action){
  let url = `${process.env.NEXT_PUBLIC_APIURL}/update_disease_medicine_instruction`

  try {
    const response = yield call(axios.put, url, action.payload, GetHeaders());
    yield put({ type: CONSTANTS.UPDATE_DISEASE_WITH_MEDICINE_INSTRUCTION_SUCCESS, 
    response: response.data });
  } catch (error) {
    yield put({
      type: CONSTANTS.UPDATE_DISEASE_WITH_MEDICINE_INSTRUCTION_FAILURE,
      error: error.response.data,
    });
  }
}

export function* getDiseaseMedicineInstructionHandler(){
  let url = `${process.env.NEXT_PUBLIC_APIURL}/get_all_disease_medicine_instruction`

  try {
    const response = yield call(axios.get, url, GetHeaders());
    yield put({ type: CONSTANTS.GET_DISEASE_MAPPED_MEDICINE_iNSTRUCTION_SUCCESS, 
    response: response.data });
  } catch (error) {
    yield put({
      type: CONSTANTS.GET_DISEASE_MAPPED_MEDICINE_iNSTRUCTION_FAILURE,
      error: error.response.data,
    });
  }
}

export default function* DiseaseMapMedicineInstructionSaga() {
  yield takeLatest(CONSTANTS.CREATE_DISEASE_WITH_MEDICINE_INSTRUCTION, createDiseaseMedicineInstructionHandler);
  yield takeLatest(CONSTANTS.UPDATE_DISEASE_WITH_MEDICINE_INSTRUCTION, updateDiseaseMedicineInstructionHandler);
  yield takeLatest(CONSTANTS.GET_DISEASE_MAPPED_MEDICINE_iNSTRUCTION,getDiseaseMedicineInstructionHandler);
 
}
