import React, { useEffect, useState } from 'react';
import './RenderSpinner.scss';

import { Preloader } from '@us-epa-camd/easey-design-system';
const RenderSpinner = ({ loading, setSpinnerActive, spinnerActive }) => {
//   const [spinnerInProgress, setSpinnerInProgress] = useState(false);
//   useEffect(() => {
//     if (spinnerInProgress) setSpinnerActive(true);
//   }, [spinnerInProgress]);

  if (loading && !spinnerActive) {
    setSpinnerActive(true);
    return <Preloader />;
  } else {
    return null;
  }
};

export default RenderSpinner;
