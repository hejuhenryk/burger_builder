import React, {Fragment} from 'react'
import Button from '../../UI/Button/Button'
// import { Link } from 'react-router-dom'


const OrderSummary = (props) => {

            const ingredientsSummary = Object.keys( props.ingredients )
                .map( ing => {
                    return (
                        props.ingredients[ing] ?
                        <li key={ing}>
                            <span style={{ textTransform: 'capitalize'}}>{ing}: {props.ingredients[ing]} </span>
                        </li> : null
                    )
                }) 
    return (
            <Fragment>
                <h3>Do you want to order the burger</h3>
                <p>It is so delisious, with those ingredients:</p>
                <ul>
                    {ingredientsSummary} 
                </ul>
                <p><strong>Total: {props.price}</strong></p>
                <span>
                    <Button 
                        click={props.confirmOrder} 
                        type={'Success'}
                        >Yes, Please.</Button>
                    <Button 
                        click={props.cancelOrder} 
                        type={'Danger'}
                    >No, thanks.</Button>
                </span>
            </Fragment>
    )
}

export default OrderSummary



// import React, { Fragment, Component } from 'react'



// class OrderSummary extends Component {

//     render () {
//         const ingredientsSummary = Object.keys( this.props.ingredients )
//                 .map( ing => {
//                     return (
//                         this.props.ingredients[ing] ?
//                         <li key={ing}>
//                             <span style={{ textTransform: 'capitalize'}}>{ing}: {this.props.ingredients[ing]} </span>
//                         </li> : null
//                     )
//                 }) 

//         return (
//             <Fragment>
//                 <h3>Do you want to order the burger</h3>
//                 <p>It is so delisious, with those ingredients:</p>
//                 <ul>
//                     {ingredientsSummary} 
//                 </ul>
//                 <p><strong>Total: {this.props.price}</strong></p>
//                 <span>
//                     <Button 
//                         click={this.props.confirmOrder} 
//                         type={'Success'}
//                     >Yes, Please.</Button> 
//                     <Button 
//                         click={this.props.cancelOrder} 
//                         type={'Danger'}
//                     >No, thanks.</Button>
//                 </span>
//             </Fragment>
//         )

//     }
// }

// export default OrderSummary
