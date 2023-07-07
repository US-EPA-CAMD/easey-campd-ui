import React from 'react';
import { screen } from '@testing-library/react';
import render from "../../mocks/render";
import RenderSpinner from './RenderSpinner';

describe('- Loading Modal -', () => {
  it('does not render when showSpinner is falsy', () => {
    render(
      <RenderSpinner
        showSpinner={0}
      />
    );
    const spinner = screen.queryByTestId('spinner-wrapper');
    expect(spinner).toBe(null);
  });

  it('renders spinner when showSpinner is truthy', () => {
    render(
      <RenderSpinner
        showSpinner={1}
      />
    );
    const spinner = screen.queryByTestId('spinner-wrapper');
    expect(spinner).toBeDefined();
    expect(spinner).toBeInTheDocument();
  });
});