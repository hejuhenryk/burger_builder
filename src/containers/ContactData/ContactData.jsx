import React,{ useState, useReducer } from 'react'
import Button from '../../components/UI/Button/Button';
import styles from './ContactData.modue.css'
import axios from '../../axios-orders'
import Loader from '../../components/Loader/Loader';
import Input from '../../components/UI/Input/Input';

const ContactData = props => {
    const initialData = {
        name: '',
        email: '',
        street: '',
        zipCode: ''
    }
    const initialForm = {
        firsname: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Your Firstname'
            },
            value: ''
        },
        lastname: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Your Lastname'
            },
            value: ''
        },
        street: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Street Name'
            },
            value: ''
        },
        zipCode: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'ZIP code'
            },
            value: ''
        },
        phone: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Phone number'
            },
            value: ''
        },
        country: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Country'
            },
            value: ''
        },
        email: {
            elementType: 'input',
            elementConfig: {
                type: 'email',
                placeholder: 'Your E-Mail'
            },
            value: ''
        },
        deliveryMethod: {
            elementType: 'select',
            elementConfig: {
                options: [
                    {value: 'fastes', displayValue: 'Fastest'},
                    {value: 'cheapest', displayValue: 'Cheapest'}
                ]
            },
            value: ''
        }
    }


    const reducer = (state, action) => {
        switch ( action.type ) {
            case ( 'name' ): 
               return { ...state, name: action.payload }       
            case ( 'email' ): 
               return { ...state, email: action.payload }       
            case ( 'street' ): 
               return { ...state, street: action.payload }       
            case ( 'zipCode' ): 
               return { ...state, zipCode: action.payload }   
            default:
                return state    
        }
    }

    const [isLoading, setIsLoading] = useState(false)
    const [contacData, dispatch] = useReducer(reducer, initialData)


    const submitHandler = event => {
        event.preventDefault()
        setIsLoading(true)
        const order = {
            ingredients: props.ingredients, 
            price: props.totalPrice, 
            customer: contacData
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
    const inputChangeHandler = event => {
        console.log(event.target.value)
    }
    let formInputs = []
    for (const input in initialForm) {
        formInputs.push(
            <Input 
                key={input}
                inputtype={initialForm[input].elementType} 
                inputConfig={initialForm[input].elementConfig} 
                name={initialForm[input]}
                value={initialForm[input].value}
                change={e => inputChangeHandler(e)}
            />

        )
    }
    let inhold = <>
        <h4>Enter your contact details</h4>
        <Button type='Danger' click={()=>{
                dispatch({type: 'name', payload: 'Marcin'})
                console.log(contacData)
            }}>dotodo</Button>
        <Button type='Danger' click={()=>{
                dispatch({type: 'email', payload: 'kochac@kanapie.com'})
                console.log(contacData)
            }}>dotodo</Button>


        <form onSubmit={(event) => submitHandler(event)}> 
            {formInputs}
            {/* <Input inputtype='input' type='text' name='name' placeholder='Your name' />
            <Input inputtype='input' type='text' name='email' placeholder='Your email' />
            <Input inputtype='input' type='text' name='street' placeholder='Your street' />
            <Input inputtype='input' type='text' name='zipCode' placeholder='Your zip code' /> */}
            <Button type='Success' >Confirm</Button>
        </form>
    </>

    return (
        <div className={styles.ContactData}>
            {isLoading ? <Loader /> : inhold}
        </div>
    )
}

export default ContactData
