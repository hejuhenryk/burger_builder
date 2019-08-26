import React,{ useState, useReducer } from 'react'
import { withRouter } from 'react-router-dom'
import Button from '../../components/UI/Button/Button';
import styles from './ContactData.modue.css'
import axios from '../../axios-orders'
import Loader from '../../components/Loader/Loader';
import Input from '../../components/UI/Input/Input';


const ContactData = props => {
    const initialForm = {
        firsname: {
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
                    {value: 'fastes', displayValue: 'Fastest'},
                    {value: 'cheapest', displayValue: 'Cheapest'}
                ]
            },
            value: 'fastes'
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
        return isValid
    }
    const [isLoading, setIsLoading] = useState(false)
    const [isFormValid, setIsFormValid] = useState(false)
    const [contacData, dispatch] = useReducer((state, action) => {
        //JSON.parse(JSON.stringify(o)) // good enough for this model
        let newState = JSON.parse(JSON.stringify(state))
        newState[action.type].value = action.payload
        if(newState[action.type].validation) {
            newState[action.type].isTouched = true
            newState[action.type].isValid = checkValidity(newState[action.type].value, newState[action.type].validation )
        }

        return newState    
    }, initialForm)
    



    const submitHandler = event => {
        event.preventDefault()
        setIsLoading(true)
        let customerData = {}
        for (const key in contacData) {
            customerData[key] = contacData[key].value
        }
        const order = {
            ingredients: props.ingredients, 
            price: props.totalPrice, 
            customer: customerData
        }
        axios.post('/orders.json', order)
            .then( r => {
                setIsLoading(false)
            })
            .then( r => {
                props.history.push('/')
            })
            .catch( e => {
                setIsLoading(false)
            })
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
                isInvalid={!contacData[input].isVAlid}
                shouldValidate={contacData[input].validation}
                isTouched={contacData[input].isTouched}
            />
        )
    }
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
    console.log(isFormValid)
    return (
        <div className={styles.ContactData}>
            {isLoading ? <Loader /> : inhold}
        </div>
    )
}

export default withRouter(ContactData)
