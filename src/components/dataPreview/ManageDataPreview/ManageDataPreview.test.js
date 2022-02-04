import React from 'react';
import ManageDataPreview from './ManageDataPreview';
import { render, fireEvent, screen } from '@testing-library/react';
import configureStore from '../../../store/configureStore.dev';
import { Provider } from 'react-redux';
import initialState from '../../../store/reducers/initialState';
import { handleError } from '../../../utils/api/apiUtils';
import { rest } from 'msw';
import { setupServer } from 'msw/node';

jest.spyOn(window, 'alert').mockImplementation(() => {});
jest.spyOn(window, 'confirm').mockImplementation(() => {});
jest.mock('react-markdown', () => ({ children }) => <>{children}</>);
jest.mock('remark-gfm', () => () => {});

const helperTextUrl =
  'https://api.epa.gov/easey/dev/content-mgmt/campd/data/custom-data-download/helper-text.md';

const getHelperTextUrl = rest.get(helperTextUrl, (req, res, ctx) => {
  return res(ctx.json('this is CDD helper tex'));
});
const server = new setupServer(getHelperTextUrl);


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
describe('ManageDataPreview', () => {
  test('Check that the  component properly renders custom data download helper text', async () => {
    const { findByText, getByRole } = render(
      <Provider store={store}>
        <div id="filter0"></div>
        <ManageDataPreview />
      </Provider>
    );
    const helperText = await findByText('this is CDD helper tex');
    expect(helperText).toBeInTheDocument();
    const previewButton = getByRole('button', { name: 'Preview Data' });
    expect(previewButton).toBeDefined();
    fireEvent.click(previewButton);
  });
});
