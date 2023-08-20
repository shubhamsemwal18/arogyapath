import { call, put, takeLatest } from "redux-saga/effects";
import * as CONSTANTS from "./constant";
import { GetHeaders } from "../../../Utils/headers";
import axios from "axios";

export function* createUserHandler(action) {
  let url = `${process.env.NEXT_PUBLIC_APIURL}/createUser`;

  try {
    const response = yield call(axios.post, url, action.payload, GetHeaders());
    yield put({ type: CONSTANTS.CREATE_USERS_SUCCESS, 
    response: response.data });
  } catch (error) {
    yield put({
      type: CONSTANTS.CREATE_USERS_FAILURE,
      error: error.response.data,
    });
  }
}

export function* getAllRolesHandler() {
  let url = `${process.env.NEXT_PUBLIC_APIURL}/getAllRoles`;

  try {
    const response = yield call(axios.get, url, GetHeaders());
    yield put({ type: CONSTANTS.GET_ALL_ROLES_SUCCESS, 
    response: response.data });
  } catch (error) {
    yield put({
      type: CONSTANTS.GET_ALL_ROLES_FAILURE,
      error: error.response.data,
    });
  }
}

export function* getAllUserHandler() {
  let url = `${process.env.NEXT_PUBLIC_APIURL}/getAllUsers`;

  try {
    const response = yield call(axios.get, url, GetHeaders());
    yield put({ type: CONSTANTS.GET_ALL_USERS_SUCCESS, 
    response: response.data });
  } catch (error) {
    yield put({
      type: CONSTANTS.GET_ALL_USERS_FAILURE,
      error: error.response.data,
    });
  }
}


export function* updateUserHandler(action) {
  let url = `${process.env.NEXT_PUBLIC_APIURL}/updateUser`;

  try {
    const response = yield call(axios.put, url, action.payload, GetHeaders());
    yield put({ type: CONSTANTS.UPDATE_USERS_SUCCESS, 
    response: response.data });
  } catch (error) {
    yield put({
      type: CONSTANTS.UPDATE_USERS_FAILURE,
      error: error.response.data,
    });
  }
}

export default function* UserManagementSaga() {
  yield takeLatest(CONSTANTS.CREATE_USERS, createUserHandler);
  yield takeLatest(CONSTANTS.UPDATE_USERS, updateUserHandler);

  yield takeLatest(CONSTANTS.GET_ALL_ROLES, getAllRolesHandler);
  yield takeLatest(CONSTANTS.GET_ALL_USERS, getAllUserHandler);
}
