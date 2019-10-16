import { actionType } from './actionTypes'
import axios from 'axios';
import {my_auth_key} from '../../my_auth_key'

const authStart = () => {
    return {
        type: actionType.AUTHORISATION_START
    }
}

export const authSuccess = authData => {
    return {
        type: actionType.AUTHORISATION_SUCCESS,
        payload: authData
    }
}

export const authFailed = error => {
    return {
        type: actionType.AUTHORISATION_FAIL,
        payload: error
    }
}
export const logout = () => {
    localStorage.removeItem('resData')
    localStorage.removeItem('expirationDate')
    return {
        type: actionType.AUTHORISATION_LOGOUT
    }
}

export const checkAuthorisationTime = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout())
        },expirationTime * 1000)
    }
}

export const setAuhtRedirectionPath = path => {
    return {
        type: actionType.SET_AUTH_REDIRECT_PATH,
        payload: path
    }
}

export const auth = ( email, password, isSignup ) => {
    return dispatch => {
        dispatch(authStart())
        let url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${my_auth_key}`
        if (!isSignup) {
            url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${my_auth_key}`
        }
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        }
        axios.post(url, authData)
            .then(  res => {
                const resData = {
                    token: res.data.idToken,
                    id: res.data.localId
                }
                const expirationDate = new Date( new Date().getTime() + res.data.expiresIn * 1000 )
                localStorage.setItem('resData', JSON.stringify(resData))
                localStorage.setItem('expirationDate', expirationDate)
                dispatch(authSuccess(resData))
                dispatch(checkAuthorisationTime(res.data.expiresIn))
            })
            .catch( error => {
                dispatch( authFailed(error.response.data.error) )
            })
    }
}

export const checkIfAuth = () => {
    return dispatch => {
        const resData = JSON.parse(localStorage.getItem('resData'))
        if (!resData) {
            return //or dispatch(logout())
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'))
            if (expirationDate > new Date()) {
                const timeLeft = (expirationDate.getTime() - new Date().getTime())/1000 // to get it in seconds
                dispatch(authSuccess(resData))
                dispatch(checkAuthorisationTime(timeLeft))
            } else {
                dispatch(logout())
            }
        }
    }
}
