import { actionType } from '../actions/actionTypes'
import { updateObject } from '../../shared/utilities'

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
    isError: false,
    isBulding: false
}

const addIngredient = ( state, ingredient ) => {
    const updatedIngredients = updateObject( state.ingredients, {[ingredient]: state.ingredients[ingredient] + 1})
    return updateObject( state, {isBulding: true,  ingredients: updatedIngredients, totalPrice: state.totalPrice + ingredientsPrice[ingredient]})
}
const removeIngredient = ( state, ingredient ) => {
    const updatedIngredients = updateObject( state.ingredients, {[ingredient]: state.ingredients[ingredient] - 1})
    return updateObject( state, {isBulding: true, ingredients: updatedIngredients, totalPrice: state.totalPrice - ingredientsPrice[ingredient]})
}
const setIngredients = ( state, ingredients ) => {
    const updatedProperties = {
        ingredients: { ...ingredients},
        totalPrice: initialState.totalPrice,
        isError: false,
        isBulding: false
    }
    return updateObject( state, updatedProperties )
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.REMOVE_INGREDIENT: return removeIngredient(state, action.payload)
        case actionType.ADD_INGREDIENT: return addIngredient(state, action.payload)
        case actionType.SET_INGREDIENTS: return setIngredients(state, action.payload)
        case actionType.SET_ERROR: return updateObject( state, {isError:true} )
        default: return state
    }
}
export default reducer