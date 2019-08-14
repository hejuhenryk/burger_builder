import React, { useState, useEffect } from 'react'
import Modal from '../../components/UI/Modal/Modal';

const withErrorHandler = (WrappedComponent, axios) => {
    return (props) => {
        const [error, setError] = useState(null)
        console.log(error)
        useEffect(() => {
            const reqInterceptors = axios.interceptors.request.use( request => {
                setError(null)
                return request
            } )
            const resInterceptors = axios.interceptors.response.use( response => response, error =>{
                setError(error)
            })
            return () => {
                axios.interceptors.request.eject(reqInterceptors)
                axios.interceptors.response.eject(resInterceptors)
            };
        }, [error])
    
        return (
            <>
                <Modal show={error} click={()=>setError(null)}>
                    {error ? error.message : null}
                </Modal>
                <WrappedComponent {...props} />
            </>
        )
    }
}

export default withErrorHandler


// import React, {Component} from 'react'
// import Modal from '../../components/UI/Modal/Modal';



// const withErrorHandler = (WrappedComponent, axios) => {
//     return class extends Component {
//         state = {
//             error: null
//         }
//         componentWillMount () {
//             this.reqInterceptors = axios.interceptors.request.use( request => {
//                 this.setState({error: null})
//                 return request
//             } )
//             this.resInterceptors = axios.interceptors.response.use( response => response, error =>{
//                 // console.log(error.message)
//                 this.setState({error: error}) 
//             })
//         }

//         componentWillUnmount() {
//             axios.interceptors.request.eject(this.reqInterceptors)
//             axios.interceptors.response.eject(this.resInterceptors)
//         }

//         render () {
//             return (
//                 <>
//                     <Modal show={this.state.error} click={()=>this.setState({error: null})}>
//                         {this.state.error ? this.state.error.message : null}
//                     </Modal>
//                     <WrappedComponent {...this.props} />
//                 </>
//             )
//         }
//     }
// }

// export default withErrorHandler
