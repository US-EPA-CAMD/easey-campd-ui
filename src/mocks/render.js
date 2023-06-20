import { render as rtlRender } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router";

const render = (component, store, routerProps={}) =>
  store
    ? rtlRender(
        <Provider store={store}>
          <MemoryRouter {...routerProps}> {component}</MemoryRouter>
        </Provider>
      )
    : rtlRender(<MemoryRouter {...routerProps}> {component}</MemoryRouter>);

export default render;
