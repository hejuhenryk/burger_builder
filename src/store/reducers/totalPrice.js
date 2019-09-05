import { actionType } from './../actionTypes'

const ingredientsPrice = {
    salad: 0.4,
    bacon: 0.7,
    cheese: 0.6,
    meat: 1.2,
    tomatoe: 0.5
}

export const totalPrice = (state = 4, action) => {
    if ( action.type = actionType.ADD_INGREDIENT ) {
        return state + ingredientsPrice[action.newIngredientName]
    } 
    if ( action.type = actionType.REMOVE_INGREDIENT ) {
        return state - ingredientsPrice[action.newIngredientName]
    } 
}
