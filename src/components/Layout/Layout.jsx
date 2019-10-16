import React, { useState } from 'react'
import styles from './Layout.module.css'
import Toolbar from '../Navigation/Toolbar/Toolbar.jsx';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';


const Layout = props => {
    const [isSideDrowerVisible, setIsSideDrowerVisible] = useState(false)

    const sideDrawerCloseHandler = () => {
        setIsSideDrowerVisible(false)
    }

    const sideDrawerToggleHandler = () => {
        setIsSideDrowerVisible(!isSideDrowerVisible)
    }
    return (
        <>
            <Toolbar hamburgerMenuClicked={sideDrawerToggleHandler}/>
            <SideDrawer open={isSideDrowerVisible} close={sideDrawerCloseHandler}/>
            <main className={styles.Content}>{props.children}</main>
        </>
    )
}

export default Layout


// class Layout extends Component {
//     state = {
//         showSideDrawer: false
//     }
//     sideDrawerClosedHandler = () => {
//         this.setState({showSideDrawer: false})
//     }
//     sideDrawerToggleHandler = () => {
//         this.setState( prevState => { return {showSideDrawer: !prevState.showSideDrawer}} )
//     }

//     render () {
//         return (
//             <Fragment>
//                 <Toolbar hamburgerMenuClicked={this.sideDrawerToggleHandler}/>
//                 <SideDrawer open={this.state.showSideDrawer} close={this.sideDrawerClosedHandler}/>
//                 <main className={styles.Content}>{this.props.children}</main>
//             </Fragment>
//         )
//     }
// }

// export default Layout