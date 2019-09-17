import React from 'react'
import { connect } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'
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
    let summary = <Redirect to='/' />
    if (props.ingredients)
        
        summary = (
            <div style={{margin: 'auto'}}>
                { props.isPurchased ? <Redirect to='/' /> : null}
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
    return summary
}
const mapStateToProps = state => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        totalPrice: state.burgerBuilder.totalPrice,
        isPurchased: state.order.isPurchased
    }
}

export default connect(mapStateToProps)(CheckOut)

