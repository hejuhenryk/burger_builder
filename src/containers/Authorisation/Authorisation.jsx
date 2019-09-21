import React, { useReducer, useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import * as action from '../../store/actions/actionIndex'
import styles from './Authorisation.module.css'
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Loader from '../../components/Loader/Loader';
import { checkValidity } from '../../shared/checkValidity'

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

    const checkIfFormIsValid = (form) => {
        let isValid = true
        for(let input in form) {
            if (form[input].validation) {
                isValid = (form[input].isValid && isValid);
            } 
        }
        return isValid
    }

    useEffect(() => {
        if(!props.isBulding && props.rediractPath !== '/') {
            props.onSetAuthRedirectionPath('/')
        }
    }, [props])    


    const reducer = (state, action) => {
        let newState = JSON.parse(JSON.stringify(state))
        newState[action.type].value = action.payload
        if ( newState[action.type].validation) {
            newState[action.type].isTouched = true
            newState[action.type].isValid = checkValidity(newState[action.type].value, newState[action.type].validation )
        }
        return newState    
    }
    const [isSignup, setIsSignUp] = useState(false)
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

    const submitHandler = (e) => {
        e.preventDefault()
        const email = controls.email.value
        const password = controls.password.value
        props.onAuthorisation(email, password, isSignup)
     }

    const swithcAuthModeHandler = () => {
        setIsSignUp(!isSignup)
    }

    let errorMessage = null
    
    if (props.error){
        console.log(props.error.message)
        switch (props.error.message) {
            case 'INVALID_EMAIL':
                errorMessage = 'Your email is not valid, login with valid email or SIGNIN'
                break;
            case 'EMAIL_EXISTS':
                errorMessage = 'Your email is registered, please SIGNIN'
                break;
            case 'EMAIL_NOT_FOUND':
                errorMessage = 'Email or password is not registered, please use correct one or SIGNUP'
                break;
            case 'INVALID_PASSWORD':
                    errorMessage = 'Email or password is not registered, please use correct one or SIGNUP'
                    break;
            default:
                errorMessage = props.error.message
                break;
        }
    }
    if (props.isLoading){
        formInput = <Loader />
    }
    
    const inputChangeHandler = ( e, inputType ) => {
        e.preventDefault()
        dispatch({type: inputType , payload: e.target.value})
    }

    let redirect = null
    
    if(props.isAuth) {
        redirect = <Redirect to={props.rediractPath}/>
    }

    return (
        <div className={styles.Authorisation}>
            {redirect}
            <div className={styles.Form}>
            <form onSubmit={event => submitHandler(event)}>
                <p>{errorMessage}</p>
                {formInput}
                <Button type='Success' disabled={!checkIfFormIsValid(controls)}>{!isSignup ? 'LOGIN' : 'CREATE ACCOUNT'}</Button>
            </form>
            <h3>{!isSignup ? 'Do You need an account?' : 'Do You have an account?'}</h3>
            <Button type='Danger' click={swithcAuthModeHandler}>SWITCH TO {!isSignup ? 'SIGNUP' : 'SIGNIN'}</Button>
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        isLoading: state.authorisation.isLoading,
        error: state.authorisation.error,
        isAuth: state.authorisation.token !== null,
        rediractPath: state.authorisation.authRedirectingPath,
        isBulding: state.burgerBuilder.isBulding
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuthorisation: (email, password, isSignup) => dispatch(action.auth(email, password, isSignup)),
        onSetAuthRedirectionPath: path => dispatch(action.setAuhtRedirectionPath(path))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Authorisation)
 