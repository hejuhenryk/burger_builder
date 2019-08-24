import React, {Fragment} from 'react'

import classes from './SideDrawer.css'
import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems.jsx';
import Backdrop from '../../UI/Backdrop/Backdrop';

const SideDrawer = (props) => {
    let classesInput = [classes.SideDrawer, props.open ? classes.Open : classes.Close].join(' ')
  

    return (
        <Fragment>
            <Backdrop show={props.open} click={props.close}/>
            <div className={classesInput}>
                {/* <div style={{height: '10%'}}><Logo /></div> */}
                <div className={classes.Logo}><Logo /></div>
                <nav>
                    <NavigationItems />
                </nav>
            </div>
        </Fragment>

    )
}

export default SideDrawer
