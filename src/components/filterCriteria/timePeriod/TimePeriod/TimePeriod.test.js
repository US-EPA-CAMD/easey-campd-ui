import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { TimePeriod } from './TimePeriod';
import userEvent from '@testing-library/user-event';
import * as DateValidations from '../../../../utils/dateValidation/dateValidation';

describe('Emissions TimePeriod Component', () => {
  /* -- TimePeriodFullDates -- */
  it('renders form elements without errors', () => {
    const initTimePeriod = {
      startDate: null,
      endDate: null,
      opHrsOnly: true,
    };
    const { getByTestId, getAllByTestId, getByRole } = render(
      <TimePeriod
        dataType="EMISSIONS"
        timePeriod={initTimePeriod}
        updateTimePeriodDispatcher={jest.fn()}
        removeAppliedFiltersDispatcher={jest.fn()}
        closeFlyOutHandler={jest.fn()}
        renderedHandler={jest.fn()}
      />
    );

    const dateRangePicker = getByTestId('date-range-picker');
    expect(dateRangePicker).toBeInTheDocument();
    expect(dateRangePicker).toHaveClass('usa-date-range-picker');

    const datePickers = getAllByTestId('date-picker');
    expect(datePickers).toHaveLength(2);

    const checkbox = getByRole('checkbox', { checked: true });
    expect(checkbox).toBeInTheDocument();

    const buttons = getAllByTestId('button');
    expect(buttons).toHaveLength(2);
  });

  it('handles interactions appropriately', () => {
    let updatedTimePeriod;
    const dispatcher = (formState) => {
      updatedTimePeriod = formState;
    };
    const timePeriod = {
      startDate: '2019-01-01',
      endDate: '2019-01-01',
      opHrsOnly: true,
    };
    const { getByText, getByRole } = render(
      <TimePeriod
        dataType="EMISSIONS"
        timePeriod={timePeriod}
        updateTimePeriodDispatcher={dispatcher}
        addAppliedFilterDispatcher={jest.fn()}
        removeAppliedFiltersDispatcher={jest.fn()}
        appliedFilters={['timePeriod']}
        closeFlyOutHandler={jest.fn()}
        renderedHandler={jest.fn()}
      />
    );
    const checkbox = getByRole('checkbox', { checked: true });
    fireEvent.click(checkbox);
    const applyFilterButton = getByText('Apply Filter').closest('button');
    expect(applyFilterButton).not.toBeDisabled();
    fireEvent.click(applyFilterButton);
    expect(updatedTimePeriod.startDate).toBe(timePeriod.startDate);
    expect(updatedTimePeriod.opHrsOnly).toBe(false);
  });

  /* -- TimePeriodYear -- */

  it('handles YEAR interactions appropriately', () => {
    let updatedTimePeriod;
    const dispatcher = (formState) => {
      updatedTimePeriod = formState;
    };
    const timePeriod = {
      startDate: null,
      endDate: null,
      opHrsOnly: true,
      year: { yearString: '2019,2020', yearArray: [2019, 2020] },
      month: [],
      quarter: [],
    };
    const { getByText, getByTestId } = render(
      <TimePeriod 
        dataType="EMISSIONS"
        timePeriod={timePeriod}
        updateTimePeriodDispatcher={dispatcher}
        addAppliedFilterDispatcher={jest.fn()}
        removeAppliedFiltersDispatcher={jest.fn()}
        appliedFilters={['timePeriod']}
        closeFlyOutHandler={jest.fn()}
        showYear={true}
        isAnnual={true}
        renderedHandler={jest.fn()}
      />
    );
    const textBox = getByTestId('textInput');
    userEvent.type(textBox, '2019,2020');
    const applyFilterButton = getByText('Apply Filter').closest('button');
    expect(applyFilterButton).not.toBeDisabled();
    fireEvent.click(applyFilterButton);
    expect(updatedTimePeriod.year.yearString).toBe(timePeriod.year.yearString);
  });

  it('handles MONTH interactions appropriately', () => {
    let updatedTimePeriod;
    const dispatcher = (formState) => {
      updatedTimePeriod = formState;
    };
    const timePeriod = {
      startDate: null,
      endDate: null,
      opHrsOnly: true,
      year: { yearString: '2019,2020', yearArray: [2019, 2020] },
      month: [{ id: 1, label: 'January', selected: false }],
      quarter: [],
    };
    const { getByText, getByTestId, getByLabelText } = render(
      <TimePeriod
        dataType="EMISSIONS"
        timePeriod={timePeriod}
        updateTimePeriodDispatcher={dispatcher}
        addAppliedFilterDispatcher={jest.fn()}
        removeAppliedFiltersDispatcher={jest.fn()}
        appliedFilters={['timePeriod']}
        closeFlyOutHandler={jest.fn()}
        showYear={true}
        showMonth={true}
        renderedHandler={jest.fn()}
      />
    );
    const textBox = getByTestId('textInput');
    userEvent.type(textBox, '2019,2020');
    const checkbox = getByLabelText('January');
    fireEvent.click(checkbox);
    const applyFilterButton = getByText('Apply Filter').closest('button');
    expect(applyFilterButton).not.toBeDisabled();
    fireEvent.click(applyFilterButton);
    expect(updatedTimePeriod.year.yearString).toBe(timePeriod.year.yearString);
    expect(updatedTimePeriod.month[0].selected).toBe(true);
  });

  it('handles QUARTER interactions appropriately', () => {
    let updatedTimePeriod;
    const dispatcher = (formState) => {
      updatedTimePeriod = formState;
    };
    const timePeriod = {
      startDate: null,
      endDate: null,
      opHrsOnly: true,
      year: { yearString: '2019,2020', yearArray: [2019, 2020] },
      month: [],
      quarter: [{ id: 1, label: 'Q1', selected: false }],
    };
    const { getByText, getByTestId, getByLabelText } = render(
      <TimePeriod
        dataType="EMISSIONS"
        timePeriod={timePeriod}
        updateTimePeriodDispatcher={dispatcher}
        addAppliedFilterDispatcher={jest.fn()}
        removeAppliedFiltersDispatcher={jest.fn()}
        appliedFilters={['timePeriod']}
        closeFlyOutHandler={jest.fn()}
        showYear={true}
        showQuarter={true}
        renderedHandler={jest.fn()}
      />
    );
    const textBox = getByTestId('textInput');
    userEvent.type(textBox, '2019,2020');
    const checkbox = getByLabelText('Q1');
    fireEvent.click(checkbox);
    const applyFilterButton = getByText('Apply Filter').closest('button');
    expect(applyFilterButton).not.toBeDisabled();
    fireEvent.click(applyFilterButton);
    expect(updatedTimePeriod.year.yearString).toBe(timePeriod.year.yearString);
    expect(updatedTimePeriod.quarter[0].selected).toBe(true);
  });

  it('handles VINTAGE YEAR interactions appropriately', () => {
    let updatedTimePeriod;
    const dispatcher = (formState) => {
      updatedTimePeriod = formState;
    };
    const timePeriod = {
      startDate: null,
      endDate: null,
      opHrsOnly: true,
      year: { yearString: '2019-2020', yearArray: [2019, 2020] },
      month: [],
      quarter: [],
    };
    const { getByText, getByTestId } = render(
      <TimePeriod
        dataType="EMISSIONS"
        timePeriod={timePeriod}
        updateTimePeriodDispatcher={dispatcher}
        addAppliedFilterDispatcher={jest.fn()}
        removeAppliedFiltersDispatcher={jest.fn()}
        appliedFilters={['vintageYear']}
        closeFlyOutHandler={jest.fn()}
        showYear={true}
        isAllowance={true}
        renderedHandler={jest.fn()}
      />
    );
    const textBox = getByTestId('textInput');
    userEvent.type(textBox, '2019-2020');
    const applyFilterButton = getByText('Apply Filter').closest('button');
    expect(applyFilterButton).not.toBeDisabled();
    fireEvent.click(applyFilterButton);
    expect(updatedTimePeriod.year.yearString).toBe(timePeriod.year.yearString);
  });

  it('YEAR validations', () => {
    const timePeriod = {
      startDate: null,
      endDate: null,
      opHrsOnly: true,
      year: { yearString: '', yearArray: [] },
      month: [],
      quarter: [],
    };
    const { getByText, getByTestId } = render(
      <TimePeriod
        timePeriod={timePeriod}
        updateTimePeriodDispatcher={jest.fn()}
        addAppliedFilterDispatcher={jest.fn()}
        removeAppliedFiltersDispatcher={jest.fn()}
        appliedFilters={['vintageYear']}
        closeFlyOutHandler={jest.fn()}
        showYear={true}
        isAllowance={true}
        renderedHandler={jest.fn()}
      />
    );
    const textBox = getByTestId('textInput');

    userEvent.type(textBox, '2019x,2020');
    const applyFilterButton = getByText('Apply Filter').closest('button');
    fireEvent.click(applyFilterButton);
    expect(applyFilterButton).not.toBeDisabled();

    userEvent.type(textBox, '2019-2000,2020');
    fireEvent.click(applyFilterButton);
    expect(applyFilterButton).not.toBeDisabled();
  });

  it('dateValidations isInValidReportingQuarter', () => {
    let fakeDate = new Date(2019, 1, 1);
    let spy = jest.spyOn(global, 'Date').mockImplementation(() => fakeDate);
    expect(
      DateValidations.isInValidReportingQuarter('2019', 1995, [1], [3, 6, 9])
    ).toBe(false);

    spy.mockRestore();
  });
});
