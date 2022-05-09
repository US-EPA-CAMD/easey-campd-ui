import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import BulkDataFilesDownload from './BulkDataFilesDownload';
const { getByRole } = screen;

jest.mock('react-markdown', () => ({ children }) => <>{children}</>);
jest.mock('remark-gfm', () => () => {});
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

describe('Bulk data files download component functionality', () => {
  test('download button should be disabled if no files are selected', () => {
    render(
      <BulkDataFilesDownload
        selectedFiles={{}}
        limitReached={false}
        fileSize={0}
      />
    );

    const downloadButton = getByRole('button', {
      name: /download/i,
    });
    expect(downloadButton).toBeDisabled();
  });

  test('download button should be enabled if files are selected', () => {
    render(
      <BulkDataFilesDownload
        selectedFiles={selectedFiles}
        limitReached={false}
        fileSize={'697.23 KB'}
      />
    );

    const downloadButton = getByRole('button', {
      name: /download/i,
    });
    expect(downloadButton).not.toBeDisabled();
  });
});
