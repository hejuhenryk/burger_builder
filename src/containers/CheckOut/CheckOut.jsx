import React from 'react'
import { connect } from 'react-redux'
import { Route } from 'react-router-dom'
import CheckOutSummary from '../../components/ChckOutSummary/CheckOutSummary';
import ContactData from '../ContactData/ContactData';

const CheckOut = props => {
    // const burgerIngredients = props.ingredients
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
                ingredients={props.ingredients/* burgerIngredients ? burgerIngredients : {} */}
                totalPrice={props.totalPrice.toFixed(2)}
                cancelCheckoutHandler={cancelCheckuotHandler}
                continueCheckuotHandler={continueCheckuotHandler}
            />
            <Route 
                path={props.match.url + '/contactData/'} 
                component={ContactData}
            />
        </div>
    )
}
const mapStateToProps = state => {
    return {
        ingredients: state.ingredients,
        totalPrice: state.totalPrice
    }
}

export default connect(mapStateToProps)(CheckOut)

