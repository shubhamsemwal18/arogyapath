import { call, put, takeLatest } from "redux-saga/effects";
import * as CONSTANTS from "./constant";
import { GetHeaders } from "../../../Utils/headers";
import axios from "axios";

export function* addInventoryHandler(action) {
  let url = `${process.env.NEXT_PUBLIC_APIURL}/add_inventory`;

  try {
    const response = yield call(axios.post, url, action.payload, GetHeaders());
    yield put({ type: CONSTANTS.ADD_INVENTORY_SUCCESS, 
    response: response.data });
  } catch (error) {
    yield put({
      type: CONSTANTS.ADD_INVENTORY_FAILURE,
      error: error.response.data,
    });
  }
}


export default function* InventorySaga() {
  yield takeLatest(CONSTANTS.ADD_INVENTORY, addInventoryHandler);
}
