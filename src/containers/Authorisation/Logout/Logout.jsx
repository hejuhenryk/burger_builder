import React from 'react'
import { connect } from 'react-redux'
import * as action from '../../../store/actions/actionIndex'
import { Redirect } from 'react-router-dom'

const Logout = props => {
    props.onLogout()
    return <Redirect to={'/'} />
}
const mapDispatchToProps = dispatch => {
    return {
        onLogout: () => dispatch(action.logout())
    }
}
export default connect(null, mapDispatchToProps)(Logout)
