import React from 'react';
import ManageDataPreview from './ManageDataPreview';
import { render, fireEvent } from '@testing-library/react';
import configureStore from '../../../store/configureStore.dev';
import { Provider } from 'react-redux';
import initialState from '../../../store/reducers/initialState';

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
    yearArray: [2019,2020],
    yearString: '2019,2020',
  },
  month: [1,3,5],
  quarter: [],
};
let store = configureStore(initialState);

describe('ManageDataPreview', () => {
  test('Check that the  component properly renders', () => {
    const { getByRole, getByText } = render(
      <Provider store={store}>
        <ManageDataPreview dataType="EMISSIONS" />
      </Provider>
    );
    const previewButton = getByRole('button', { name: 'Preview Data' });
    expect(previewButton).toBeDefined();
    fireEvent.click(previewButton);
    const dataPreviewHeader = getByText('Data Preview');
    expect(dataPreviewHeader).toBeDefined();
  });

  test('Daily Emissions', () => {
    initialState.customDataDownload.dataSubType = 'Daily Emissions';
    store = configureStore(initialState);
    const { getByRole, getByText } = render(
      <Provider store={store}>
        <ManageDataPreview dataType="EMISSIONS" />
      </Provider>
    );
    const previewButton = getByRole('button', { name: 'Preview Data' });
    expect(previewButton).toBeDefined();
    fireEvent.click(previewButton);
    const dataPreviewHeader = getByText('Data Preview');
    expect(dataPreviewHeader).toBeDefined();
  });

  test('Monthly Emissions', () => {
    initialState.customDataDownload.dataSubType = 'Monthly Emissions';
    store = configureStore(initialState);
    const { getByRole, getByText } = render(
      <Provider store={store}>
        <ManageDataPreview dataType="EMISSIONS" />
      </Provider>
    );
    const previewButton = getByRole('button', { name: 'Preview Data' });
    expect(previewButton).toBeDefined();
    fireEvent.click(previewButton);
    const dataPreviewHeader = getByText('Data Preview');
    expect(dataPreviewHeader).toBeDefined();
  });

  test('Quarterly Emissions', () => {
    initialState.customDataDownload.dataSubType = 'Quarterly Emissions';
    store = configureStore(initialState);
    const { getByRole, getByText } = render(
      <Provider store={store}>
        <ManageDataPreview dataType="EMISSIONS" />
      </Provider>
    );
    const previewButton = getByRole('button', { name: 'Preview Data' });
    expect(previewButton).toBeDefined();
    fireEvent.click(previewButton);
    const dataPreviewHeader = getByText('Data Preview');
    expect(dataPreviewHeader).toBeDefined();
  });

  test('Annual Emissions', () => {
    initialState.customDataDownload.dataSubType = 'Annual Emissions';
    store = configureStore(initialState);
    const { getByRole, getByText } = render(
      <Provider store={store}>
        <ManageDataPreview dataType="EMISSIONS" />
      </Provider>
    );
    const previewButton = getByRole('button', { name: 'Preview Data' });
    expect(previewButton).toBeDefined();
    fireEvent.click(previewButton);
    const dataPreviewHeader = getByText('Data Preview');
    expect(dataPreviewHeader).toBeDefined();
  });

  test('Ozone Emissions', () => {
    initialState.customDataDownload.dataSubType = 'Ozone Season Emissions';
    store = configureStore(initialState);
    const { getByRole, getByText } = render(
      <Provider store={store}>
        <ManageDataPreview dataType="EMISSIONS" />
      </Provider>
    );
    const previewButton = getByRole('button', { name: 'Preview Data' });
    expect(previewButton).toBeDefined();
    fireEvent.click(previewButton);
    const dataPreviewHeader = getByText('Data Preview');
    expect(dataPreviewHeader).toBeDefined();
  });
});
