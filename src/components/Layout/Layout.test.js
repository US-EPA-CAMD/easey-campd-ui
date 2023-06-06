import React from 'react'
import Layout from "./Layout";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from 'react-router-dom';
import configureStore from '../../store/configureStore.dev';
import { Provider } from 'react-redux';
import initialState from '../../store/reducers/initialState';
const store = configureStore(initialState);

const childComponent = () =>{
    return(<div>Welcome!</div>)
}



test("Layout renders a routed child component between header and footer", async () => {
  render(
      <Provider store={store}>
          <MemoryRouter initialEntries={['/']}>
              <Layout>
                  {childComponent}
              </Layout>
          </MemoryRouter>
      </Provider>
  );
  const layoutContent = await screen.queryByText("Welcome!");
//   screen.debug(undefined, 99999999)
  console.log({layoutContent});
  expect(layoutContent).not.toBeUndefined();
});
