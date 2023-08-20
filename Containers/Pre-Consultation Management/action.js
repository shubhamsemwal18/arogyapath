import * as CONSTANTS from "./constant";

export function registerPreConsultaion(payload) {
  return {
    type: CONSTANTS.REGISTER_PRE_CONSULTAION,
    payload,
  };
}

export function resetToInitialState() {
  return {
    type: CONSTANTS.RESET_TO_INITIAL_STATE,
  };
}
