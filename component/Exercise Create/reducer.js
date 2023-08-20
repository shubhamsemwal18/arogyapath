import * as CONSTANTS from "./constant";
export const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CONSTANTS.CREATE_EXERCISES_SUCCESS:
      return {
        ...state,
        createExerciseSuccess: action.response,
      };

    case CONSTANTS.CREATE_EXERCISES_FAILURE:
      return {
        ...state,
        createExerciseFailure: action.error,
      };
      case CONSTANTS.GET_ALL_EXERCISES_SUCCESS:
        return{
          ...state,
          getAllExercisesSuccess:action.response
        };
      
      case CONSTANTS.GET_ALL_EXERCISES_FAILURE:
        return{
          ...state,
          getAllExercisesFailure:action.error

        }

    case CONSTANTS.RESET_TO_INITIAL_STATE:
      return {};
    default:
      return state;
  }
};
