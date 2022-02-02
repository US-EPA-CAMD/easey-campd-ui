import React, { useEffect, useState } from 'react';
import './RenderSpinner.scss';

import { Preloader } from '@us-epa-camd/easey-design-system';
const RenderSpinner = ({ loading, setSpinnerActive, spinnerActive }) => {
  const [showSpinner, setShowSpinner] = useState(false);
  useEffect(() => {
    if (loading && !spinnerActive) {
      setShowSpinner(true);
      setSpinnerActive(true);
    }//eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    showSpinner && (
      <span id="spinner">
        <Preloader />
      </span>
    )
  );
};

export default RenderSpinner;
