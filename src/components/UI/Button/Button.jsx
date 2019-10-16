import React from 'react'
import styles from './Button.module.css';


const Button = (props) => {
    // const btnID = 'btn' + Math.random()
    return (
        <button 
            // id={btnID} 
            disabled={props.disabled}
            className={[styles.Button, styles[props.type]].join(' ')}
            onClick={props.click}>
            {props.children}
        </button>
    )
}

export default Button
