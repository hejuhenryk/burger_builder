import React from 'react';
import './App.css';
import Layout from './components/Layout/Layout'
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'
import CheckOut from './containers/CheckOut/CheckOut'
import Orders from './containers/Orders/Orders'
import Logout from './containers/Authorisation/Logout/Logout'

import { Switch, Route } from 'react-router-dom'
import Authorisation from './containers/Authorisation/Authorisation';


const App = () => {
    return (
        <div>
            <Layout>
                <Switch>
                    <Route path='/checkout' component={CheckOut} />
                    <Route path='/orders' component={Orders} />
                    <Route path='/auth' component={Authorisation} />
                    <Route path='/logout' component={Logout} />
                    <Route path='/' exact component={BurgerBuilder} />
                </Switch>
            </Layout>
        </div>
    )
}

export default App

