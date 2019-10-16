import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import axios from '../../axios-orders'
import * as actions from '../../store/actions/actionIndex'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls.jsx'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Loader from '../../components/Loader/Loader';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';



const BurgerBuilder = ({onInitIngredients, ...props}) => {
    const [isPurchasing, setIsPurchasing] = useState(false)
    const [isLoading] = useState(false)
    // const [isError, setIsError] = useState(false)

    useEffect(() => {
        onInitIngredients()
    }, [onInitIngredients])
    
    const canPurche = (ingredients) => {
        const sum = Object.values(ingredients).reduce( (sum, igr) => sum + igr, 0 )
        return ( sum > 0 )
    }

    const clickHanlder = () => {
        if( props.isAuth ) {
            setIsPurchasing(true)
        } else {
            props.onSetAuthRedirectPath('/checkout')
            props.history.push('/auth')
        }
    }
    const purchasCancelHandler = () => {
        setIsPurchasing(false)
    }
    const purchasContinuedHandler = () => {
        props.onInitPurchase()
        props.history.push('/checkout')
    }



    let burger = props.isError ? 
        <p>Ingredients can not be loaded</p> : 
        <div style={{margin: '0 auto', width: '64px'}}><Loader /></div>
    let orderSubmit = null

    if(props.ingredients){
        burger = (
            <>
                <Burger ingredients={props.ingredients}/>
                <BuildControls 
                    add={props.onAddIngredient} 
                    remove={props.onRemoveIngredient} 
                    labels={Object.keys(props.ingredients)}
                    disables={Object.values(props.ingredients)}
                    price={props.totalPrice}
                    purchasable={canPurche(props.ingredients)}
                    handleClick={clickHanlder}
                    isAuth={props.isAuth}
                />
            </>
        )
        orderSubmit = (
            <OrderSummary 
                ingredients={props.ingredients}
                cancelOrder={purchasCancelHandler}
                confirmOrder={purchasContinuedHandler}
                price={props.totalPrice.toFixed(2)}
            />
        )
    }
    if (isLoading) {
        orderSubmit = <Loader />
    }

    return (
        <>
            <Modal show={isPurchasing} click={clickHanlder}>
                {orderSubmit}
            </Modal>
            {burger}
        </>
    )
}
const mapStateToProps = (state) => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        totalPrice: state.burgerBuilder.totalPrice,
        isError: state.burgerBuilder.isError,
        isAuth: state.authorisation.token !== null
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        onAddIngredient: (ingredientName) => dispatch(actions.addIngredient(ingredientName)),
        onRemoveIngredient: (ingredientName) => dispatch(actions.removeIngredient(ingredientName)),
        onInitIngredients: () => dispatch(actions.initIngredients()) ,
        onInitPurchase: () => dispatch(actions.purchaseInit()),
        onSetAuthRedirectPath: path => dispatch(actions.setAuhtRedirectionPath(path))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler( BurgerBuilder, axios ));