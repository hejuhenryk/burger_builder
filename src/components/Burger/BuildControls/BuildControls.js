
import React from 'react'
import BuildControl from '../BuildControl/BuildControl'

import classes from './BuildControls.css'


const buildControls = (props) => {
    return (
        <div className={classes.BuildControls}>
            <p>Burger price: <strong>${props.price.toFixed(2)}</strong></p>
            {props.labels.map( (type, index) => <BuildControl 
                disabled={props.disables[index] === 0 ? true : false}
                key={type} 
                label={type} 
                add={ () => { props.add(type)} }
                remove={ () => { props.remove(type)} }/>
            )}
        <button 
            className={classes.OrderButton} 
            disabled={!props.purchasable}
            onClick={props.order}
        >Order</button>
        </div>

    )
}

export default buildControls
