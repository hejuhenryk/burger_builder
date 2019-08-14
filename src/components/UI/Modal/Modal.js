import React, { Component } from 'react'
import classes from './Modal.css'
import Backdrop from '../Backdrop/Backdrop'

export default class Modal extends Component {

    shouldComponentUpdate (nextProps, nextState) {
        return nextProps.show !== this.props.show || nextProps.children !== this.props.children
    }

    render() {
        let classN = [classes.Modal, this.props.show ? null : classes.Away ].join(' ')
 
        return (
            <>
                <Backdrop show={this.props.show} click={this.props.click}/>
                <div className={classN}>
                    {this.props.children}
                </div>
            </>
        )
    }
}

// import React, { Fragment } from 'react'
// import classes from './Modal.css'
// import Backdrop from '../Backdrop/Backdrop'

// const modal = (props) => {
//     let classN;
//     if(props.show) {
//         classN = `${classes.Modal}`
//     } else {
//         classN = `${classes.Modal} ${classes.Away}`
//     }
//     return (
//         <Fragment>
//             <Backdrop show={props.show} click={props.click}/>
//             <div className={classN}>
//                 {props.children}
//             </div>
//         </Fragment>
//     )
// };

// export default React.memo(modal)