import React from 'react'
import Layout from "./Layout";
import { render, screen } from "@testing-library/react";
import { Route, Switch,BrowserRouter } from 'react-router-dom';
import configureStore from '../../store/configureStore.dev';
import { Provider } from 'react-redux';
import initialState from '../../store/reducers/initialState';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
const store = configureStore(initialState);

const childComponent = () =>{
    return(<div>Welcome!</div>)
}

jest.mock('react-markdown', () => ({ children }) => <>{children}</>);
jest.mock('react-markdown-v4', () => ({ children }) => <>{children}</>);
jest.mock('remark-gfm', () => () => {});
jest.mock('remark-sub-super', () => () => {});

const titleUrl =
  'https://api.epa.gov/easey/dev/content-mgmt/campd/home/main-title.md';
const contentUrl =
  'https://api.epa.gov/easey/dev/content-mgmt/campd/home/main-content.md';
const getTitle = rest.get(titleUrl, (req, res, ctx) => {
  return res(ctx.json('Title text..'));
});
const getContent = rest.get(contentUrl, (req, res, ctx) => {
  return res(ctx.json('Content text..'));
});
const server = new setupServer(getTitle, getContent);
beforeAll(() => server.listen());
beforeEach(() => server.resetHandlers());
afterAll(() => server.close());

test("Layout renders a routed child component between header and footer", () => {
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
