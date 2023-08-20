import * as CONSTANTS from "./constant";
export const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CONSTANTS.ADD_INVENTORY_SUCCESS:
      return {
        ...state,
        addInventorySuccess: action.response,
      };

    case CONSTANTS.ADD_INVENTORY_FAILURE:
      return {
        ...state,
        addInventoryFailure: action.error,
      };
      
    case CONSTANTS.RESET_TO_INITIAL_STATE:
      return {};
    default:
      return state;
  }
};
