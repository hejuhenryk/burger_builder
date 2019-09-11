import React, { useReducer, useState } from 'react'
import { connect } from 'react-redux'
import * as action from '../../store/actions/actionIndex'
import styles from './Authorisation.module.css'
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';

const Authorisation = props => {
    const initialControls = {
        email: {
            elementType: 'input',
            elementConfig: {
                type: 'email',
                placeholder: 'E-mail'
            },
            value: '',
            validation: {
                isRequired: true,
                emailType: true,
                minLength: 7
            },
            isValid: false,
            isTouched: false
        },
        password: {
            elementType: 'input',
            elementConfig: {
                type: 'password',
                placeholder: 'Password'
            },
            value: '',
            validation: {
                isRequired: true,
                minLength: 6
            },
            isValid: false,
            isTouched: false
        }
    }
    const checkValidity = (value, rules) => {
        let isValid = true;
        if (rules.isRequired) {
            isValid = value.trim() !== '' && isValid
        }
        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        }
        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid
        }
        if (rules.emailType) {
            const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            isValid = re.test(value) && isValid
        }
        return isValid
    }
    const reducer = (state, action) => {
        let newState = JSON.parse(JSON.stringify(state))
        newState[action.type].value = action.payload
        if ( newState[action.type].validation) {
            newState[action.type].isTouched = true
            newState[action.type].isValid = checkValidity(newState[action.type].value, newState[action.type].validation )
        }
        return newState    
    }
    const [isSignup, setIsSignUp] = useState(true)
    const [controls, dispatch] = useReducer(reducer, initialControls)
    let formInput = []
    for (const input in controls) {
        formInput.push(
            <Input 
                key={input}
                inputtype={controls[input].elementType} 
                inputconfig={controls[input].elementConfig} 
                name={controls[input]}
                value={controls[input].value}
                change={(event) => inputChangeHandler(event, input)}
                isInvalid={!controls[input].isValid}
                shouldValidate={controls[input].validation}
                isTouched={controls[input].isTouched}
            />
        )
    }
    const inputChangeHandler = ( e, inputType ) => {
        e.preventDefault()
        dispatch({type: inputType , payload: e.target.value})
    }
    const submitHandler = (e) => {
        e.preventDefault()
        const email = controls.email.value
        const password = controls.password.value
        props.onAuthorisation(email, password)
    }
    const swithcAuthModeHandler = () => {
        setIsSignUp(!isSignup)
    }

    return (
        <div className={styles.Authorisation}>
            <div className={styles.Form}>
                <form onSubmit={event => submitHandler(event)}>
                    {formInput}
                    <Button type='Success'>LOGIN</Button>
                </form>
                <Button type='Danger' click={swithcAuthModeHandler}>SIGNINN</Button>
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {

    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuthorisation: (email, password) => dispatch(action.auth(email, password))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Authorisation)
 