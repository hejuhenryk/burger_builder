import React from 'react'
import styles from './Modal.module.css'
import Backdrop from '../Backdrop/Backdrop'

const Modal = ({show, click, ...props}) => {

        let classN = [styles.Modal, show ? null : styles.Away ].join(' ')
 
        return (
            <>
                <Backdrop show={show} click={click}/>
                <div className={classN}>
                    {props.children}
                </div>
            </>
        )
}

export default React.memo(Modal, (prevProps, nextProps) => {
    return nextProps.show === prevProps.show && nextProps.children === prevProps.children
})
