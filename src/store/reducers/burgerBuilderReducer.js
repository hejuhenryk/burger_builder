import { actionType } from '../actions/actionTypes'

const ingredientsPrice = {
    salad: 0.4,
    bacon: 0.7,
    cheese: 0.6,
    meat: 1.2,
    tomatoe: 0.5
}

const initialState = {
    ingredients: null,
    totalPrice: 4,
    isError: false
}

const reducer = (state = initialState, action) => {
    if ( action.type === actionType.ADD_INGREDIENT ) {
        return { 
            ...state, 
            ingredients: { ...state.ingredients, [action.payload]: state.ingredients[action.payload] + 1},
            totalPrice: state.totalPrice + ingredientsPrice[action.payload]
        }
    } else if ( action.type === actionType.REMOVE_INGREDIENT ) {
        return {
            ...state, 
            ingredients: { ...state.ingredients, [action.payload]: state.ingredients[action.payload] - 1},
            totalPrice: state.totalPrice - ingredientsPrice[action.payload]
        }
    } else if (action.type === actionType.SET_INGREDIENTS) {
        return {
            ...state, 
            ingredients: { ...action.payload},
            totalPrice: initialState.totalPrice,
            isError: false // in case there was an Error before  
        }     
    } else if (action.type === actionType.SET_ERROR) {
        return {
            ...state, 
            // ingredients: { ...state.ingredients},
            isError: action.payload
        }          
    } else {
        return state
    }
}

export default reducer