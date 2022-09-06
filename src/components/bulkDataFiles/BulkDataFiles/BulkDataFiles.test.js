import React from 'react';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

import configureStore from '../../../store/configureStore.dev';
import BulkDataFiles from './BulkDataFiles';
import initialState from '../../../store/reducers/initialState';
import { dataTable } from '../../../utils/constants/bulkDataFilesTestData';

initialState.bulkDataFiles.dataTable = dataTable;
let store = configureStore(initialState);

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: jest.fn(),
  }),
}));

/*****
 */
describe('Manage Bulk Data Files component: ',  () => {
  afterEach(cleanup)
  test('download button is disabled when no files are selected', () => {
    const { getByRole } = render(
      <Provider store={store}>
        <MemoryRouter>
          <BulkDataFiles
            loadBulkDataFilesDispatcher= {jest.fn()}
            updateBulkDataFilesDispacher={jest.fn()}
          />
        </MemoryRouter>
      </Provider>
    );
    const downloadButton = getByRole('button', {
      name: /download/i
    });
    expect(downloadButton).toBeDisabled();
  });

  test('download button is enabled after files are selected', () => {
    const { getByRole } = render(
      <Provider store={store}>
        <MemoryRouter>
          <BulkDataFiles
            loadBulkDataFilesDispatcher= {jest.fn()}
            updateBulkDataFilesDispacher={jest.fn()}
            dataTable={dataTable}
          />
        </MemoryRouter>
      </Provider>
    );
    const checkbox = getByRole('checkbox', {
      name: /select-row-4/i
    })
    fireEvent.click(checkbox);
    const downloadButton = getByRole('button', {
      name: /download/i
    });
    expect(downloadButton).not.toBeDisabled();
  });

  test('number of files is updated when files are added or removed', () => {
    const { getByRole, getByText } = render(
      <Provider store={store}>
        <MemoryRouter>
          <BulkDataFiles
            loadBulkDataFilesDispatcher= {jest.fn()}
            updateBulkDataFilesDispacher={jest.fn()}
            dataTable={dataTable}
          />
        </MemoryRouter>
      </Provider>
    );
    const checkbox1 = getByRole('checkbox', {
      name: /select-row-4/i
    });
    const checkbox2 = getByRole('checkbox', {
      name: /select-row-5/i
    })
    fireEvent.click(checkbox1);
    const fileCount= getByText(/files selected: 1/i)
    expect(fileCount).toBeInTheDocument();
    fireEvent.click(checkbox2);
    const updatedFileCount= getByText(/files selected: 2/i)
    expect(updatedFileCount).toBeInTheDocument();
    fireEvent.click(checkbox2);
    expect(fileCount).toBeInTheDocument();
  });


test('sections render without errors', async () => {
  const query = render(
    <Provider store={store}>
      <MemoryRouter>
        <BulkDataFiles
          loadBulkDataFilesDispatcher= {jest.fn()}
          updateBulkDataFilesDispacher={jest.fn()}
          dataTable={dataTable}
        />
      </MemoryRouter>
    </Provider>
  );
  const { findByText, getByRole, getAllByRole} = query;
  const header = await findByText('Bulk Data Files');
  expect(header).toBeInTheDocument();
  expect(getByRole("table")).toBeDefined();
  expect(getAllByRole("columnheader").length).toBe(4);
  expect(getAllByRole("row").length).toBe(initialState.bulkDataFiles.dataTable.length-1);
});


test('file size is updated when files are added or removed', async () => {
  const { findByRole, getByText } = render(
    <Provider store={store}>
      <MemoryRouter>
        <BulkDataFiles
          loadBulkDataFilesDispatcher= {jest.fn()}
          updateBulkDataFilesDispacher={jest.fn()}
          dataTable={dataTable}
        />
      </MemoryRouter>
    </Provider>
  );
  const checkbox = await findByRole('checkbox', {
    name: /select-row-4/i
  })
  fireEvent.click(checkbox);
  fireEvent.click(checkbox);
  const updatedFileSize= getByText(/size:/i)
  expect(updatedFileSize).toBeInTheDocument();
});

test('file size is reset when filters are cleared', async () => {
  const { findByRole, getByText, getAllByText } = render(
    <Provider store={store}>
      <MemoryRouter>
        <BulkDataFiles
          loadBulkDataFilesDispatcher= {jest.fn()}
          updateBulkDataFilesDispacher={jest.fn()}
          dataTable={dataTable}
        />
      </MemoryRouter>
    </Provider>
  );
  const checkbox = await findByRole('checkbox', {
    name: /select-row-4/i
  })
  fireEvent.click(checkbox)
  const clearAllButton = getAllByText(/clear all/i)[0];
  fireEvent.click(clearAllButton);
  const updatedFileSize= getByText(/size:/i)
  expect(updatedFileSize).toBeInTheDocument()
});

test('download button is disabled if file size exceeds download limit', async () => {
  const {findByRole} = render(
    <Provider store={store}>
      <MemoryRouter>
        <BulkDataFiles
          loadBulkDataFilesDispatcher= {jest.fn()}
          updateBulkDataFilesDispacher={jest.fn()}
          dataTable={dataTable}
        />
      </MemoryRouter>
    </Provider>
  );
  const allFiles = await findByRole('checkbox', {
    name: /select-all-rows/i
  })
  fireEvent.click(allFiles);
  expect(findByRole('button', {
    name: /download/i
  })).resolves.toBeDisabled();
});

// test('Alert pops up when file size exceeds download limit and is removed when limit is no longer exceeded', async() => {
//   const {findByText,findByRole, queryByText} =render(
//     <Provider store={store}>
//       <MemoryRouter>
//         <BulkDataFiles
//           loadBulkDataFilesDispatcher= {jest.fn()}
//           updateBulkDataFilesDispacher={jest.fn()}
//           dataTable={dataTable}
//         />
//       </MemoryRouter>
//     </Provider>
//   );

//   const allFiles = await findByRole('checkbox', {
//     name: /select-all-rows/i
//   })
//   fireEvent.click(allFiles);
//   const alert = await findByText(/download limit alert/i)
//   expect(alert).toBeInTheDocument();
//   fireEvent.click(allFiles);
//   expect(queryByText(/download limit alert/i)).toBeNull()
// });
});
