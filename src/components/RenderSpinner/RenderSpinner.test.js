import React from 'react';
import { render } from '@testing-library/react';
import RenderSpinner from './RenderSpinner';

describe('Loading Modal', () => {
  it('does not render when showSpinner is falsy', () => {
    const { container } = render(
      <RenderSpinner
        showSpinner={0}
      />
    );
    const spinner = container.querySelector('#spinner');
    expect(spinner).not.toBeInTheDocument();
  });

  it('renders spinner when showSpinner is truthy', () => {
    const { container } = render(
      <RenderSpinner
        showSpinner={1}
      />
    );
    const spinner = container.querySelector('#spinner');
    expect(spinner).toBeInTheDocument();
  });
});