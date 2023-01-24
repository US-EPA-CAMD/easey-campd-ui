import React from 'react'
import Layout from "./Layout";
import { render, screen } from "@testing-library/react";
import { Route, Switch,BrowserRouter } from 'react-router-dom';
import configureStore from '../../store/configureStore.dev';
import { Provider } from 'react-redux';
import initialState from '../../store/reducers/initialState';
const store = configureStore(initialState);

const childComponent = () =>{
    return(<div>Welcome!</div>)
}

const mockUseLocationValue = {
  pathname: "/data/custom-data-download",
  search: '',
  hash: '',
  state: null
}
jest.mock('react-router', () => ({
  ...jest.requireActual("react-router"),
  useLocation: jest.fn().mockImplementation(() => {
      return mockUseLocationValue;
  })
}));

test("Layout renders a routed child component between header and footer", async () => {
    render(
        <Provider store={store}>
            <BrowserRouter>
                <Layout>
                    <Switch>
                        <Route path="/" exact component={childComponent} />
                    </Switch>
                </Layout>
            </BrowserRouter>
        </Provider>
    );
    const layoutContent = screen.getByText("Welcome!");
    expect(layoutContent).not.toBeUndefined();
});
