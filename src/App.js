import React from 'react';
import './App.css';
import Layout from './components/Layout/Layout'
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'
import CheckOut from './containers/CheckOut/CheckOut';

import { Switch, Route } from 'react-router-dom'


const App = () => {
    return (
        <div>
            <Layout>
                <Switch>
                    <Route path='/checkout' component={CheckOut}/>
                    <Route path='/' exact component={BurgerBuilder}/>
                </Switch>
            </Layout>
        </div>
    )
}

export default App

