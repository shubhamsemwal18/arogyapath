import * as CONSTANTS from "./constant"
 
export function createUsers(payload){
    return{
    type:CONSTANTS.CREATE_USERS,
    payload,
    }
}

export function updateUsers(payload){
    return{
    type:CONSTANTS.UPDATE_USERS,
    payload,
    }
}

export function getAllUsers(){
    return{
        type:CONSTANTS.GET_ALL_USERS,
    }
}

export function getAllRoles(){
    return{
        type:CONSTANTS.GET_ALL_ROLES,
    }
}

export function resetToInitialState(){
    return{
        type:CONSTANTS.RESET_TO_INITIAL_STATE,
    }
}
