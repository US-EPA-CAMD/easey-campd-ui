import React from 'react';
import {
  fireEvent,
  screen,
} from '@testing-library/react';
import render from "../../mocks/render";

import PillButton from './PillButton';

const mockHandler = {
  onClick: jest.fn(),
  onRemove: jest.fn(),
};

describe('<PillButton/>', () => {

  it('handles click events with tooltips', () => {
    render(
      <PillButton
        key={'key'}
        index={'index'}
        label={'label'}
        position="bottom"
        tooltip={'tooltip'}
        disableButton={false}
        onClick={mockHandler.onClick}
        onRemove={mockHandler.onRemove}
      />
    );
    fireEvent.click(screen.getByText('label'));
    expect(mockHandler.onClick).toHaveBeenCalledTimes(1);
    fireEvent.click(screen.getByTestId('remove'));
    expect(mockHandler.onRemove).toHaveBeenCalledTimes(1);
  });

  it('handles disabled button', () => {
    render(
      <PillButton
        key={'key'}
        index={'index'}
        label={'label'}
        position="bottom"
        tooltip={'tooltip'}
        disableButton={true}
        onClick={mockHandler.onClick}
        onRemove={mockHandler.onRemove}
      />
    );
    const pillbutton = screen.getByText("label").closest('button');
    expect(pillbutton).toBeInTheDocument();
    expect(pillbutton).toBeDisabled();
  });
});
