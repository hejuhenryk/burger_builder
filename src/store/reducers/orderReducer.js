import { actionType } from './../actions/actionTypes'
import { updateObject } from '../utilities'


const initialState = {
    orders: [], 
    isLoading: false,
    isPurchased: false
}

const purchaseBurgerSuccess = ( state, payload ) => {
    const newOrder = {
        ...payload.orderData,
        id: payload.orderId
    }
    return updateObject( state, { isLoading: false, orders: state.orders.concat(newOrder), isPurchased: true} )
}
const fetchOrdesSuccess = ( state, payload ) => {
    return updateObject( state, {orders: [...payload], isLoading: false})
}

const reducer = ( state = initialState, action) => {
    switch ( action.type ) {
        case actionType.PURCHASE_INIT: return updateObject ( state, {isPurchased: false})
        case actionType.PURCHASE_BURGER_START: return updateObject ( state, {isLoading: true})
        case actionType.PURCHASE_BURGER_SUCCESS: return purchaseBurgerSuccess( state, action.payload )
        case actionType.PURCHASE_BURGER_FAIL: return updateObject( state, {isLoading: false, isPurchased: false} )
        case actionType.FETCH_ORDERS_START: return updateObject( state, {isLoading: true} )
        case actionType.FETCH_ORDERS_SUCCESS: return fetchOrdesSuccess( state, action.payload )
        case actionType.FETCH_ORDERS_FAIL: return updateObject( state, { isLoading: false } )
        default: return state;
    }
}

export default reducer