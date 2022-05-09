import React from 'react'
import DataLandingPage from './DataLandingPage';
import { render } from "@testing-library/react";
import { MemoryRouter } from 'react-router-dom';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import config from '../../config';

jest.mock('react-markdown', () => ({ children }) => <>{children}</>);
jest.mock('remark-gfm', () => () => {});

const contentUrl =
  `${config.services.content.uri}/campd/data/home/index.json`;
const headerUrl =
  `${config.services.content.uri}/campd/data/home/header.md`;

const homeContent = [
  {
    "name": "Custom Data Download Tool",
    "imgPath": "/images/icons/cdd-icon.svg",
    "imgAlt": "Custom Data Download Tool Icon",
    "description": "Users looking to build a custom query for a particular type of data will find this tool flexible, fast, and easy to use. Apportioned emissions, allowance, compliance and facility/unit attributes data are available for filtering and querying to the user’s desired parameters.",
    "url": "/data/custom-data-download",
    "button": "Query Data"
  },
  {
    "name": "Bulk Data Files",
    "imgPath": "/images/icons/bdf-icon.svg",
    "imgAlt": "Bulk Data Files Icon",
    "description": "Use a simple browser interface to access large, prepackaged datasets of facility submission files (I.e., emissions, monitoring plans, QA), apportioned emissions (including MATS), allowance, compliance, and facility data. Users of the SMOKE modeling tool will find the quarterly apportioned hourly emissions files useful for their analyses.",
    "url": "/data/bulk-data-files",
    "button": "Download Data Files"
  },
  {
    "name": "APIs",
    "imgPath": "/images/icons/api-icon.svg",
    "imgAlt": "APIs Icon",
    "description": "CAMPD uses web services to display data via an Application Programming Interface (API). An API is a set of commands, functions, protocols, and objects that programmers can use to create software or interact with an external system. An API interprets that data and presents you with the information you wanted in a readable way. These services and associated documentation provide an additional means of accessing CAMPD’s data.",
    "url": "https://www.epa.gov/airmarkets/cam-api-portal",
    "externalLink": true,
    "button": "Browse CAMPD APIs"
  }
];

const getContent = rest.get(contentUrl, (req, res, ctx) => {
  return res(ctx.json(homeContent));
});
const getHeader = rest.get(headerUrl, (req, res, ctx) => {
  return res(ctx.json('Data Access Methods'));
});

const server = new setupServer(getContent, getHeader);
beforeAll(() => server.listen());
beforeEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('Data Landing Page Component', () => {
    test("should render content without error", async () => {
      const {findByText, findAllByRole} = render(<MemoryRouter><DataLandingPage/></MemoryRouter>);
      const links = await findAllByRole("link");
      const header = await findByText("Data Access Methods");
      expect(header).toBeDefined();
      const cdd = await findByText("Custom Data Download Tool");
      expect(cdd).toBeDefined();
      const bdf = await findByText("Bulk Data Files");
      expect(bdf).toBeDefined();
      const apis = await findByText("APIs");
      expect(apis).toBeDefined();
      expect(links.length).toBe(3);
    });
    // test("clicking filter links updates product query params", () => {
    //   let testHistory, testLocation;
    //   const {getByRole} =render(
    //     <MemoryRouter initialEntries={["/data"]}>
    //       <App />
    //       <Route
    //         path="*"
    //         render={({ history, location }) => {
    //           //testHistory = history;
    //           testLocation = location;
    //           return null;
    //         }}
    //       />
    //     </MemoryRouter>
    //   );
    //   expect(testLocation.pathname).toBe("/data");
    //   act(() => {
    //     fireEvent.click(getByRole("button", {name: "Start your data query"}));
    //   });
    //   expect(testLocation.pathname).toBe("/select-data-type");
    // });
});
