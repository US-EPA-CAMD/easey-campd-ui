import React, { useEffect, useState } from 'react';
import './RenderSpinner.scss';

import { Preloader } from '@us-epa-camd/easey-design-system';
const RenderSpinner = ({ showSpinner }) => {
useEffect(() => {
  console.log('show spinner', showSpinner);
}, [showSpinner])
  return (
    showSpinner && (
      <span id="spinner">
        <Preloader />
      </span>
    )
  );
};

export default RenderSpinner;
