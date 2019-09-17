import React, { useEffect } from 'react';
import './App.css';
import { connect } from 'react-redux'
import { withRouter, Redirect, Switch, Route } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'
import CheckOut from './containers/CheckOut/CheckOut'
import Orders from './containers/Orders/Orders'
import Logout from './containers/Authorisation/Logout/Logout'
import assyncComponent from './hoc/asyncComponent/asyncComponent'
import Authorisation from './containers/Authorisation/Authorisation'
import * as action from './store/actions/actionIndex'

const App = props => {
    useEffect(() => {
        props.onCheckIfAuth()
    }, [props])

    const publicRoutes = <Switch>
        <Route path='/auth' component={Authorisation} />
        <Route path='/' exact component={BurgerBuilder} />
        <Redirect to='/' />
    </Switch>

    const protectedRoutes = <Switch>
        <Route path='/checkout' component={CheckOut} />
        <Route path='/auth' component={Authorisation} />
        <Route path='/orders' component={Orders} />
        <Route path='/logout' component={Logout} />
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

