import * as CONSTANTS from "./constant";
export const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CONSTANTS.CREATE_QUESTION_SUCCESS:
      return {
        ...state,
        createQuestionsSuccess: action.response,
      };

    case CONSTANTS.CREATE_QUESTION_FAILURE:
      return {
        ...state,
        createQuestionsFailure: action.error,
      };

      case CONSTANTS.UPDATE_QUESTION_SUCCESS:
      return {
        ...state,
        updateQuestionsSuccess: action.response,
      };

    case CONSTANTS.UPDATE_QUESTION_FAILURE:
      return {
        ...state,
        updateQuestionFailure: action.error,
      };
      

    case CONSTANTS.RESET_TO_INITIAL_STATE:
      return {};
    default:
      return state;
  }
};
