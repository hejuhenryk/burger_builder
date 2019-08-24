import React from 'react'
import  { NavLink } from 'react-router-dom'

import styles from './NavigationItem.module.css'

const NavigationItem = (props) => {
    return (
        <li className={styles.NavigationItem}>
            <NavLink 
                exact
                to={props.link}
                activeClassName={styles.active}
            >{props.children}</NavLink>
        </li>
    )
}

export default NavigationItem
