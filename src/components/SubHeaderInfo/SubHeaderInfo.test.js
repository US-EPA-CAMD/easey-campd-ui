
import React from 'react'
import SubHeaderInfo from './SubHeaderInfo'
import configureStore from '../../store/configureStore.dev';
import initialState from '../../store/reducers/initialState';
import render from '../../mocks/render';
import { cloneDeep } from 'lodash';
import {
  screen
} from '@testing-library/react';

const initStateCopy = cloneDeep(initialState)
let store = configureStore(initStateCopy);

describe('- Sub-header Info Component -', () => {
  test("should render content without error", async () => {
    render(
      <SubHeaderInfo/>, store
    );
    const titleText = await screen.findByText(/Title text../i);
    expect(titleText).toBeInTheDocument();
    const contentText = await screen.findByText(/Content text../i);
    expect(contentText).toBeInTheDocument();
  });
});