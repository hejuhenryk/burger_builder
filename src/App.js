import React, { useEffect, lazy, Suspense } from 'react';
import './App.css';
import { connect } from 'react-redux'
import { withRouter, Redirect, Switch, Route } from 'react-router-dom'
import Layout from './components/Layout/Layout.jsx'
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'
// import CheckOut from './containers/CheckOut/CheckOut'
// import Orders from './containers/Orders/Orders'
import Logout from './containers/Authorisation/Logout/Logout'
// import Authorisation from './containers/Authorisation/Authorisation'

// import asyncComponent from './hoc/asyncComponent/asyncComponent' // use react lazy insted 
import * as action from './store/actions/actionIndex'
import Loader from './components/Loader/Loader';

// const asyncCheckOut = asyncComponent( () => {
//     return import('./containers/CheckOut/CheckOut')
// })

// const asyncOrders = asyncComponent( () => {
//     return import('./containers/Orders/Orders')
// })

// const asynkLogout = asyncComponent( () => {
//     return import('./containers/Authorisation/Logout/Logout')
// })

// const asyncAuthorisation = asyncComponent( () => {
//     return import('./containers/Authorisation/Authorisation')
// })
const CheckOut = lazy( () => {
    return import('./containers/CheckOut/CheckOut')
})

const Orders = lazy( () => {
    return import('./containers/Orders/Orders')
})

const Authorisation = lazy( () => {
    return import('./containers/Authorisation/Authorisation')
})

const App = ( { onCheckIfAuth, isAuth, ...props} ) => {
    useEffect(() => {
        onCheckIfAuth()
    }, [ isAuth, onCheckIfAuth])

    const publicRoutes = <Switch>
        <Route path='/auth' render={props => <Authorisation {...props}/>} />
        <Route path='/' exact component={BurgerBuilder} />
        <Redirect to='/' />
    </Switch>

    const protectedRoutes = <Switch>
        <Route path='/checkout' render={props => <CheckOut {...props}/>} />
        <Route path='/auth' render={props => <Authorisation {...props}/>} />
        <Route path='/orders' render={props => <Orders {...props}/>} />
        <Route path='/logout' component={Logout} />
        <Route path='/' exact component={BurgerBuilder} />
        <Redirect to='/' />
    </Switch>

    return (
        <div>
            <Layout>
                <Suspense fallback={<Loader />}>
                    { isAuth ? protectedRoutes : publicRoutes }
                </Suspense>
            </Layout>
        </div>
    )
}
const mapStateToProps = state => {
    return {
        isAuth: state.authorisation.token !== null
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onCheckIfAuth: () => dispatch(action.checkIfAuth())
    }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))

