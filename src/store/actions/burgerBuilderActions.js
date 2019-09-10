import { actionType } from './actionTypes'
import axios from './../../axios-orders'

export const addIngredient = ingredientName => {
    return {
        type: actionType.ADD_INGREDIENT,
        payload: ingredientName
    }
}
export const removeIngredient = ingredientName => {
    return {
        type: actionType.REMOVE_INGREDIENT,
        payload: ingredientName
    }
}

const setIngredients = (ingredients) => {
    return {
        type: actionType.SET_INGREDIENTS,
        payload: ingredients
    }
}

const setError = ( isError ) => {
    return {
        type: actionType.SET_ERROR,
        payload: isError
    }
}

export const initIngredients = () => {
    return dispatch => {
        axios.get('/ingredients.json')  
            .then( r => dispatch( setIngredients(r.data) ))
            .catch( e => dispatch( setError(true) ))
    }
}