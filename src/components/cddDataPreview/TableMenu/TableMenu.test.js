import React from 'react';
import { render, screen } from '@testing-library/react';
import { cloneDeep } from 'lodash';

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
let initStateCopy = cloneDeep(initialState)
initStateCopy.customDataDownload.fieldMappings = fieldMappings;
let store = configureStore(initStateCopy);

const topic = { label: 'Unit ID', value: 'unitId' };
describe('table menu component', () => {
  beforeEach(() => {
    const stateCopy = cloneDeep(initStateCopy);
    stateCopy.customDataDownload.fieldMappings = fieldMappings;
    initStateCopy = stateCopy;
    store = configureStore(initStateCopy);
  })
  test('renders main menu properly', async () => {
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
    await userEvent.click(additionalOptionsIcon);

    const unsortMenuOption = getByText(/unsort/i);
    const sortbyAscMenuOption = getByText(/sort by ASC/i);
    const sortbyDescMenuOption = getByText(/sort by DESC/i);
    const customizeColumnsMenuOption = getByText(/Customize Columns/i);

    expect(sortbyAscMenuOption).toBeInTheDocument();
    expect(sortbyDescMenuOption).toBeInTheDocument();
    expect(unsortMenuOption).toBeInTheDocument();
    expect(customizeColumnsMenuOption).toBeInTheDocument();
  });

  test('sort by ascending icon appears when items are sort by descending order', async ()=>{
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
    await userEvent.click(additionalOptionsIcon);

    const sortbyDescMenuOption = getByText(/sort by DESC/i);
    await userEvent.click(sortbyDescMenuOption);
    const sortByDescIcon = screen.getByRole('button', {
      name: /sort by descending/i,
    });
    expect(sortByDescIcon).toBeInTheDocument()
  });

  test('sort by descending order icon changes to sort by ascending order icon when selected', async ()=>{
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
    await userEvent.click(tableHeader);
    await userEvent.tab();
    const sortByDescIcon = getByRole('button', {
      name: /sort by descending/i,
    });
    await userEvent.click(sortByDescIcon);
    const sortByAscIcon = getByRole('button', {
      name: /sort by ascending/i,
    });
    expect(sortByAscIcon).toBeInTheDocument();
  });

  test('unsort function is executed when unsort option is selected', async ()=>{
    const unsortFunction = jest.fn();
    render(
      <Provider store={store}>
        <TableMenu
          topic={topic}
          fieldMappings={fieldMappings}
          setSortValue={jest.fn()}
          setSortDesc={jest.fn()}
          setSortAsc={jest.fn()}
          setUnsort={unsortFunction}
        />
      </Provider>
    );

    const tableHeader = getByText(/unit id/i);
    await userEvent.click(tableHeader);
    await userEvent.tab();
    const additionalOptionsIcon = screen.getByRole('button', {
      name: /additional options \- unit id/i,
    });
    await userEvent.click(additionalOptionsIcon);

    const unsortMenuOption = getByText(/unsort/i);
    await userEvent.click(unsortMenuOption);
    expect(unsortFunction).toHaveBeenCalled();
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
          filterCriteria={initStateCopy.filterCriteria}
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
    await userEvent.click(additionalOptionsIcon);
    const customizeColumnsMenuOption = getByText(/Customize Columns/i);
    await userEvent.click(customizeColumnsMenuOption);
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
          filterCriteria={initStateCopy.filterCriteria}
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
    await userEvent.click(additionalOptionsIcon);
    const customizeColumnsMenuOption = getByText(/Customize Columns/i);
    await userEvent.click(customizeColumnsMenuOption);
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
          filterCriteria={initStateCopy.filterCriteria}
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
    await userEvent.click(additionalOptionsIcon);
    const customizeColumnsMenuOption = getByText(/Customize Columns/i);
    await userEvent.click(customizeColumnsMenuOption);
    const yearColumnOption = getAllByRole('checkbox')[0];
    await userEvent.click(yearColumnOption);

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
          filterCriteria={initStateCopy.filterCriteria}
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
    await userEvent.click(additionalOptionsIcon);
    const customizeColumnsMenuOption = getByText(/Customize Columns/i);
    await userEvent.click(customizeColumnsMenuOption);

    const input = getByRole('searchbox');
    await await userEvent.type(input, 'ye');
    const yearColumnOption = getByText(/Year/i);
    const facilityNameColumnOption = queryByText(/Facility Name/i);

    expect(yearColumnOption).toBeInTheDocument();
    expect(facilityNameColumnOption).toBeNull();
  });

  // test('can navigate menu using the tab key', () => {
  //   const { getByText, getByRole } = render(
  //     <Provider store={store}>
  //       <TableMenu
  //         topic={topic}
  //         fieldMappings={fieldMappings}
  //         setSortValue={jest.fn()}
  //         setSortDesc={jest.fn()}
  //         setSortAsc={jest.fn()}
  //         setUnsort={jest.fn()}
  //         filterCriteria={initStateCopy.filterCriteria}
  //         setSelectedColumns={jest.fn()}
  //         selectedColumns={null}
  //         excludableColumns={fieldMappings}
  //         updateFilterCriteriaDispatcher={jest.fn()}
  //       />
  //     </Provider>
  //   );
  //   const tableHeader = getByText(/unit id/i);
  //   await userEvent.click(tableHeader);
  //   await userEvent.tab();
  //   const sortIcon = getByRole('button', {
  //     name: /sort by descending/i,
  //   });
  //   expect(sortIcon).toHaveFocus();
  //   await userEvent.tab();
  //   const additionalOptionsIcon = screen.getByRole('button', {
  //     name: /additional options \- unit id/i,
  //   });
  //   expect(additionalOptionsIcon).toHaveFocus();
  // });

  // test('focus trap works on the menu', async () => {
  //   const { getByText, getAllByRole } = render(
  //     <Provider store={store}>
  //       <TableMenu
  //         topic={topic}
  //         fieldMappings={fieldMappings}
  //         setSortValue={jest.fn()}
  //         setSortDesc={jest.fn()}
  //         setSortAsc={jest.fn()}
  //         setUnsort={jest.fn()}
  //         filterCriteria={initStateCopy.filterCriteria}
  //         setSelectedColumns={jest.fn()}
  //         selectedColumns={null}
  //         excludableColumns={fieldMappings}
  //         updateFilterCriteriaDispatcher={jest.fn()}
  //       />
  //     </Provider>
  //   );

  //   const additionalOptionsIcon = screen.getByRole('button', {
  //     name: /additional options \- unit id/i,
  //   });
  //   await userEvent.click(additionalOptionsIcon);
  //   const unsortMenuOption = getByText(/unsort/i);
  //   expect(unsortMenuOption).toHaveFocus();
  //   await userEvent.tab();
  //   await userEvent.tab();
  //   await userEvent.tab();
  //   await userEvent.tab();
  //   const buttons = getAllByRole('button');
  //   expect(buttons[0]).toHaveFocus();
  // });

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
          filterCriteria={initStateCopy.filterCriteria}
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
    await userEvent.click(additionalOptionsIcon);
    const customizeColumnsMenuOption = getByText(/Customize Columns/i);
    await userEvent.click(customizeColumnsMenuOption);
    const input = getByTestId(/textInput/i);
    expect(input).toHaveFocus();
  });

  test('can deselect all', async () => {
    const { getAllByRole } = render(
      <Provider store={store}>
        <TableMenu
          topic={topic}
          fieldMappings={fieldMappings}
          setSortValue={jest.fn()}
          setSortDesc={jest.fn()}
          setSortAsc={jest.fn()}
          setUnsort={jest.fn()}
          filterCriteria={initStateCopy.filterCriteria}
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
    await userEvent.click(additionalOptionsIcon);
    const customizeColumnsMenuOption = getByText(/Customize Columns/i);
    await userEvent.click(customizeColumnsMenuOption);
    const deselectAllColumns = getByText(/Deselect All/i);
    await userEvent.click(deselectAllColumns);
    const checkboxes = getAllByRole('checkbox');
    checkboxes.forEach((checkbox) => expect(checkbox.checked).not.toBe(true));
  });

  test('can select all', async () => {
    const { getAllByRole } = render(
      <Provider store={store}>
        <TableMenu
          topic={topic}
          fieldMappings={fieldMappings}
          setSortValue={jest.fn()}
          setSortDesc={jest.fn()}
          setSortAsc={jest.fn()}
          setUnsort={jest.fn()}
          filterCriteria={initStateCopy.filterCriteria}
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
    await userEvent.click(additionalOptionsIcon);
    const customizeColumnsMenuOption = getByText(/Customize Columns/i);
    await userEvent.click(customizeColumnsMenuOption);
    const deselectAllColumns = getByText(/Deselect All/i);
    await userEvent.click(deselectAllColumns);
    const checkboxes = getAllByRole('checkbox');
    checkboxes.forEach((checkbox) => expect(checkbox.checked).not.toBe(true));
    const selectAllColumns = getByText(/Select All/);
    await userEvent.click(selectAllColumns);
    checkboxes.forEach((checkbox) => expect(checkbox.checked).toBe(true));
  });

  test('apply button updates selected columns', async () => {
    const setSelectedColumns = jest.fn();
    const setFocusAfterApply = jest.fn();
    const { getByRole } = render(
      <Provider store={store}>
        <TableMenu
          topic={topic}
          fieldMappings={fieldMappings}
          setSortValue={jest.fn()}
          setSortDesc={jest.fn()}
          setSortAsc={jest.fn()}
          setUnsort={jest.fn()}
          filterCriteria={initStateCopy.filterCriteria}
          setSelectedColumns={setSelectedColumns}
          selectedColumns={null}
          excludableColumns={fieldMappings}
          updateFilterCriteriaDispatcher={jest.fn()}
          setFocusAfterApply={setFocusAfterApply}
        />
      </Provider>
    );

    const additionalOptionsIcon = screen.getByRole('button', {
      name: /additional options \- unit id/i,
    });
    await userEvent.click(additionalOptionsIcon);
    const customizeColumnsMenuOption = getByText(/Customize Columns/i);
    await userEvent.click(customizeColumnsMenuOption);
    const deselectAllColumns = getByText(/Deselect All/i);
    await userEvent.click(deselectAllColumns);
    const applyButton = getByRole('button', { name: /apply/i})
    await userEvent.click(applyButton);
    expect(setSelectedColumns).toHaveBeenCalled();
    expect(setFocusAfterApply).toHaveBeenCalled();
  });
});