import React from 'react';
import { cleanup, render, } from '@testing-library/react';

import LoadingModal from './LoadingModal';

describe('Loading Modal', () => {
  let query;
  beforeEach(() => {
    query = render(<LoadingModal loading={true} />);
  });

  afterEach(cleanup);

  it('renders properly', () => {
    const { getByTitle } = query;
    const loadingModal = getByTitle('Loading... Please wait...');
    expect(loadingModal).toBeInTheDocument();
  });
});
