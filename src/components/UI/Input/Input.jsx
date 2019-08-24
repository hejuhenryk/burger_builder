import React from 'react'
import styles from './Input.module.css'

const Input = props => {
    let inputElement = null
    switch ( props.inputtype ) {
        case ( 'input' ):
            inputElement = <input 
                className={styles.InputElement} 
                value={props.value}
                onChange={props.change}
                {...props.inputConfig}/>
            break;
        case ( 'textarea' ):
            inputElement = <textarea 
                className={styles.InputElement} 
                value={props.value}
                onChange={props.change}
                {...props.inputConfig}/>
            break;
        case ( 'select' ): 
            inputElement = <select                
                    className={styles.InputElement} 
                    value={props.value}
                    onChange={props.change}>
                {props.inputConfig.options.map( option => <option key={option.value} value={option.value}>{option.displayValue}</option>)}
                </select>
            break;
        default:
            inputElement = <input 
                className={styles.InputElement} 
                value={props.value}
                {...props}/>
    }

    return (
        <div className={styles.Input}>
            <label className={styles.Label}>{props.label}</label>
            {inputElement}
        </div>
    )
}

export default Input
