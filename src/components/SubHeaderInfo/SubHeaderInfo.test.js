import React from 'react'
import SubHeaderInfo from './SubHeaderInfo'
import { render } from "@testing-library/react";
import { MemoryRouter } from 'react-router-dom';
import configureStore from '../../store/configureStore.dev';
import initialState from '../../store/reducers/initialState';
import { Provider } from 'react-redux';

let store = configureStore(initialState);

describe('Sub-header Info Component', () => {
  test("should render title without error", async () => {
    const {findByText} = render(
    <Provider store={store}>
      <MemoryRouter>
        <SubHeaderInfo setApiErrorDispatcher={jest.fn()} />
      </MemoryRouter>
    </Provider>);
    const header = await findByText(/Title text../i);
    expect(header).toBeInTheDocument();
  });
  // test("should render content without error", async () => {
  //   const {findByText} = render(
  //   <MemoryRouter>
  //     <SubHeaderInfo/>
  //   </MemoryRouter>);
  //   const content = await findByText('Content text..');
  //   expect(content).toBeInTheDocument();
  // });
});
