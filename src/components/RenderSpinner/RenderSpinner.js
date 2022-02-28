import React, { useEffect, useState } from 'react';
import './RenderSpinner.scss';

import { Preloader } from '@us-epa-camd/easey-design-system';
const RenderSpinner = ({ loading, setSpinnerActive, spinnerActive }) => {
  const [showSpinner, setShowSpinner] = useState(false);
  useEffect(() => {
    if (!setSpinnerActive && loading){
      setShowSpinner(true)
    } else if (loading && !spinnerActive) {
      setShowSpinner(true);
      setSpinnerActive(true);
    }//eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, spinnerActive]);

  return (
    showSpinner && (
      <span id="spinner">
        <Preloader />
      </span>
    )
  );
};

export default RenderSpinner;
