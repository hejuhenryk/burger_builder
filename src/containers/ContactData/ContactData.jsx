import React,{ useState, useReducer, useEffect } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import Button from '../../components/UI/Button/Button';
import styles from './ContactData.modue.css'
import axios from '../../axios-orders'
import Loader from '../../components/Loader/Loader';
import Input from '../../components/UI/Input/Input';
import withErrorHandler, {} from '../../hoc/withErrorHandler/withErrorHandler'
import { purchaseBurger } from '../../store/actions/actionIndex'
import { checkValidity } from '../../shared/checkValidity'


const ContactData = props => {
    const initialForm = {
        firstname: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Your Firstname'
            },
            value: '',
            validation: {
                isRequired: true
            },
            isValid: false,
            isTouched: false
        },
        lastname: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Your Lastname'
            },
            value: '',
            validation: {
                isRequired: true
            },
            isValid: false,
            isTouched: false
        },
        street: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Street Name'
            },
            value: '',
            validation: {
                isRequired: true
            },
            isValid: false,
            isTouched: false
        },
        zipCode: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'ZIP code'
            },
            value: '',
            validation: {
                isRequired: true,
                minLength: 4,
                maxLength: 5
            },
            isValid: false,
            isTouched: false
        },
        phone: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Phone number'
            },
            value: '',
            validation: {
                isRequired: true
            },
            isValid: false,
            isTouched: false
        },
        country: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Country'
            },
            value: '',
            validation: {
                isRequired: true
            },
            isValid: false,
            isTouched: false
        },
        email: {
            elementType: 'input',
            elementConfig: {
                type: 'email',
                placeholder: 'Your E-Mail'
            },
            value: '',
            validation: {
                isRequired: true
            },
            isValid: false,
            isTouched: false
        },
        deliveryMethod: {
            elementType: 'select',
            elementConfig: {
                options: [
                    {value: '', displayValue: '----'},
                    {value: 'fastes', displayValue: 'Fastest'},
                    {value: 'cheapest', displayValue: 'Cheapest'}
                ]
            },
            value: '',
            validation: {
                isRequired: true
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

    const [isFormValid, setIsFormValid] = useState(false)
    const [contacData, dispatch] = useReducer((state, action) => {
        //JSON.parse(JSON.stringify(o)) // good enough for this model
        let newState = JSON.parse(JSON.stringify(state))
        newState[action.type].value = action.payload
        if ( newState[action.type].validation) {
            newState[action.type].isTouched = true
            newState[action.type].isValid = checkValidity(newState[action.type].value, newState[action.type].validation )
        }
        return newState    
    }, initialForm)
    

    useEffect(() => {
        setIsFormValid(checkIfFormIsValid(contacData))
    }, [contacData])

    const submitHandler = event => {
        event.preventDefault()
        if(!isFormValid) return ;
        // setIsLoading(true)
        let customerData = {}
        for (const key in contacData) {
            customerData[key] = contacData[key].value
        }
        const orderData = {
            ingredients: props.ingredients, 
            price: props.totalPrice, 
            customer: customerData,
            userID: props.userId
        }
        props.onOrderBurger(orderData, props.token)
    }
    const inputChangeHandler = ( e, inputType ) => {
        e.preventDefault()
        dispatch({type: inputType , payload: e.target.value})
    }
    let formInputs = []
    for (const input in contacData) {
        formInputs.push(
            <Input 
                key={input}
                inputtype={contacData[input].elementType} 
                inputconfig={contacData[input].elementConfig} 
                name={contacData[input]}
                value={contacData[input].value}
                change={(event) => inputChangeHandler(event, input)}
                isInvalid={!contacData[input].isValid}
                shouldValidate={contacData[input].validation}
                isTouched={contacData[input].isTouched}
            />
        )
    }
    //setIsFormValid( checkIfFormIsValid(contacData))
    let inhold = <>
        <h4>Enter your contact details</h4>
        <form onSubmit={(event) => {
            if (isFormValid)
            submitHandler(event)
        }}> 
            {formInputs}
            <Button type='Success' disabled={!isFormValid}>Confirm</Button>
            
        </form>
        <button onClick={()=>setIsFormValid(true)}>valid</button>
    </>
    return (
        <div className={styles.ContactData}>
            {props.isLoading ? <Loader /> : inhold}
        </div>
    )
}
const mapStateToProps = state => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        totalPrice: state.burgerBuilder.totalPrice, 
        isLoading: state.order.isLoading, 
        token: state.authorisation.token,
        userId: state.authorisation.userId
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onOrderBurger: (orderData, token) => dispatch(purchaseBurger(orderData, token))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(withRouter(ContactData), axios))
