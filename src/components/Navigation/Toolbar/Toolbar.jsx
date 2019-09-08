import React from 'react'
import {withRouter} from 'react-router-dom'
import styles from './Toolbar.module.css'
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems.jsx';
import HamburgerMenu from '../../UI/HamburgerMenu/HamburgerMenu';

const Toolbar = (props) => {
    console.log(props)
    return (
        <header className={styles.Toolbar}>
            <HamburgerMenu click={props.hamburgerMenuClicked}/>
            <div className={[styles.Logo, styles.DesktopOnly].join(' ')}><Logo click={()=>props.history.push('/')}/></div>
            <nav className={styles.DesktopOnly}>
                <NavigationItems />
            </nav>
        </header>
    )
}

export default withRouter(Toolbar)
