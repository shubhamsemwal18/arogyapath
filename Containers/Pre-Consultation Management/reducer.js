import * as CONSTANTS from "./constant";
export const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {

      case CONSTANTS.REGISTER_PRE_CONSULTAION_SUCCESS:
      return {
        ...state,
        RegisterPreConsultaionSuccess: action.response,
      };

    case CONSTANTS.REGISTER_PRE_CONSULTAION_FAILURE:
      return {
        ...state,
        RegisterPreConsultaionFailure: action.error,
      };

    case CONSTANTS.RESET_TO_INITIAL_STATE:
      return {};
    default:
      return state;
  }
};
