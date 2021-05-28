import { fireEvent, render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import * as React from 'react';

import WideHeader from './WideHeader';

describe('WideHeader', () => {
  const query = render(<WideHeader />);

  test('navbar renders a menu button and EPA logo. Click events trigger', () => {
    const { container, getByAltText } = query;
    const btnMenu = container.getElementsByClassName('btnMenu');
    const search = container.getElementsByClassName('search-field')

    expect(btnMenu.length).toEqual(1);
    expect(search.length).toEqual(1)
    expect(getByAltText('Official EPA Logo')).toBeTruthy();
    fireEvent.click(btnMenu[0]);
  });
});
