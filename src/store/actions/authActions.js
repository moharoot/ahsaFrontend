export const USER_LOADING = "USER_LOADING"
export const USER_LOADED = "USER_LOADED"
export const AUTH_ERROR = "AUTH_ERROR"
export const LOGIN_FAIL = "LOGIN_FAIL"  
export const LOG_IN = "LOG_IN"  
export const LOGOUT = "LOGOUT"

export function login(user) {
    return{
        type: LOG_IN,
        user
    }
}

export function userLoading() {
    return{
        type: USER_LOADING
    }
}

export function userLoaded() {
    return{
        type: USER_LOADED
    }
}

export function authError() {
    return{
        type: AUTH_ERROR
    }
}

export function logout() {
    return{
        type: LOGOUT
    }
}