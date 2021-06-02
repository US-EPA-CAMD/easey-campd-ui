import React from 'react';
import { cleanup, fireEvent, render } from '@testing-library/react';

import DownloadFileType from './DownloadFileType';

const mockHandler = {
  onClick: jest.fn(),
};

describe('<DownloadFileType/>', () => {
  let query;
  beforeEach(() => {
    query = render(<DownloadFileType onClick={mockHandler.onClick} />);
  });

  afterEach(cleanup);

  it('has radio buttons', () => {
    const { getByLabelText } = query;
    expect(getByLabelText('CSV')).toHaveClass('usa-radio__input');
    expect(getByLabelText('JSON')).toHaveClass('usa-radio__input');
  });

  it('handles the download button click', () => {
    const { getByRole } = query;
    fireEvent.click(getByRole('button'));
    expect(mockHandler.onClick).toHaveBeenCalledTimes(1);
  });
});
