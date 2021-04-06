import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { TimePeriod } from './TimePeriod';

const initTimePeriod = {
    startDate: null,
    endDate: null,
    opHrsOnly: true
}

const timePeriod = {
  startDate: "03/31/2021",
  endDate: "04/02/2021",
  opHrsOnly: true
}

describe('Emissions TimePeriod Component', () => {
  it('renders form elements without errors', () => {
    const { getByTestId, getAllByTestId, getByRole } = render(
      <TimePeriod
        timePeriod={initTimePeriod}
        updateTimePeriodDispatcher={jest.fn()}
      />
    );

    const dateRangePicker = getByTestId('date-range-picker')
    expect(dateRangePicker).toBeInTheDocument()
    expect(dateRangePicker).toHaveClass('usa-date-range-picker')

    const datePickers = getAllByTestId('date-picker')
    expect(datePickers).toHaveLength(2)

    const checkbox = getByRole('checkbox', {checked:true})
    expect(checkbox).toBeInTheDocument()

    const buttons = getAllByTestId('button')
    expect(buttons).toHaveLength(2)
  });

  it('handles interactions appropriately', ()=>{
    let updatedTimePeriod;
    const dispather = (formState) =>{
      updatedTimePeriod = formState;
    };
    const { getByText, getByRole } = render(
      <TimePeriod
        timePeriod={timePeriod}
        updateTimePeriodDispatcher={dispather}
      />
    );
    const checkbox = getByRole('checkbox', {checked:true})
    fireEvent.click(checkbox)
    const applyFilterButton = getByText("Apply Filter").closest('button')
    expect(applyFilterButton).not.toBeDisabled();
    fireEvent.click(applyFilterButton)
    expect(updatedTimePeriod.startDate).toBe("03/31/2021")
    expect(updatedTimePeriod.opHrsOnly).toBe(false)
  });
});
