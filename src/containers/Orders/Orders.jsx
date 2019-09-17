import React, { useEffect } from 'react'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import * as actions from '../../store/actions/actionIndex'
import { connect } from 'react-redux'

import styles from './Orders.module.css'
import axios from '../../axios-orders.js'

import Order from './../../components/Order/Order'
import Loader from '../../components/Loader/Loader';


const Orders = props => {
    let output = null
    useEffect(() => {
        props.onOrderFetch(props.token, props.userId)
    }, [])
        
    if (props.isLoading) {
        output = <Loader />
    } else if ( props.orders.length) {
        output = <ul>
            {props.orders.map( order => <Order data={order} key={order.id}/>)}
        </ul>
    }
    return (
        <div className={styles.Orders}>
            {output}
        </div>
    )
}
const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        isLoading: state.order.isLoading,
        token: state.authorisation.token,
        userId: state.authorisation.userId
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onOrderFetch: (token, userId) => dispatch(actions.fetchOrders(token, userId))
    }
}

export default connect( mapStateToProps, mapDispatchToProps )(withErrorHandler( Orders, axios ))