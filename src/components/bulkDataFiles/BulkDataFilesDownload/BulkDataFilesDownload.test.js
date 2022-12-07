import React from 'react';
import { render, screen } from '@testing-library/react';
import BulkDataFilesDownload from './BulkDataFilesDownload';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';
import initialState from '../../../store/reducers/initialState';
import configureStore from '../../../store/configureStore.dev';
import userEvent from '@testing-library/user-event';
const { getByRole, getByText } = screen;

jest.mock('downloadjs', ()=>{})
let store = configureStore(initialState);

const selectedFiles = {
  allSelected: false,
  selectedCount: 2,
  selectedRows: [
    {
      filename: 'compliance-txso2.csv',
      s3Path: 'compliance/compliance-txso2.csv',
      bytes: 6145,
      kiloBytes: 6,
      megaBytes: 0,
      gigaBytes: 0,
      lastUpdated: '2022-03-06T20:33:45Z',
      description: 'Texas SO2 Trading Program Annual Reconciliation Data',
      metadata: {},
      id: 7,
    },
    {
      filename: 'compliance-csso2g1.csv',
      s3Path: 'compliance/compliance-csso2g1.csv',
      bytes: 691083,
      kiloBytes: 674,
      megaBytes: 0,
      gigaBytes: 0,
      lastUpdated: '2022-03-06T20:33:45Z',
      description:
        'Cross-State Air Pollution Rule SO2 Annual Program Group 1 Annual Reconciliation Data',
      metadata: {},
      id: 6,
    },
  ],
};
const overLimitFiles = Object.assign(
  {},
  selectedFiles,
  (selectedFiles.selectedRows = [
    ...selectedFiles.selectedRows,
    {
      filename: 'compliance-txso2.csv',
      s3Path: 'compliance/compliance-txso2.csv',
      bytes: 0,
      kiloBytes: 6,
      megaBytes: 0,
      gigaBytes: 6145,
      lastUpdated: '2022-03-06T20:33:45Z',
      description: 'Texas SO2 Trading Program Annual Reconciliation Data',
      metadata: {},
      id: 7,
    },
  ])
);
const singleSelectedFile = Object.assign({}, selectedFiles, [
  selectedFiles.selectedRows[0],
]);
describe('Bulk data files download component functionality', () => {
  test('renders component properly', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <BulkDataFilesDownload
            selectedFiles={{}}
            setApiErrorDispatcher={jest.fn()}
            limitReached={false}
            fileSize={0}
          />
        </MemoryRouter>
      </Provider>
    );
    const downloadButton = getByRole('button', {
      name: /download/i,
    });
    const fileSize = getByText(/size:/i);
    const filesSelected = getByText(/files selected:/i)
    expect(filesSelected).toBeInTheDocument();
    expect(fileSize).toBeInTheDocument();
    expect(downloadButton).toBeInTheDocument();
  })
  test('download button should be disabled if no files are selected', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <BulkDataFilesDownload
            selectedFiles={{}}
            setApiErrorDispatcher={jest.fn()}
            limitReached={false}
            fileSize={0}
          />
        </MemoryRouter>
      </Provider>
    );

    const downloadButton = getByRole('button', {
      name: /download/i,
    });
    expect(downloadButton).toBeDisabled();
  });

  test('download button should be enabled if files are selected', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <BulkDataFilesDownload
            selectedFiles={selectedFiles}
            limitReached={false}
            fileSize={'697.23 KB'}
            setApiErrorDispatcher={jest.fn()}
          />
        </MemoryRouter>
      </Provider>
    );

    const downloadButton = getByRole('button', {
      name: /download/i,
    });
    expect(downloadButton).not.toBeDisabled();
  });

  test('download button should be disabled if file size exceeds limit', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <BulkDataFilesDownload
            selectedFiles={overLimitFiles}
            limitReached={true}
            fileSize={'697.23 GB'}
            setApiErrorDispatcher={jest.fn()}
          />
        </MemoryRouter>
      </Provider>
    );

    const downloadButton = getByRole('button', {
      name: /download/i,
    });
    expect(downloadButton).toBeDisabled();
  });

  test('should update file size when files are selected', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <BulkDataFilesDownload
            selectedFiles={singleSelectedFile}
            limitReached={true}
            fileSize={'6145 bytes'}
            setApiErrorDispatcher={jest.fn()}
          />
        </MemoryRouter>
      </Provider>
    );
    const fileSize = getByText(/size: 6145 bytes/i);
    expect(fileSize).toBeInTheDocument();
  });

  test('should download files', () => {
    const setApiError = jest.fn();
    render(
      <Provider store={store}>
        <MemoryRouter>
          <BulkDataFilesDownload
            selectedFiles={singleSelectedFile}
            limitReached={false}
            fileSize={'6145 bytes'}
            setApiErrorDispatcher={setApiError}
          />
        </MemoryRouter>
      </Provider>
    );
    const downloadButton = getByRole('button', {
      name: /download/i,
    });
    expect(downloadButton).not.toBeDisabled();
    userEvent.click(downloadButton)
    expect(setApiError).not.toHaveBeenCalled()
  });
});
