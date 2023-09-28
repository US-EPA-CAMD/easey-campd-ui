import React from 'react';
import {
  screen,
} from '@testing-library/react';
import TutorialsPage from './TutorialsPage';
import configureStore from '../../store/configureStore.dev';
import initialState from '../../store/reducers/initialState';
import render from '../../mocks/render';

let store = configureStore(initialState);
const topics = ['Quick Start Guides', 'Data Guides', 'Other'];

describe('- Tutorials Page Component -', () => {
  it('should render content without error', async () => {
    render(
      <TutorialsPage/>, store
    );
    const aboutHeading = await screen.findByText('this is campd');
    expect(aboutHeading).toBeInTheDocument();

    topics.forEach(async (element) => {
      const container = await screen.findByText(`${element}:`);
      expect(container).toBeTruthy();
    });
  });
});