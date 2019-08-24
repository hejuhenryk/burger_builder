import React from 'react'
import styles from './Order.module.css'

const Order = props => {
    const ord = props.data
    let ingredients = ''
    for (const ingredient in ord.ingredients) {
        const count = ord.ingredients[ingredient]
        if (count){
            ingredients += `${count} ${ingredient}${count>1?'s':''}, `
        }
    }
    return (
        <div className={styles.Order}>
            <p style={{fontSize: '0.6rem'}}>Order ID: {ord.id}</p>
            <p>Ordered by: {ord.customer.name}</p>
            <p>Burger is made av: {ingredients}</p>
            <p>Price: {ord.price}</p>
        </div>
    )
}

export default Order
