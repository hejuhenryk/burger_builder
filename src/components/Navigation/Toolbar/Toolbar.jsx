import React from 'react'

import styles from './Toolbar.module.css'
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems.jsx';
import HamburgerMenu from '../../UI/HamburgerMenu/HamburgerMenu';

const Toolbar = (props) => {
    return (
        <header className={styles.Toolbar}>
            <HamburgerMenu click={props.hamburgerMenuClicked}/>
            {/* <div style={{height: '80%'}}><Logo /></div> */}
            <div className={[styles.Logo, styles.DesktopOnly].join(' ')}><Logo /></div>
            {/* <Logo height='90%'/> */}
            <nav className={styles.DesktopOnly}>
                <NavigationItems />
            </nav>
        </header>
    )
}

export default Toolbar
