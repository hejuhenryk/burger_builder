import React from 'react'
import CheckOutSummary from '../../components/ChckOutSummary/CheckOutSummary';

const CheckOut = props => {
    const burgerIngredients = props.location.state

    return (
        <div style={{margin: 'auto'}}>
            <CheckOutSummary 
                ingredients={burgerIngredients ? burgerIngredients : {}}
                cancelCheckoutHandler={()=>props.history.goBack()}
                continueCheckuotHandler={props.continueCheckuotHandler}
            />
        </div>
    )
}

export default CheckOut
