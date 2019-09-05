import { actionType } from './../actionTypes'

const ingredientsPrice = {
    salad: 0.4,
    bacon: 0.7,
    cheese: 0.6,
    meat: 1.2,
    tomatoe: 0.5
}

const initialState = {
    ingredients: {
        salad: 0,
        bacon: 0,
        cheese: 0,
        meat: 0,
        tomatoe: 0
    },
    totalPrice: 4
}

export const reducer = (state = initialState, action) => {
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
    } else {
        return state
    }
}