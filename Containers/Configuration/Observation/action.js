import * as CONSTANTS from "./constant"
 

export function createPulseObservation(payload){
    return{
    type:CONSTANTS.CREATE_PULSE_OBSERVATION,
    payload,
    }
}

export function updatePulseObservation(payload){
    return{
    type:CONSTANTS.UPDATE_PULSE_OBSERVATION,
    payload,
    }
}

export function createToungeObservation(payload){
    return{
    type:CONSTANTS.CREATE_TOUNGE_OBSERVATION,
    payload,
    }
}

export function updateToungeObservation(payload){
    return{
    type:CONSTANTS.UPDATE_TOUNGE_OBSERVATION,
    payload,
    }
}


export function resetToInitialState(){
    return{
        type:CONSTANTS.RESET_TO_INITIAL_STATE,
    }
}
