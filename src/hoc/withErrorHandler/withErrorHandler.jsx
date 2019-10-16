import React from 'react';

import Modal from '../../components/UI/Modal/Modal';
import useHttpErrorHandler from '../../customHooks/httpErrorHandler';

const withErrorHandler = (WrappedComponent, axios) => {
  return props => {

    const [error, errorConfirmedHandler] = useHttpErrorHandler(axios)

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

