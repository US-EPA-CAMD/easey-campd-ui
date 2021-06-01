import { fireEvent, render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import * as React from 'react';

import WideHeader from './WideHeader';

describe('WideHeader', () => {
  const query = render(<WideHeader />);

  test('navbar renders a menu button and EPA logo. Click events trigger', () => {
    const { getByTestId, getByAltText } = query;
    const btnMenu = getByTestId('btnMenu');
    const search = getByTestId('search')

    expect(btnMenu).toBeTruthy();
    expect(search).toBeTruthy();
    expect(getByAltText('Official EPA Logo')).toBeTruthy();
    fireEvent.click(btnMenu);
  });
});
