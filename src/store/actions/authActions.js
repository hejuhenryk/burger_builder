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
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAXwIXVWrpdv43z4tsnar-aFuvtffAB1wo'
        if (!isSignup) {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAXwIXVWrpdv43z4tsnar-aFuvtffAB1wo'
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
/*

expiresIn: "3600"  
idToken: "eyJhbGciOiJSUzI1NiIsImtpZCI6IjU0ODZkYTNlMWJmMjA5YzZmNzU2MjlkMWQ4MzRmNzEwY2EzMDlkNTAiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vaGVqdXNidXJnZXJzIiwiYXVkIjoiaGVqdXNidXJnZXJzIiwiYXV0aF90aW1lIjoxNTY4MjE2MTI0LCJ1c2VyX2lkIjoieUtmNTk2RDQ5dlNrMVhPS0pLQWpJelBmazZZMiIsInN1YiI6InlLZjU5NkQ0OXZTazFYT0tKS0FqSXpQZms2WTIiLCJpYXQiOjE1NjgyMTYxMjQsImV4cCI6MTU2ODIxOTcyNCwiZW1haWwiOiJqakBqb2hhbnNlbi5jb20iLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZW1haWwiOlsiampAam9oYW5zZW4uY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoicGFzc3dvcmQifX0.R90yhFtIhLAJWhNDv9mzxxcjQaf92J0Bi_Ek9JIlr74MxRRM6ODKCaPaqJ0bC4v6h8NrOktkSJDScaVMrmgNqgTMrozxOKrr9Mw2OYzLER6agxnwWQgFMiaQVihZet7xr9uEmHdthoMeG7_FId219yTrxdbytHYOjMldlhKAW88LHXxaN6bP8FET3JJF9yQvPp97OkdwbcK_DkHCin_PZdNM0pmiKtbcn45EaY2Y2vI4lkJlb8mmF1JwXgGW_HBKKBrf_vEPJvkIOBNsjEkpTaGeIvzZYOhf6Oda7NjdxhSYUckEmkkGqB9zNDgwG-Et-v-k5VhUphti5PV-6wZBBQ"
refreshToken: "AEu4IL1Gu9D-GxAjGZZSnk8zAI8h1yTVHZw8XahASeiqjaMijN_ZWv5zT8vrEVtED8yS3V1TUx7G-QtSnn3eN68EbnnArprJFMbKl5S-C3j4tz0BBN4wCx3lAEVxwsQmF_bXvW0Jj3H-h21UyqzmAu7mS7S1WXMZqlxF5HtfEL8EZMeV3iZyjl2t9lmGA5t8W3-nUS7VVRUj"

*/