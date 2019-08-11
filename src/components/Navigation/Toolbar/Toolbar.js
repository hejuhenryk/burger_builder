import React from 'react'

import classes from './Toolbar.css'
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import HamburgerMenu from '../../UI/HamburgerMenu/HamburgerMenu';

const Toolbar = (props) => {
    return (
        <header className={classes.Toolbar}>
            <HamburgerMenu click={props.hamburgerMenuClicked}/>
            {/* <div style={{height: '80%'}}><Logo /></div> */}
            <div className={[classes.Logo, classes.DesktopOnly].join(' ')}><Logo /></div>
            {/* <Logo height='90%'/> */}
            <nav className={classes.DesktopOnly}>
                <NavigationItems />
            </nav>
        </header>
    )
}

export default Toolbar
