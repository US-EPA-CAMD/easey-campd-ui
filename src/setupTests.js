// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom/extend-expect';
import { server } from './mocks/server';
import React from 'react';
global.XMLHttpRequest = undefined;

jest.mock('react-markdown', () => ({ children }) => <>{children}</>);
jest.mock('remark-gfm', () => () => {});
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
afterAll(() => server.close());
