import { actionType } from './actionTypes'
import axios from 'axios';

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

export const auth = ( email, password ) => {
    return dispatch => {
        dispatch(authStart)
        const url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAXwIXVWrpdv43z4tsnar-aFuvtffAB1wo'
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        }
        axios.post(url, authData)
            .then(  res => {
                console.log(res)
                dispatch(authSuccess(res))
            })
            .catch( error => {
                console.log(error)
                dispatch( authFailed(error) )
            })
    }
}
