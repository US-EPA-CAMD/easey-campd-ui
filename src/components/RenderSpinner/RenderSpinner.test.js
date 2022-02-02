import React from 'react';
import { render } from '@testing-library/react';
import RenderSpinner from './RenderSpinner';

describe('Loading Modal', () => {
  it('does not render when another spinner is active', () => {
    const { container } = render(
      <RenderSpinner
        spinnerActive={true}
        loading={1}
        setSpinnerActive={jest.fn}
      />
    );
    const spinner = container.querySelector('#spinner');
    expect(spinner).not.toBeInTheDocument();
  });

  it('does not render spinner when loaing is false', () => {
    const { container } = render(
      <RenderSpinner
        spinnerActive={false}
        loading={0}
        setSpinnerActive={jest.fn}
      />
    );
    const spinner = container.querySelector('#spinner');
    expect(spinner).not.toBeInTheDocument();
  });

  it('renders spinner when loading is true and there are no active spinners', () => {
    const { container } = render(
      <RenderSpinner
        spinnerActive={false}
        loading={1}
        setSpinnerActive={jest.fn}
      />
    );
    const spinner = container.querySelector('#spinner');
    expect(spinner).toBeInTheDocument();
  });
});
