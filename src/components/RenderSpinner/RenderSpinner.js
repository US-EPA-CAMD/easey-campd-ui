import React from 'react';
import './RenderSpinner.scss';
import { Preloader } from '@us-epa-camd/easey-design-system';

const RenderSpinner = ({ showSpinner }) => {
  return (
    showSpinner && (
      <span id="spinner">
        <Preloader />
      </span>
    )
  );
};

export default RenderSpinner;
