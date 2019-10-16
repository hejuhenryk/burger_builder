import React from 'react'
// import PropTypes from 'prop-types'
import styles from './Burger.module.css';

import Burgerengridient from './BurderIngredient/BurgerIngredient'



const Burger = (props) => {

    let tranIngredients = Object.keys( props.ingredients ) // arra of keys [ salad, tommato, meat]
        .map( ingKey => { // for each key
            return [...Array(props.ingredients[ingKey] )].map( (_, i) => {
                
                return <Burgerengridient key={ingKey + i} type={ingKey} />
            });
        }).reduce( (arr, el) => {
            return arr.concat(el)
        }, []);


        if (tranIngredients.length === 0) {
            tranIngredients = <p>Please add ingredients</p>
        }

    return (
        <div className={styles.Burger}>
            <Burgerengridient type='bread-top' />
            {tranIngredients}
            <Burgerengridient type='bread-bottom' />
        </div>
    );
};

// burger.propTypes = {

// }

export default Burger

