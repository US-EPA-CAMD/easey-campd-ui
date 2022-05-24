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
        ' Found an unhandled %s request to %s',
        req.method,
        req.url.href
      );
    },
  })
);
beforeEach(() => server.resetHandlers());
afterAll(() => server.close());
