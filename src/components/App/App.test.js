import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from 'react-router-dom';
import { Provider } from "react-redux";
import App from './App';
import configureStore from "../../store/configureStore.dev";
import config from "../../config";
import { rest } from "msw";
import { setupServer } from "msw/node";

const store = configureStore();
jest.mock('react-markdown', () => ({ children }) => <>{children}</>);
jest.mock('remark-gfm', () => () => {});


const submissionUrl = `${config.services.emissions.uri}/emissions/submission-progress?submissionPeriod`;
const getSubmissionProgress = rest.get(submissionUrl, (req, res, ctx) => {
  return res(ctx.json({year: 2022, quarterName: 'second', percentage: '30%'}))
})
const server = new setupServer(getSubmissionProgress)

beforeAll(() => server.listen());
beforeEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("Testing the main routing App component", () => {
  it("renders home page component provided with the default path", async () => {
    const { getByText } = render(
      <Provider store={store}>
        <MemoryRouter initialEntries={[`${config.app.path}/data/custom-data-download`]}>
            <App />
        </MemoryRouter>
      </Provider>
    );
    const textInHomePage = getByText("Custom Data Download");
    expect(textInHomePage).toBeInTheDocument();
  });
});
