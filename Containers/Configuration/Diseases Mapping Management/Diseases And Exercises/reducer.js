import * as CONSTANTS from "./constant";
export const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CONSTANTS.CREATE_DISEASES_AND_EXERCISES_MAPING_SUCCESS:
      return {
        ...state,
        diseasesExercisesMapSuccess: action.response,
      };

    case CONSTANTS.CREATE_DISEASES_AND_EXERCISES_MAPING_FAILURE:
      return {
        ...state,
        diseasesExercisesMapFailure: action.error,
      };

      case CONSTANTS.UPDATE_DISEASES_AND_EXERCISES_MAPING_SUCCESS:
      return {
        ...state,
        updateDiseasesExercisesMapSuccess: action.response,
      };

    case CONSTANTS.UPDATE_DISEASES_AND_EXERCISES_MAPING_FAILURE:
      return {
        ...state,
        updateDiseasesExercisesMapFailure: action.error,
      };

    case CONSTANTS.RESET_TO_INITIAL_STATE:
      return {};
    default:
      return state;
  }
};
