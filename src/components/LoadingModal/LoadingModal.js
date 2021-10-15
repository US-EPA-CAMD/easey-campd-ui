import React from 'react';

import './LoadingModal.scss';

const LoadingModal = (props) => {
  const { loading } = props;

  const styles = {
    loadingWrapper: {
      position: 'fixed',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      width: '100%',
      height: '100%',
      margin: 0,
      padding: 0,
      zIndex: 815,
    },
    innerWrapper: {
      position: 'fixed',
      top: '50%',
      transform: 'translateY(-50%)',
      left: 0,
      right: 0,
      width: '80%',
      height: '400px',
      margin: '0 auto',
      padding: 0,
      zIndex: 17,
    },
    // modalTintScreen: {
    //   position: 'absolute',
    //   top: 0,
    //   bottom: 0,
    //   width: '100%',
    //   height: '100%',
    //   opacity: '0.5',
    //   zIndex: '0',
    //   textIndent: '-9999px',
    //   backgroundColor: '#ffffff',
    // },
  };

  return (
    <>
      {loading && (
        <div
          data-test="component-loading"
          className="loading-modal"
          style={styles.loadingWrapper}
        >
          <div style={styles.innerWrapper} role="alert" aria-busy="true">
            <div className="text-center margin-top-9 padding-top-9">
              <p className="margin-0">
                <img
                  alt="Loading... Please wait..."
                  title="Loading... Please wait..."
                  src={`${process.env.PUBLIC_URL}/images/preloaders/spinner.gif`}
                />
              </p>
            </div>
          </div>
          <div style={styles.modalTintScreen} />
        </div>
      )}
    </>
  );
};

export default LoadingModal;
