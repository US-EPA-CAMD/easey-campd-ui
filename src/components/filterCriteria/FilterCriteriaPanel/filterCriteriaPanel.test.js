import React from 'react';
import { render } from '@testing-library/react';
import FilterCriteriaPanel from "./FilterCriteriaPanel";
import { Provider } from "react-redux";
import configureStore from "../../../store/configureStore.dev";
import initialState from '../../../store/reducers/initialState';
import { cloneDeep } from 'lodash';
const initStateCopy = cloneDeep(initialState)
initStateCopy.customDataDownload.dataType="EMISSIONS";
const store = configureStore(initStateCopy);

describe('filterCriteriaPanel Component', () => {
  it('renders time period child component without errors', () => {
    // const { getByTestId, getAllByTestId, getByRole } = render(
    //   <Provider store={store}>
    //     <FilterCriteriaPanel
    //       show={true}
    //       selectedDataSubtype="Hourly Emissions"
    //       selectedFilter="timePeriod"
    //       closeFlyOutHandler={jest.fn()}
    //       applyFilterLoading={false}
    //       setApplyFilterLoading={jest.fn()}
    //       />
    //   </Provider>
    // );

    // const dateRangePicker = getByTestId('date-range-picker')
    // expect(dateRangePicker).toBeInTheDocument()
    // expect(dateRangePicker).toHaveClass('usa-date-range-picker')

    // const datePickers = getAllByTestId('date-picker')
    // expect(datePickers).toHaveLength(2)

    // const checkbox = getByRole('checkbox', {checked:true})
    // expect(checkbox).toBeInTheDocument()

    // const buttons = getAllByTestId('button')
    // expect(buttons).toHaveLength(2)
  });
});
