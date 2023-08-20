import { call, put, takeLatest } from "redux-saga/effects";
import * as CONSTANTS from "./constant";
import { GetHeaders } from "../../Utils/headers";
import axios from "axios";

export function* createAccountsHandler(action) {
  let url = `${process.env.NEXT_PUBLIC_APIURL}/accounts`;

  try {
    const response = yield call(axios.post, url, action.payload, GetHeaders());
    yield put({ type: CONSTANTS.CREATE_ACCOUNTS_SUCCESS, 
    response: response.data });
  } catch (error) {
    yield put({
      type: CONSTANTS.CREATE_ACCOUNTS_FAILURE,
      error: error.response.data,
    });
  }
}

export default function* CreateAccountsSaga() {
  yield takeLatest(CONSTANTS.CREATE_ACCOUNTS, createAccountsHandler);
}
