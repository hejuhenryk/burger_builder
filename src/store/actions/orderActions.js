import { actionType } from './actionTypes'
import axios from './../../axios-orders'

const purchaseBurgerSuccess = ( id, orderData ) => {
    return {
        type: actionType.PURCHASE_BURGER_SUCCESS,
        payload: {
            orderId: id,
            orderData: orderData
        }
    }
}
const purchaseBurgerFail = error => {
    return {
        type: actionType.PURCHASE_BURGER_SUCCESS,
        payload: error
    }
}
const purchaseBurgerStart = () => {
    return {
        type: actionType.PURCHASE_BURGER_START
    }
}
export const purchaseBurger = orderData => {
    return dispatch => {
        dispatch(purchaseBurgerStart())
        axios.post('/orders.json', orderData)
        .then( r => {
            dispatch( purchaseBurgerSuccess( r.data.name, orderData ))
        })
        .catch( e => {
            dispatch( purchaseBurgerFail(e))
        })
    }
}

export const purchaseInit = () => {
    return {
        type: actionType.PURCHASE_INIT
    }
}

const fetchOrdersStart = () => {
    return {
        type: actionType.FETCH_ORDERS_START
    }
}
const fetchOrdersFail = error => {
    return {
        type: actionType.FETCH_ORDERS_FAIL,
        payload: error
    }
}
const fetchOrdersSuccess = ( orders ) => {
    return {
        type: actionType.FETCH_ORDERS_SUCCESS,
        payload: orders
    }
}
export const fetchOrders = () => {
    return dispatch => {
        dispatch( fetchOrdersStart() )
        axios.get('/orders.json')
            .then( r => {
                const fetchedOrders = []
                for( let key in r.data ){
                    fetchedOrders.push( {
                        ...r.data[key],
                        id: key
                    })
                }
                dispatch( fetchOrdersSuccess(fetchedOrders) )
            })
            .catch( e => dispatch( fetchOrdersFail(e) ))
    }
}
 