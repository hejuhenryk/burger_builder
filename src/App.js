import React, { useEffect } from 'react';
import './App.css';
import { connect } from 'react-redux'
import { withRouter, Redirect, Switch, Route } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'
// import CheckOut from './containers/CheckOut/CheckOut'
// import Orders from './containers/Orders/Orders'
// import Logout from './containers/Authorisation/Logout/Logout'
// import Authorisation from './containers/Authorisation/Authorisation'
import asyncComponent from './hoc/asyncComponent/asyncComponent'
import * as action from './store/actions/actionIndex'

const asyncCheckOut = asyncComponent( () => {
    return import('./containers/CheckOut/CheckOut')
})

const asyncOrders = asyncComponent( () => {
    return import('./containers/Orders/Orders')
})

const asynkLogout = asyncComponent( () => {
    return import('./containers/Authorisation/Logout/Logout')
})

const asyncAuthorisation = asyncComponent( () => {
    return import('./containers/Authorisation/Authorisation')
})

const App = props => {
    useEffect(() => {
        props.onCheckIfAuth()
    }, [props.isAuth])

    const publicRoutes = <Switch>
        <Route path='/auth' component={asyncAuthorisation} />
        <Route path='/' exact component={BurgerBuilder} />
        <Redirect to='/' />
    </Switch>

    const protectedRoutes = <Switch>
        <Route path='/checkout' component={asyncCheckOut} />
        <Route path='/auth' component={asyncAuthorisation} />
        <Route path='/orders' component={asyncOrders} />
        <Route path='/logout' component={asynkLogout} />
        <Route path='/' exact component={BurgerBuilder} />
        <Redirect to='/' />
    </Switch>

    return (
        <div>
            <Layout>
                { props.isAuth ? protectedRoutes : publicRoutes }
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

