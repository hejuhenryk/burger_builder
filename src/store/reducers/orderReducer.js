import { actionType } from './../actions/actionTypes'
// import axios from '../../axios-orders'


const initialState = {
    orders: [], 
    isLoading: false,
    isPurchased: false
}

const reducer = ( state = initialState, action) => {
    switch ( action.type ) {
        case actionType.PURCHASE_INIT:
            return {
                ...state, 
                isPurchased: false,
            }
        case actionType.PURCHASE_BURGER_START:
            return {
                ...state, 
                isLoading: true
            }
        case actionType.PURCHASE_BURGER_SUCCESS:
            const newOrder = {
                ...action.payload.orderData,
                id: action.payload.orderId
            }
            return {
                ...state, 
                isLoading: false,
                orders: state.orders.concat(newOrder),
                isPurchased: true
            }
        case actionType.PURCHASE_BURGER_FAIL:
            return {
                ...state,
                isLoading: false,
                isPurchased: false
            }
        case actionType.FETCH_ORDERS_START:
            return {
                ...state,
                isLoading: true
            }
        case actionType.FETCH_ORDERS_SUCCESS:
            console.log('payload:', action.payload)
            return {
                ...state,
                orders: [...action.payload],
                isLoading: false
            }
        case actionType.FETCH_ORDERS_FAIL:
            return {
                ...state,
                isLoading: false
            }
        default:
            return state;
    }
}

export default reducer