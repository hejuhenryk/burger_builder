import React from 'react'
import NavigationItem from '../NavigationItem/NavigationItem';

import classes from './NavigationItems.css'

const NavigationItems = (props) => {
    return (
        <ul className={classes.NavigationItems}>
            <NavigationItem active={true} link={'/'}>Burger Builder</NavigationItem>
            <NavigationItem active={false} link={'/'}>Contact us</NavigationItem>
        </ul>
    )
}

export default NavigationItems
