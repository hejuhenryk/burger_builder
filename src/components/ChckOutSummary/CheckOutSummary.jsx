import React from 'react'
import Burger from '../Burger/Burger';
import Button from './../UI/Button/Button'
import styles from './CheckOutSummary.module.css'

const CheckOutSummary = props => {

    return (
        <div className={styles.CheckOutSummary}>
            <h1>We hope you will enjoy your burger</h1>
            <Burger ingredients={props.ingredients}/>
            <div className={styles.Buttons}>
                <Button type='Danger' click={props.cancelCheckoutHandler}>Cancel</Button>
                <Button type='Success' click={props.continueCheckuotHandler}>Continue</Button>
            </div>
        </div>
    )
}

export default CheckOutSummary
