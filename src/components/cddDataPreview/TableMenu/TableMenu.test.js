import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TableMenu from './TableMenu';
import { Provider } from 'react-redux';
import configureStore from '../../../store/configureStore.dev';
import initialState from '../../../store/reducers/initialState';
import userEvent from '@testing-library/user-event';
const { getByText, getByRole } = screen;
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
    const { container } = render(
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

    const icons = container.querySelectorAll('#icon');
    expect(icons.length).toEqual(2);
    fireEvent.click(icons[1]);

    const unsortMenuOption = getByText(/unsort/i);
    const sortbyAscMenuOption = getByText(/sort by ASC/i);
    const sortbyDescMenuOption = getByText(/sort by DESC/i);
    const customizeColumnsMenuOption = getByText(/Customize Columns/i);

    expect(sortbyAscMenuOption).toBeInTheDocument();
    expect(sortbyDescMenuOption).toBeInTheDocument();
    expect(unsortMenuOption).toBeInTheDocument();
    expect(customizeColumnsMenuOption).toBeInTheDocument();
  });

  test('lists correct columns, apply button, and input field when customize column menu option is selected', async () => {
    const { container, findByText, findByRole, getAllByText } = render(
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

    const icons = container.querySelectorAll('#icon');
    fireEvent.click(icons[1]);
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
    const input = await findByText (/Find Column/i);
    expect(input).toBeInTheDocument();
    const applyButton = await findByRole('button', { name: /apply/i });
    expect(applyButton).toBeInTheDocument();
  });

  test('All columns are checked initially', async () => {
    const { container, getAllByRole} = render(
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

    const icons = container.querySelectorAll('#icon');
    fireEvent.click(icons[1]);
    const customizeColumnsMenuOption = getByText(/Customize Columns/i);
    fireEvent.click(customizeColumnsMenuOption);
    const checkboxes = getAllByRole('checkbox')

    checkboxes.forEach(checkbox => expect(checkbox.checked).toBe(true));    
  });


  test('Clicking on a selectable column unchecks it', async () => {
    const { container, getAllByRole, debug} = render(
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

    const icons = container.querySelectorAll('#icon');
    fireEvent.click(icons[1]);
    const customizeColumnsMenuOption = getByText(/Customize Columns/i);
    fireEvent.click(customizeColumnsMenuOption);
    const yearColumnOption = getAllByRole('checkbox')[0];
    fireEvent.click(yearColumnOption);

    expect(yearColumnOption.checked).toBe(false);
  });
  test('search filters down the columns', async () => {
    const { container, queryByText, getByRole } = render(
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
    const icons = container.querySelectorAll('#icon');
    fireEvent.click(icons[1]);
    const customizeColumnsMenuOption = getByText(/Customize Columns/i)
    fireEvent.click(customizeColumnsMenuOption);

    const input = getByRole('searchbox')
    await userEvent.type(input, 'ye')
    const yearColumnOption = getByText(/Year/i);
    const facilityNameColumnOption = queryByText(/Facility Name/i);

    expect(yearColumnOption).toBeInTheDocument();
    expect(facilityNameColumnOption).toBeNull()
  });
  
});
