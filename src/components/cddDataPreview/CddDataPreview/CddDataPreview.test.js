import React from 'react';
import CddDataPreview from './CddDataPreview';
import { render, fireEvent, screen } from '@testing-library/react';
import configureStore from '../../../store/configureStore.dev';
import { Provider } from 'react-redux';
import initialState from '../../../store/reducers/initialState';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import config from '../../../config';

jest.spyOn(window, 'alert').mockImplementation(() => {});
jest.spyOn(window, 'confirm').mockImplementation(() => {});
jest.mock('react-markdown', () => ({ children }) => <>{children}</>);
jest.mock('remark-gfm', () => () => {});

const { findByText, getByRole, findByTestId, findByRole } = screen;
const helperTextUrl =
  `${config.services.content.uri}/campd/data/custom-data-download/helper-text.md`;
const limitTextUrl = `${config.services.content.uri}/campd/data/custom-data-download/download-limit-alert.md`;
const getHelperTextUrl = rest.get(helperTextUrl, (req, res, ctx) => {
  return res(ctx.json('this is CDD helper tex'));
});
const getLimitTextUrl = rest.get(limitTextUrl, (req, res, ctx) => {
  return res(ctx.json('this is CDD download limit'));
});
const bookmarkUrl = `${config.services.camd.uri}/bookmarks`;
const createBookmarkUrl = rest.post(bookmarkUrl, (req, res, ctx) => {
  return res(ctx.json({
    "bookmarkId": 1072,
    "bookmarkAddDate": "2022-05-23T12:56:45.587Z",
    "bookmarkLastAccessedDate": "2022-05-23T16:13:13.011Z",
    "bookmarkHitCount": 2
  }));
});

const server = new setupServer(getHelperTextUrl, getLimitTextUrl, createBookmarkUrl);


initialState.customDataDownload.dataType = 'EMISSIONS';
initialState.customDataDownload.dataSubType = 'Hourly Emissions';
initialState.customDataDownload.appliedFilters = [
  { key: 'Time Period', values: ['1/1/2019 - 1/1/2019'] },
];
initialState.filterCriteria.timePeriod = {
  startDate: '2019-01-01',
  endDate: '2019-01-01',
  opHrsOnly: false,
  year: {
    yearArray: [2019, 2020],
    yearString: '2019,2020',
  },
  comboBoxYear: [],
  month: [1, 3, 5],
  quarter: [],
};
initialState.customDataDownload.dataPreview = [
  {
    test: 'Some value',
    test2: 'Another value',
  },
  {
    test: 'Yet Some value',
    test2: 'Yet Another value',
  },
];
initialState.customDataDownload.totalCount = "50";
initialState.customDataDownload.fieldMappings = [{"label":"Test","value":"test"},{"label":"Test2","value":"test2"}];
let store = configureStore(initialState);
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


jest.spyOn(React, 'useRef').mockReturnValueOnce({ current: {scrollIntoView : jest.fn()} });
beforeAll(() => server.listen());
beforeEach(() => server.resetHandlers());
afterAll(() => server.close());
describe('CddDataPreview', () => {
  test('Check that the  component properly renders custom data download helper text', async () => {
    render(
      <Provider store={store}>
        <div id="filter0"></div>
        <CddDataPreview requirementsMet={true} totalCount={10000000} 
        renderPreviewData={{
        display: false,
        dataType: '',
        dataSubType: '',
        }}
        setRenderPreviewData={jest.fn()}
        />
      </Provider>
    );
    const helperText = await findByText('this is CDD helper tex');
    expect(helperText).toBeInTheDocument();
    const previewButton = getByRole('button', { name: 'Preview Data' });
    expect(previewButton).toBeDefined();
    fireEvent.click(previewButton);
  });
  test('Check bookmark funtionality works on cdd', async (done) => {
    render(
      <Provider store={store}>
        <div id="filter0"></div>
        <CddDataPreview requirementsMet={true} totalCount={50} 
        renderPreviewData={{
        display: false,
        dataType: '',
        dataSubType: '',
        }} 
        setRenderPreviewData={jest.fn()}
        />
      </Provider>
    );
  
    const bookmarkModal = await findByTestId("modalWindow");
    expect(bookmarkModal).toBeInTheDocument();
    expect(await findByText("Bookmark created")).toBeDefined();
    const modalCloser = await findByRole('button', {name : 'Ok'});
    expect(modalCloser).toBeDefined();
    fireEvent.click(modalCloser);
    done()
  }, 3000);
});
