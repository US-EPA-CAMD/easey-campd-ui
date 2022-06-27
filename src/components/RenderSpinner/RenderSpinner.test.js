import React from 'react';
import { render } from '@testing-library/react';
import RenderSpinner from './RenderSpinner';

describe('Loading Modal', () => {

  it('does not render spinner when show spinner is falsey', () => {
    const { container } = render(
      <RenderSpinner
        showSpinner={false}
      />
    );
    const spinner = container.querySelector('#spinner');
    expect(spinner).not.toBeInTheDocument();
  });

  it('renders spinner when show spinner is truthy', () => {
    const { container } = render(
      <RenderSpinner
        showSpinner={true}
      />
    );
    const spinner = container.querySelector('#spinner');
    expect(spinner).toBeInTheDocument();
  });
});
