import React from 'react';
import CddDataPreview from './CddDataPreview';
import { render, fireEvent, screen } from '@testing-library/react';
import configureStore from '../../../store/configureStore.dev';
import { Provider } from 'react-redux';
import initialState from '../../../store/reducers/initialState';
import { handleError } from '../../../utils/api/apiUtils';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import config from '../../../config';

jest.spyOn(window, 'alert').mockImplementation(() => {});
jest.spyOn(window, 'confirm').mockImplementation(() => {});
jest.mock('react-markdown', () => ({ children }) => <>{children}</>);
jest.mock('remark-gfm', () => () => {});

const { findByText, getByRole } = screen;
const helperTextUrl =
  `${config.services.content.uri}/campd/data/custom-data-download/helper-text.md`;
const limitTextUrl = `${config.services.content.uri}/campd/data/custom-data-download/download-limit-alert.md`;
const getHelperTextUrl = rest.get(helperTextUrl, (req, res, ctx) => {
  return res(ctx.json('this is CDD helper tex'));
});
const getLimitTextUrl = rest.get(limitTextUrl, (req, res, ctx) => {
  return res(ctx.json('this is CDD download limit'));
});
const server = new setupServer(getHelperTextUrl, getLimitTextUrl);


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
let store = configureStore(initialState);

beforeAll(() => server.listen());
beforeEach(() => server.resetHandlers());
afterAll(() => server.close());
describe('CddDataPreview', () => {
  test('Check that the  component properly renders custom data download helper text', async () => {
    render(
      <Provider store={store}>
        <div id="filter0"></div>
        <CddDataPreview requirementsMet={true} totalCount={10000000} />
      </Provider>
    );
    const helperText = await findByText('this is CDD helper tex');
    expect(helperText).toBeInTheDocument();
    const previewButton = getByRole('button', { name: 'Preview Data' });
    expect(previewButton).toBeDefined();
    fireEvent.click(previewButton);
  });
});
