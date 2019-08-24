import React from 'react'
import { Route } from 'react-router-dom'
import CheckOutSummary from '../../components/ChckOutSummary/CheckOutSummary';
import ContactData from '../ContactData/ContactData';

const CheckOut = props => {
    console.log(props)
    const burgerIngredients = props.location.state.ingredients
    const cancelCheckuotHandler = () => {
        props.history.goBack()
    }
    const continueCheckuotHandler = () => {
        props.history.replace({
            pathname: '/checkout/contactData',
            state: props.location.state
        })
        

    }
    
    return (
        <div style={{margin: 'auto'}}>
            <CheckOutSummary 
                ingredients={burgerIngredients ? burgerIngredients : {}}
                totalPrice={props.location.state.totalPrice.toFixed(2)}
                cancelCheckoutHandler={cancelCheckuotHandler}
                continueCheckuotHandler={continueCheckuotHandler}
            />
            <Route 
                path={props.match.url + '/contactData/'} 
                render={()=><ContactData 
                    ingredients={burgerIngredients ? burgerIngredients : {}}
                    totalPrice={props.location.state.totalPrice.toFixed(2)} />
                }
            />
        </div>
    )
}

export default CheckOut


// {
//     pathname: ,
//     state: {
//         ingredients: burgerIngredients ? burgerIngredients : {},
//         totalPrice: props.location.state.totalPrice.toFixed(2)
//     }
// }