import React from 'react'
import styles from './Order.module.css'

const Order = props => {
    const ord = props.data
    let ingredients = ''
    for (let ingredient in ord.ingredients) {
        const count = ord.ingredients[ingredient]
        if (count){
            ingredients += `${count} ${ingredient}${count>1?'s':''}, `
        }
    }
    return (
        <div className={styles.Order}>
            <p style={{fontSize: '0.6rem'}}>Order ID: {ord.id}</p>
            <p>Ordered by: {ord.customer.firstname} {ord.customer.lastname}</p>
            <p>Burger is made av: {ingredients}</p>
            <p>Price: {ord.price.toFixed(2)}</p>
        </div>
    )
}

export default Order
