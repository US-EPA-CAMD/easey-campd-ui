import React from 'react';
import './RenderSpinner.scss';
import { Preloader } from '@us-epa-camd/easey-design-system';

const RenderSpinner = ({ showSpinner }) =>
  showSpinner ? (
    <span id="spinner" data-testid="spinner-wrapper">
      <Preloader />
    </span>
  ) : null;

export default RenderSpinner;
