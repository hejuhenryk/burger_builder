import React from 'react'
import classes from './HamburgerMenu.css'

const HamburgerMenu = (props) => {
    return (
        <div className={classes.HamburgerMenu} onClick={props.click}>
            <div className={classes.Bar}></div>
            <div className={classes.Bar}></div>
            <div className={classes.Bar}></div>
        </div>
    )
}

export default HamburgerMenu
