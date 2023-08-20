import * as CONSTANTS from "./constant";
export const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CONSTANTS.CREATE_USERS_SUCCESS:
      return {
        ...state,
        createUserSuccess: action.response,
      };

    case CONSTANTS.CREATE_USERS_FAILURE:
      return {
        ...state,
        createUserFailure: action.error,
      };

      case CONSTANTS.UPDATE_USERS_SUCCESS:
      return {
        ...state,
        updateUserSuccess: action.response,
      };

    case CONSTANTS.UPDATE_USERS_FAILURE:
      return {
        ...state,
        updateUserFailure: action.error,
      };

      case CONSTANTS.GET_ALL_ROLES_SUCCESS:
      return {
        ...state,
        getAllRolesSuccess: action.response,
      };

    case CONSTANTS.GET_ALL_ROLES_FAILURE:
      return {
        ...state,
        getAllRolesFailure: action.error,
      };

      case CONSTANTS.GET_ALL_USERS_SUCCESS:
      return {
        ...state,
        getAllUsersSuccess: action.response,
      };

    case CONSTANTS.GET_ALL_USERS_FAILURE:
      return {
        ...state,
        getAllUsersFailure: action.error,
      };


    case CONSTANTS.RESET_TO_INITIAL_STATE:
      return {};
    default:
      return state;
  }
};
