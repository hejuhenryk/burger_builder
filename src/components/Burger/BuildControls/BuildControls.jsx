
import React from 'react'
import BuildControl from '../BuildControl/BuildControl'

import styles from './BuildControls.module.css'


const buildControls = (props) => {
    return (
        <div className={styles.BuildControls}>
            <p>Burger price: <strong>${props.price.toFixed(2)}</strong></p>
            {props.labels.map( (type, index) => <BuildControl 
                disabled={props.disables[index] === 0 ? true : false}
                key={type} 
                label={type} 
                add={ () => { props.add(type)} }
                remove={ () => { props.remove(type)} }/>
            )}
        <button 
            className={styles.OrderButton} 
            disabled={!props.purchasable}
            onClick={props.handleClick}>
        { props.isAuth ? 'Order' : 'Login' }
        </button>
        </div>

    )
}

export default buildControls
