import * as CONSTANTS from "./constant";

export function appLogin(payload) {
  return {
    type: CONSTANTS.APP_LOGIN,
    payload,
  };
}

export function resetToInitialState() {
  return {
    type: CONSTANTS.RESET_TO_INITIAL_STATE,
  };
}
