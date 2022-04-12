import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TableMenu from './TableMenu';
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
const topic = { label: 'Unit ID', value: 'unitId' };
describe('table menu component', () => {
  test('renders main menu properly', () => {
    const { container } = render(
      <TableMenu
        topic={topic}
        fieldMappings={fieldMappings}
        setSortValue={jest.fn()}
        setSortDesc={jest.fn()}
        setSortAsc={jest.fn()}
        setUnsort={jest.fn()}
      />
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

  test('lists correct columns, apply button, and input field when customize column menu option is selected', () => {
    const { container } = render(
      <TableMenu
        topic={topic}
        fieldMappings={fieldMappings}
        setSortValue={jest.fn()}
        setSortDesc={jest.fn()}
        setSortAsc={jest.fn()}
        setUnsort={jest.fn()}
      />
    );
    const icons = container.querySelectorAll('#icon');
    fireEvent.click(icons[1]);
    const customizeColumnsMenuOption = getByText(/Customize Columns/i);
    fireEvent.click(customizeColumnsMenuOption);
    const yearColumnOption = getByText(/Year/i);
    expect(yearColumnOption).toBeInTheDocument();
    const input = getByText(/Find Column/i);
    expect(input).toBeInTheDocument();
    const applyButton = getByRole('button', { name: /apply/i });
    expect(applyButton).toBeInTheDocument();
  });
});
