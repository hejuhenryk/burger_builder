import React, {Component} from 'react'
import Modal from '../../components/UI/Modal/Modal';



const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {
        state = {
            error: null
        }
        componentWillMount () {
            this.reqInterceptors = axios.interceptors.request.use( request => {
                this.setState({error: null})
                return request
            } )
            this.resInterceptors = axios.interceptors.response.use( response => response, error =>{
                // console.log(error.message)
                this.setState({error: error}) 
            })
        }

        componentWillUnmount() {
            axios.interceptors.request.eject(this.reqInterceptors)
            axios.interceptors.response.eject(this.resInterceptors)
        }

        render () {
            return (
                <>
                    <Modal show={this.state.error} click={()=>this.setState({error: null})}>
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </>
            )
        }
    }
}

export default withErrorHandler
