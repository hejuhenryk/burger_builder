import React from 'react'

import burgerLogo from '../../assets/grafics/logo/burger-logo.png'
import classes from './Logo.css'

const Logo = (props) => {
    return (
        <div className={classes.Logo} style={{height: props.height}}>
            <img src={burgerLogo} alt='BurgerMania Logo' onClick={props.click}/>
        </div>
    )
}

export default Logo
