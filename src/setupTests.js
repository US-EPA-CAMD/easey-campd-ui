// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom/extend-expect';
import { server } from './mocks/server';
import React from 'react';
import { cleanup } from '@testing-library/react';
global.XMLHttpRequest = undefined;

jest.mock('react-markdown', () => ({ children }) => <>{children}</>);
jest.mock('remark-gfm', () => () => {});
jest.mock('rehype-raw', () => ({
  parse: () => {
    return {
      content: "This is raw HTML."
    };
  }
}));
jest.mock('rehype-sanitize', () => ({
  parse: () => {
    return {
      content: "This is sanitized HTML."
    };
  }
}));
jest.mock('remark-sub-super', () => () => {});
jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useLocation: jest.fn().mockImplementation(() => ({
    pathname: '/data/custom-data-download',
    search: '',
    hash: '',
    state: null,
  })),
}));

beforeAll(() =>
  server.listen({
    onUnhandledRequest(req) {
      console.warn(
        "\u001b[1;45m Found an unhandled request to " + 
        req.url + "\u001b[0m"
      );
    },
  })
);
beforeEach(() => {
  jest.resetModules();
  server.resetHandlers();
});
afterEach(cleanup)
afterAll(() => server.close());
