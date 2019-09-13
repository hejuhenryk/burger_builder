import React, { useState, useEffect } from 'react';

import Modal from '../../components/UI/Modal/Modal';

const withErrorHandler = (WrappedComponent, axios) => {
  return props => {
    const [error, setError] = useState(null);

    const reqInterceptor = axios.interceptors.request.use(req => {
      setError(null);
      return req;
    });
    const resInterceptor = axios.interceptors.response.use(
      res => {
          return res},
      err => {
        setError(err);
      }
    );

    useEffect(() => {
      return () => {
        axios.interceptors.request.eject(reqInterceptor);
        axios.interceptors.response.eject(resInterceptor);
      };
    }, [reqInterceptor, resInterceptor]);

    const errorConfirmedHandler = () => {
      setError(null);
    };

    return (
      <>
        <Modal show={error} click={errorConfirmedHandler}>
          {error ? error.message : null}
        </Modal>
        <WrappedComponent {...props} />
      </>
    );
  };
};

export default withErrorHandler;


/* import React, { useState, useEffect } from 'react'
import Modal from '../../components/UI/Modal/Modal';

const withErrorHandler = (WrappedComponent, axios) => {
    return (props) => {
        const [error, setError] = useState(null)
        useEffect(() => {
            const reqInterceptors = axios.interceptors.request.use( request => {
                console.log('request')

                setError(null)
                return request
            } )
            const resInterceptors = axios.interceptors.response.use( response => response, error => {
                console.log(error)
                setError(error)
            })

            return () => {
                axios.interceptors.request.eject(reqInterceptors)
                axios.interceptors.response.eject(resInterceptors)
            };
        }, [[error]])

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

*/
/* 
const checkRequests= Wrapped => {
    function CheckRequests(props) {
        useEffect(()=>{
            axios.interceptors.response.use(function (response) {
                // Do something with response data
                return response;
            }, function (error) {
                switch (error.response.status) {
                    case 503 :
                        props.history.push('/503') //we will redirect user into 503 page 
                        break
                    default :
                        break
                }
                // Do something with response error
                return Promise.reject(error);
            });
        })

        return (
            <Wrapped {...props} />
        )
    }
    return CheckRequests
}

export default checkRequests
*/

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
