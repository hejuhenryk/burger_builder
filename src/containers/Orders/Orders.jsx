import React, { useState, useEffect } from 'react'
import styles from './Orders.module.css'
import axios from '../../axios-orders.js'

import Order from './../../components/Order/Order'
import Loader from '../../components/Loader/Loader';


const Orders = () => {
    const [orders, setOrders] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    let output = null
    useEffect(() => {
        axios.get('orders.json').then( r => {
            const fetchedOrders = []
            for (const key in r.data) {
                fetchedOrders.push({
                    ...r.data[key], 
                    id: key
                })
            }
            setIsLoading(false)
            setOrders(fetchedOrders)
        }).catch( e=> setIsLoading(false) )



    }, [])
        
    if (isLoading) {
        output = <Loader />
    } else if (orders.length) {

        output = <ul>
            {orders.map( order => <Order data={order} key={order.id}/>)}
        </ul>
    }
    return (
        <div className={styles.Orders}>
            {output}
        </div>
    )
}

export default Orders
