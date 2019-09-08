import React, { useState, useEffect } from 'react'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import * as actions from '../../store/actions/indexActions'
import { connect } from 'react-redux'

import styles from './Orders.module.css'
import axios from '../../axios-orders.js'

import Order from './../../components/Order/Order'
import Loader from '../../components/Loader/Loader';


const Orders = props => {
    // const [orders, setOrders] = useState([])
    // const [isLoading, setIsLoading] = useState(true)
    let output = null
    useEffect(() => {
        props.onOrderFetch()
    }, [])
        
    if (props.isLoading) {
        output = <Loader />
    } else if ( props.orders.length) {
        console.log(props.orders)
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
        isLoading: state.order.isLoading
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onOrderFetch: () => dispatch(actions.fetchOrders())
    }
}

export default connect( mapStateToProps, mapDispatchToProps )(withErrorHandler( Orders, axios ))