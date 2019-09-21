import React from 'react'
import {connect} from 'react-redux'
import NavigationItem from '../NavigationItem/NavigationItem';
import * as action from '../../../store/actions/actionIndex'

import styles from './NavigationItems.module.css'

export const NavigationItems = (props) => {
    let authorisation = <NavigationItem link={'/auth'}>Login</NavigationItem>
    if (props.isAuth) {
        
        authorisation = <>
            <NavigationItem link={'/orders'}>Orders</NavigationItem>
            <NavigationItem link={'/logout'}>Logout</NavigationItem>
        </>
    }
    return (
        <ul className={styles.NavigationItems}>
            <NavigationItem link={'/'}>Burger Builder</NavigationItem>
            {authorisation}
        </ul>
    )
}

const mapStateToProps = state => {
    return {
        isAuth: state.authorisation.userId ? true : false
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onLogout: () => dispatch(action.logout())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(NavigationItems)
