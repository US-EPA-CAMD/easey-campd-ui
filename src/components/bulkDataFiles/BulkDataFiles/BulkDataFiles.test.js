import React from 'react';
import { render, fireEvent, cleanup, waitForElement, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

import configureStore from '../../../store/configureStore.dev';
import BulkDataFiles from './BulkDataFiles';
import initialState from '../../../store/reducers/initialState';
import { dataTable } from '../../../utils/constants/bulkDataFilesTestData';

initialState.bulkDataFiles.dataTable = dataTable;
let store = configureStore(initialState);
jest.setTimeout(30000);

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => ({
    push: jest.fn(),
  }),
}));
/*****
 */
describe('Manage Bulk Data Files component: ',  () => {
  afterEach(cleanup)
  beforeEach(() => {
    initialState.bulkDataFiles.dataTable = dataTable;
    store = configureStore(initialState);
  });
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

  test('download button is enabled after files are selected', async() => {
    const { getByRole, findAllByRole } = render(
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
    const checkbox = await findAllByRole('checkbox')
    fireEvent.click(checkbox[1])
    const downloadButton = getByRole('button', {
      name: /download/i
    });
    expect(downloadButton).not.toBeDisabled();
  });

  test('number of files is updated when files are added or removed', async() => {
    const { getByText, findAllByRole } = render(
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
    const checkboxes = await findAllByRole('checkbox')

    const checkbox1 = checkboxes[1]
    const checkbox2 = checkboxes[2]
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
  const { findAllByRole, getByText } = render(
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
  const checkbox = await findAllByRole('checkbox')
  fireEvent.click(checkbox[1])
  fireEvent.click(checkbox[1])
  const updatedFileSize= getByText(/size:/i)
  expect(updatedFileSize).toBeInTheDocument();
});

test('file size is reset when filters are cleared', async () => {
  const { findAllByRole, getByText, getAllByText } = render(
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
  const checkbox = await findAllByRole('checkbox')
  fireEvent.click(checkbox[1])
  const clearAllButton = getAllByText(/clear all/i)[0];
  fireEvent.click(clearAllButton);
  const updatedFileSize= getByText(/size:/i)
  expect(updatedFileSize).toBeInTheDocument()
});

// test('file size is reset when selected data type is changed', async () => {
//   window.confirm = jest.fn(() => true)
//   const { getByText, findByTestId, findAllByRole } = render(
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
//   const dataTypeFilter = await findByTestId('dataType-select');
//   fireEvent.change(dataTypeFilter, { target: { value: "Emissions" } });
//   const checkbox = await findAllByRole('checkbox')
//   fireEvent.click(checkbox[0])
//   fireEvent.change(dataTypeFilter, { target: { value: "EDR" } });
//   const updatedFileSize= getByText(/size:/i)
//   expect(updatedFileSize).toBeInTheDocument()
// });

test('file size is not reset when year filter is changed', async () => {
  window.confirm = jest.fn(() => true)
  const { getByText, findByTestId, findAllByRole } = render(
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
  const dataTypeFilter = await findByTestId('dataType-select');
  fireEvent.change(dataTypeFilter, { target: { value: "Emissions" } });
  const checkbox = await findAllByRole('checkbox')
  fireEvent.click(checkbox[0])
  const subTypeFilter = await findByTestId('subtype-select');
  fireEvent.change(subTypeFilter, { target: { value: "Hourly" } });
  const updatedFileSize= getByText(/size: 4.04 gb/i)
  expect(updatedFileSize).toBeInTheDocument()
});

test('download button is disabled if file size exceeds download limit', async () => {
  const {findByRole, findAllByRole} = render(
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
  const checkbox = await findAllByRole('checkbox')
  const allFiles = checkbox[0]
  fireEvent.click(allFiles);
  expect(findByRole('button', {
    name: /download/i
  })).resolves.toBeDisabled();
});

// test('Alert pops up when file size exceeds download limit', async() => {
//   const {findByText,findByRole} = render(
//     <Provider store={store}>
//       <MemoryRouter>
//         <BulkDataFiles
//           loadBulkDataFilesDispatcher= {jest.fn()}
//           updateBulkDataFilesDispacher={jest.fn()}
//           dataTable={dataTable}
//         />
//       </MemoryRouter>
//     </Provider>
//   )

//   const allFiles = await findByRole('checkbox', {
//     name: /select-all-rows/i
//   })
//   await fireEvent.click(allFiles);
//   await waitFor(() => findByText(/download limit alert/i))
//   const alert = await findByText(/download limit alert/i);
//   expect(alert).toBeInTheDocument();

// });

test('Alert  is removed when limit is no longer exceeded', async() => {
  const {findByRole, queryByText} =render(
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
  fireEvent.click(allFiles);
  const alert = queryByText(/download limit alert/i);
  expect(alert).toBeNull()
});
});
