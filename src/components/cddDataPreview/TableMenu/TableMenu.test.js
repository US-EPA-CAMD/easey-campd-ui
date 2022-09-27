import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

import TableMenu from './TableMenu';
import { Provider } from 'react-redux';
import configureStore from '../../../store/configureStore.dev';
import initialState from '../../../store/reducers/initialState';
import userEvent from '@testing-library/user-event';
const { getByText } = screen;
const fieldMappings = [
  {
    label: 'Year',
    value: 'year',
  },
  {
    label: 'Facility Name',
    value: 'facilityName',
  },
  {
    label: 'Facility ID',
    value: 'facilityId',
  },
  {
    label: 'Unit ID',
    value: 'unitId',
  },
  {
    label: 'Owner/Operator',
    value: 'ownerOperator',
  },
  {
    label: 'State',
    value: 'stateCode',
  },
  {
    label: 'Compliance Approach',
    value: 'complianceApproach',
  },
  {
    label: 'Averaging Plan ID',
    value: 'avgPlanId',
  },
  {
    label: 'Emissions Limit (lb/mmBtu)',
    value: 'emissionsLimitDisplay',
  },
  {
    label: 'Actual Emissions Rate (lb/mmBtu)',
    value: 'actualEmissionsRate',
  },
  {
    label: 'Averaging Plan Actual Rate (lb/mmBtu)',
    value: 'avgPlanActual',
  },
  {
    label: 'In Compliance?',
    value: 'inCompliance',
  },
];
initialState.customDataDownload.fieldMappings = fieldMappings;
const store = configureStore(initialState);

const topic = { label: 'Unit ID', value: 'unitId' };
describe('table menu component', () => {
  test('renders main menu properly', () => {
    render(
      <Provider store={store}>
        <TableMenu
          topic={topic}
          fieldMappings={fieldMappings}
          setSortValue={jest.fn()}
          setSortDesc={jest.fn()}
          setSortAsc={jest.fn()}
          setUnsort={jest.fn()}
        />
      </Provider>
    );

    const additionalOptionsIcon = screen.getByRole('button', {
      name: /additional options \- unit id/i,
    });
    expect(additionalOptionsIcon).toBeInTheDocument();
    fireEvent.click(additionalOptionsIcon);

    const unsortMenuOption = getByText(/unsort/i);
    const sortbyAscMenuOption = getByText(/sort by ASC/i);
    const sortbyDescMenuOption = getByText(/sort by DESC/i);
    const customizeColumnsMenuOption = getByText(/Customize Columns/i);

    expect(sortbyAscMenuOption).toBeInTheDocument();
    expect(sortbyDescMenuOption).toBeInTheDocument();
    expect(unsortMenuOption).toBeInTheDocument();
    expect(customizeColumnsMenuOption).toBeInTheDocument();
  });

  test('sort by ascending icon appears when items are sort by descending order', ()=>{
    render(
      <Provider store={store}>
        <TableMenu
          topic={topic}
          fieldMappings={fieldMappings}
          setSortValue={jest.fn()}
          setSortDesc={jest.fn()}
          setSortAsc={jest.fn()}
          setUnsort={jest.fn()}
        />
      </Provider>
    );

    const additionalOptionsIcon = screen.getByRole('button', {
      name: /additional options \- unit id/i,
    });
    fireEvent.click(additionalOptionsIcon);

    const sortbyDescMenuOption = getByText(/sort by DESC/i);
    fireEvent.click(sortbyDescMenuOption);
    const sortByDescIcon = screen.getByRole('button', {
      name: /sort by descending/i,
    });
    expect(sortByDescIcon).toBeInTheDocument()
  });

  test('sort by descending order icon changes to sort by ascending order icon when selected', ()=>{
    const {getByRole} = render(
      <Provider store={store}>
        <TableMenu
          topic={topic}
          fieldMappings={fieldMappings}
          setSortValue={jest.fn()}
          setSortDesc={jest.fn()}
          setSortAsc={jest.fn()}
          setUnsort={jest.fn()}
        />
      </Provider>
    );

    const tableHeader = getByText(/unit id/i);
    fireEvent.click(tableHeader);
    userEvent.tab();
    const sortByDescIcon = getByRole('button', {
      name: /sort by descending/i,
    });
    fireEvent.click(sortByDescIcon);
    const sortByAscIcon = getByRole('button', {
      name: /sort by ascending/i,
    });
    expect(sortByAscIcon).toBeInTheDocument();
  });
  test('lists correct columns, apply button, and input field when customize column menu option is selected', async () => {
    const { findByText, findByRole, getAllByText } = render(
      <Provider store={store}>
        <TableMenu
          topic={topic}
          fieldMappings={fieldMappings}
          setSortValue={jest.fn()}
          setSortDesc={jest.fn()}
          setSortAsc={jest.fn()}
          setUnsort={jest.fn()}
          filterCriteria={initialState.filterCriteria}
          setSelectedColumns={jest.fn()}
          selectedColumns={null}
          excludableColumns={fieldMappings}
          updateFilterCriteriaDispatcher={jest.fn()}
        />
      </Provider>
    );

    const additionalOptionsIcon = screen.getByRole('button', {
      name: /additional options \- unit id/i,
    });
    fireEvent.click(additionalOptionsIcon);
    const customizeColumnsMenuOption = getByText(/Customize Columns/i);
    fireEvent.click(customizeColumnsMenuOption);
    const yearColumnOption = getByText(/Year/i);
    const facilityNameColumnOption = getByText(/Facility Name/i);
    const unitIDColumnOption = getAllByText(/Unit ID/i)[0];
    const stateColumnOption = getByText(/State/i);
    expect(yearColumnOption).toBeInTheDocument();
    expect(facilityNameColumnOption).toBeInTheDocument();
    expect(unitIDColumnOption).toBeInTheDocument();
    expect(stateColumnOption).toBeInTheDocument();
    const input = await findByText(/Find Column/i);
    expect(input).toBeInTheDocument();
    const applyButton = await findByRole('button', { name: /apply/i });
    expect(applyButton).toBeInTheDocument();
  });

  test('All columns are checked initially', async () => {
    const { getAllByRole } = render(
      <Provider store={store}>
        <TableMenu
          topic={topic}
          fieldMappings={fieldMappings}
          setSortValue={jest.fn()}
          setSortDesc={jest.fn()}
          setSortAsc={jest.fn()}
          setUnsort={jest.fn()}
          filterCriteria={initialState.filterCriteria}
          setSelectedColumns={jest.fn()}
          selectedColumns={null}
          excludableColumns={fieldMappings}
          updateFilterCriteriaDispatcher={jest.fn()}
        />
      </Provider>
    );

    const additionalOptionsIcon = screen.getByRole('button', {
      name: /additional options \- unit id/i,
    });
    fireEvent.click(additionalOptionsIcon);
    const customizeColumnsMenuOption = getByText(/Customize Columns/i);
    fireEvent.click(customizeColumnsMenuOption);
    const checkboxes = getAllByRole('checkbox');

    checkboxes.forEach((checkbox) => expect(checkbox.checked).toBe(true));
  });

  test('Clicking on a selectable column unchecks it', async () => {
    const { getAllByRole } = render(
      <Provider store={store}>
        <TableMenu
          topic={topic}
          fieldMappings={fieldMappings}
          setSortValue={jest.fn()}
          setSortDesc={jest.fn()}
          setSortAsc={jest.fn()}
          setUnsort={jest.fn()}
          filterCriteria={initialState.filterCriteria}
          setSelectedColumns={jest.fn()}
          selectedColumns={null}
          excludableColumns={fieldMappings}
          updateFilterCriteriaDispatcher={jest.fn()}
        />
      </Provider>
    );

    const additionalOptionsIcon = screen.getByRole('button', {
      name: /additional options \- unit id/i,
    });
    fireEvent.click(additionalOptionsIcon);
    const customizeColumnsMenuOption = getByText(/Customize Columns/i);
    fireEvent.click(customizeColumnsMenuOption);
    const yearColumnOption = getAllByRole('checkbox')[0];
    fireEvent.click(yearColumnOption);

    expect(yearColumnOption.checked).toBe(false);
  });
  test('search filters down the columns', async () => {
    const { queryByText, getByRole } = render(
      <Provider store={store}>
        <TableMenu
          topic={topic}
          fieldMappings={fieldMappings}
          setSortValue={jest.fn()}
          setSortDesc={jest.fn()}
          setSortAsc={jest.fn()}
          setUnsort={jest.fn()}
          filterCriteria={initialState.filterCriteria}
          setSelectedColumns={jest.fn()}
          selectedColumns={null}
          excludableColumns={fieldMappings}
          updateFilterCriteriaDispatcher={jest.fn()}
        />
      </Provider>
    );
    const additionalOptionsIcon = screen.getByRole('button', {
      name: /additional options \- unit id/i,
    });
    fireEvent.click(additionalOptionsIcon);
    const customizeColumnsMenuOption = getByText(/Customize Columns/i);
    fireEvent.click(customizeColumnsMenuOption);

    const input = getByRole('searchbox');
    await userEvent.type(input, 'ye');
    const yearColumnOption = getByText(/Year/i);
    const facilityNameColumnOption = queryByText(/Facility Name/i);

    expect(yearColumnOption).toBeInTheDocument();
    expect(facilityNameColumnOption).toBeNull();
  });

  test('can navigate menu using the tab key', () => {
    const { getByText, getByRole } = render(
      <Provider store={store}>
        <TableMenu
          topic={topic}
          fieldMappings={fieldMappings}
          setSortValue={jest.fn()}
          setSortDesc={jest.fn()}
          setSortAsc={jest.fn()}
          setUnsort={jest.fn()}
          filterCriteria={initialState.filterCriteria}
          setSelectedColumns={jest.fn()}
          selectedColumns={null}
          excludableColumns={fieldMappings}
          updateFilterCriteriaDispatcher={jest.fn()}
        />
      </Provider>
    );
    const tableHeader = getByText(/unit id/i);
    fireEvent.click(tableHeader);
    userEvent.tab();
    const sortIcon = getByRole('button', {
      name: /sort by descending/i,
    });
    expect(sortIcon).toHaveFocus();
    userEvent.tab();
    const additionalOptionsIcon = screen.getByRole('button', {
      name: /additional options \- unit id/i,
    });
    expect(additionalOptionsIcon).toHaveFocus();
  });

  test('focus trap works on the menu', async () => {
    const { getByText, getAllByRole } = render(
      <Provider store={store}>
        <TableMenu
          topic={topic}
          fieldMappings={fieldMappings}
          setSortValue={jest.fn()}
          setSortDesc={jest.fn()}
          setSortAsc={jest.fn()}
          setUnsort={jest.fn()}
          filterCriteria={initialState.filterCriteria}
          setSelectedColumns={jest.fn()}
          selectedColumns={null}
          excludableColumns={fieldMappings}
          updateFilterCriteriaDispatcher={jest.fn()}
        />
      </Provider>
    );

    const additionalOptionsIcon = screen.getByRole('button', {
      name: /additional options \- unit id/i,
    });
    fireEvent.click(additionalOptionsIcon);
    const unsortMenuOption = getByText(/unsort/i);
    expect(unsortMenuOption).toHaveFocus();
    userEvent.tab();
    userEvent.tab();
    userEvent.tab();
    userEvent.tab();
    const buttons = getAllByRole('button');
    expect(buttons[0]).toHaveFocus();
  });
});

test('it autofocuses to the input field when column menu is opened', async () => {
  const { getByText, getByTestId } = render(
    <Provider store={store}>
      <TableMenu
        topic={topic}
        fieldMappings={fieldMappings}
        setSortValue={jest.fn()}
        setSortDesc={jest.fn()}
        setSortAsc={jest.fn()}
        setUnsort={jest.fn()}
        filterCriteria={initialState.filterCriteria}
        setSelectedColumns={jest.fn()}
        selectedColumns={null}
        excludableColumns={fieldMappings}
        updateFilterCriteriaDispatcher={jest.fn()}
      />
    </Provider>
  );

  const additionalOptionsIcon = screen.getByRole('button', {
    name: /additional options \- unit id/i,
  });
  fireEvent.click(additionalOptionsIcon);
  const customizeColumnsMenuOption = getByText(/Customize Columns/i);
  fireEvent.click(customizeColumnsMenuOption);
  const input = getByTestId(/textInput/i);
  expect(input).toHaveFocus();
});
