import React from 'react';
import { render } from '@testing-library/react';
import SubHeaderNavMobile from './SubHeaderNavMobile';
import {
  subHeaderMenuList,
  subHeaderUtilityList,
} from '../../utils/constants/menuTopics';

describe('SubHeaderNavMobile', () => {
  test('renders without errors', () => {
    const query = render(
      <SubHeaderNavMobile
        showMobileMenu={true}
        subHeaderMenuList={subHeaderMenuList}
        subHeaderUtilityList={subHeaderUtilityList}
        pathname="/data"
      />
    );
    const { container, getByText } = query;
    const home = getByText('HOME');
    const data = getByText('DATA');
    const analysis = getByText('VISUALIZATION & ANALYSIS');

    expect(home).toBeTruthy();
    expect(data).toBeTruthy();
    expect(analysis).toBeTruthy();

    expect(container.querySelector('.usa-sidenav')).toBeInTheDocument();
    expect(container.querySelector('.usa-current')).toBeInTheDocument();
  });
});
