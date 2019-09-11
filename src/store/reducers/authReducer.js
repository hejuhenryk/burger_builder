import { actionType, actionPayload } from '../actions/actionTypes'
import { updateObject } from '../utilities'
 
const initialState = {
    token: null,
    userId: null,
    error: null,
    isLoading: false
}
const authorisationSuccess = (state, authData) => {
    return {
        ...state, 
        token: authData.token,
        userId: authData.id,
        error: null, 
        isLoading: false
    }
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.AUTHORISATION_START: return updateObject(state, {isLoading: true, error: null})
        case actionType.AUTHORISATION_FAIL: return updateObject(state, {error: action.payload, isLoading: false})
        case actionType.AUTHORISATION_SUCCESS: return authorisationSuccess(state, action.payload)
        default: return state 
    }
}

export default reducer;