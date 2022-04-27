import React from 'react';
import './RenderSpinner.scss';
import { Preloader } from '@us-epa-camd/easey-design-system';

const RenderSpinner = ({ showSpinner }) =>
  showSpinner ? (
    <span id="spinner">
      <Preloader />
    </span>
  ) : null;

export default RenderSpinner;
