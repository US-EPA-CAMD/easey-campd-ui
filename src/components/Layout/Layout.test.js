import React from 'react'
import Layout from "./Layout";
import { render, screen } from "@testing-library/react";
import { Route, Switch,BrowserRouter } from 'react-router-dom';
import configureStore from '../../store/configureStore.dev';
import { Provider } from 'react-redux';
import initialState from '../../store/reducers/initialState';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import config from '../../config';
const store = configureStore(initialState);

const childComponent = () =>{
    return(<div>Welcome!</div>)
}

jest.mock('react-markdown', () => ({ children }) => <>{children}</>);
jest.mock('react-markdown-v4', () => ({ children }) => <>{children}</>);
jest.mock('remark-gfm', () => () => {});
jest.mock('remark-sub-super', () => () => {});

const titleUrl =
  `${config.services.content.uri}/campd/home/main-title.md`;
const contentUrl =
  `${config.services.content.uri}/campd/home/main-content.md`;
const getTitle = rest.get(titleUrl, (req, res, ctx) => {
  return res(ctx.json('Title text..'));
});
const getContent = rest.get(contentUrl, (req, res, ctx) => {
  return res(ctx.json('Content text..'));
});
const submissionUrl =
  `${config.services.emissions.uri}/emissions/submission-progress?submissionPeriod`;
const getSubmissionProgress = rest.get(submissionUrl, (req, res, ctx) => {
  return res(ctx.json({year: 2022, quarterName: 'second', percentage: '30%'}))
})
const server = new setupServer(getTitle, getContent, getSubmissionProgress);
beforeAll(() => server.listen());
beforeEach(() => server.resetHandlers());
afterAll(() => server.close());

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
