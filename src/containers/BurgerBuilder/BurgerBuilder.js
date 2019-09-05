import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { actionType } from '../../store/actionTypes'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from './../../axios-orders'
import Loader from '../../components/Loader/Loader';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';



const BurgerBuilder = props => {
    const [isPurchasing, setIsPurchasing] = useState(false)
    const [isLoading] = useState(false)
    const [isError, setIsError] = useState(false)

    // useEffect(() => {
    //     axios.get('/ingredients.json')  
    //         .then( r => {
    //             setIngredients(r.data)
    //         }).catch( e => setIsError(true))
    // }, [])

    const purchesHandler = () => {
        setIsPurchasing(!isPurchasing)
    }

    const purchasContinuedHandler = () => {
        props.history.push('/checkout')
        // props.history.push({
        //     pathname: '/checkout',
        //     state: {
        //         ingredients: props.ingredients,
        //         totalPrice: props.totalPrice
        //     }
        // })
    }

    const canPurche = (ingredients) => {
        const sum = Object.values(ingredients).reduce( (sum, igr) => sum + igr, 0 )
        return ( sum > 0 )
    }

        let burger = isError ? 
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
                        order={purchesHandler}
                    />
                </>
            )
            orderSubmit = (
                <OrderSummary 
                    ingredients={props.ingredients}
                    cancelOrder={()=>purchesHandler()}
                    confirmOrder={()=>purchasContinuedHandler()}
                    price={props.totalPrice.toFixed(2)}
                />
            )
        }
        if (isLoading) {
            orderSubmit = <Loader />
        }

    return (
        <>
            <Modal show={isPurchasing} click={purchesHandler}>
                {orderSubmit}
            </Modal>
            {burger}
        </>
    )
}
const mapStateToProps = (state) => {
    return {
        ingredients: state.ingredients,
        totalPrice: state.totalPrice
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        onAddIngredient: (ingredientName) => dispatch({type: actionType.ADD_INGREDIENT, payload: ingredientName}),
        onRemoveIngredient: (ingredientName) => dispatch({type: actionType.REMOVE_INGREDIENT, payload: ingredientName})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler( BurgerBuilder, axios));
