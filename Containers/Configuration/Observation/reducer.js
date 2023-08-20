import * as CONSTANTS from "./constant";
export const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    
    // Pulse

    case CONSTANTS.CREATE_PULSE_OBSERVATION_SUCCESS:
      return {
        ...state,
        createPulseObservationSuccess: action.response,
      };

    case CONSTANTS.CREATE_PULSE_OBSERVATION_FAILURE:
      return {
        ...state,
        createPulseObservationFailure: action.error,
      };

      case CONSTANTS.UPDATE_PULSE_OBSERVATION_SUCCESS:
      return {
        ...state,
        updatePulseObservationSuccess: action.response,
      };

    case CONSTANTS.UPDATE_PULSE_OBSERVATION_FAILURE:
      return {
        ...state,
        updatePulseObservationFailure: action.error,
      };

      // Tounge

      case CONSTANTS.CREATE_TOUNGE_OBSERVATION_SUCCESS:
      return {
        ...state,
        createToungeObservationSuccess: action.response,
      };

    case CONSTANTS.CREATE_TOUNGE_OBSERVATION_FAILURE:
      return {
        ...state,
        createToungeObservationFailure: action.error,
      };

      case CONSTANTS.UPDATE_TOUNGE_OBSERVATION_SUCCESS:
      return {
        ...state,
        updateToungeObservationSuccess: action.response,
      };

    case CONSTANTS.UPDATE_TOUNGE_OBSERVATION_FAILURE:
      return {
        ...state,
        updateToungeObservationFailure: action.error,
      };

      // End



    case CONSTANTS.RESET_TO_INITIAL_STATE:
      return {};
    default:
      return state;
  }
};
