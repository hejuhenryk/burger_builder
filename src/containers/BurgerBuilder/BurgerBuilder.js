import React, { Component, Fragment } from 'react'

import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from './../../axios-orders'
import Loader from '../../components/Loader/Loader';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const ingredientsPrice = {
    salad: 0.4,
    bacon: 0.7,
    cheese: 0.6,
    meat: 1.2,
    tomatoe: 0.5
}

class BurgerBuilder extends Component {

    state = {
        ingredients: null, 
        totalPrice: 4,
        purchasalbe: false,
        purchasing: false,
        isLoading: false,
        isError: false
    }



    componentDidMount() {
        axios.get('/ingredients.json')
            .then( r => {
                this.setState({ingredients: r.data})
            }).catch( e => this.setState({isError: true}))
    }
    

    purchesHandler = () => {
        let purch = this.state.purchasing
        this.setState({purchasing: !purch});
    }

    purchasContinuedHandler = () => {
        this.setState({isLoading: true})
        const order = {
            ingredients: this.state.ingredients, 
            price: this.state.totalPrice, 
            customer: {
                name: 'Wojciech Piechowiak',
                addres: {
                    street: 'Mieszkana',
                    zipCode: '12312'
                }
            }
        }
        axios.post('/orders.json', order)
            .then( r => {
                this.setState({isLoading: false, purchasing: false})

            })
            .catch( e => {
                this.setState({isLoading: false, purchasing: false})
            })
    }

    updatePurchaseState = (ingredients) => {
        const sum = Object.values(ingredients).reduce( (sum, igr) => sum + igr, 0 )
        this.setState({purchasalbe: sum > 0})
    }

    addIngrediendHandler = (type) => {
        const addOneType = this.state.ingredients[type] + 1;
        const updatedIngredients = { ...this.state.ingredients };
        updatedIngredients[type] = addOneType;
        const newPrice = this.state.totalPrice + ingredientsPrice[type]
        this.updatePurchaseState(updatedIngredients)
        this.setState({
            ingredients: updatedIngredients,
            totalPrice: newPrice
        });
    }

    reduceIngrediendHandler = (type) => {
        if (this.state.ingredients[type] > 0 ) {
            const reduceOneType = this.state.ingredients[type] - 1;
            const updatedIngredients = { ...this.state.ingredients };
            updatedIngredients[type] = reduceOneType;
            const newPrice = this.state.totalPrice - ingredientsPrice[type]
            this.updatePurchaseState(updatedIngredients)
            this.setState({
                ingredients: updatedIngredients,
                totalPrice: newPrice
            });
        } else return

    }



    render () {
      
        let burger = this.state.isError ? <p>Ingredients can not be loaded</p> : <div style={{margin: '0 auto', width: '64px'}}><Loader /></div>
        let orderSubmit = null

        if(this.state.ingredients){
            console.log('burger')
            burger = (
                <>
                    <Burger ingredients={this.state.ingredients}/>
                    <BuildControls 
                        add={this.addIngrediendHandler} 
                        remove={this.reduceIngrediendHandler} 
                        labels={Object.keys(this.state.ingredients)}
                        disables={Object.values(this.state.ingredients)}
                        price={this.state.totalPrice}
                        purchasalbe={this.state.purchasalbe}
                        order={this.purchesHandler}
                    />
                </>
            )
            orderSubmit = (
                <OrderSummary 
                    ingredients={this.state.ingredients}
                    cancelOrder={()=>this.purchesHandler()}
                    confirmOrder={()=>this.purchasContinuedHandler()}
                    price={this.state.totalPrice.toFixed(2)}
                />
            )
        }
        if (this.state.isLoading) {
            orderSubmit = <Loader />
        }
        return (
            <Fragment>
                <Modal show={this.state.purchasing} click={this.purchesHandler}>
                    {orderSubmit}
                </Modal>
                {burger}
            </Fragment>
        );
    }
}

export default withErrorHandler(BurgerBuilder, axios);