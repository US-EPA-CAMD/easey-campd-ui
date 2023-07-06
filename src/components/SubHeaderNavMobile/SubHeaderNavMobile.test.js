import React from 'react';
import SubHeaderNavMobile from './SubHeaderNavMobile';
import {
  subHeaderMenuList,
} from '../../utils/constants/menuTopics';
import render from '../../mocks/render';
import {
  screen
} from '@testing-library/react';

describe('- SubHeaderNavMobile -', () => {
  test('renders without errors', () => {
    render(
      <SubHeaderNavMobile
        showMobileMenu={true}
        subHeaderMenuList={subHeaderMenuList}
        subHeaderUtilityList={[]}
        pathname="/data"
      />
    );
    expect(screen.getByText('HOME')).toBeInTheDocument();
    expect(screen.getByText('DATA')).toBeInTheDocument();
    expect(screen.getByText('VIZ GALLERY')).toBeInTheDocument();
    expect(screen.getByText('HELP/SUPPORT')).toBeInTheDocument();
  });
});
