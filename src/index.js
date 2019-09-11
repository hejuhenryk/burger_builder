import React from 'react';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import burgerBuilderReducer from './store/reducers/burgerBuilderReducer'
import orderReducer from './store/reducers/orderReducer'
import authReducer from './store/reducers/authReducer'
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter} from 'react-router-dom'

const rootReducer = combineReducers({
    burgerBuilder: burgerBuilderReducer,
    order: orderReducer,
    authorisation: authReducer
})

//middlewere
const logger = store => {
    return next => {
        return action => {
            console.log('[Mifflewere] Dispaching', action)
            const result = next(action)
            console.log('[MIddlewere] next state', store.getState() )
            return result
        }
    }
} 

const composeEnhancers =  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(rootReducer, composeEnhancers( applyMiddleware ( logger, thunk )))

const app = (
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
)
    


ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
