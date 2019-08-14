import React from 'react'
import classes from './Button.css';


const Button = (props) => {
    const btnID = 'btn' + Math.random()
    if ( props.isDisable ) {
        document.getElementById(btnID).disabled = true
    }
    return (
        <button id={btnID} className={[classes.Button, classes[props.type]].join(' ')} onClick={props.click}>
            {props.children}
        </button>
    )
}

export default Button
