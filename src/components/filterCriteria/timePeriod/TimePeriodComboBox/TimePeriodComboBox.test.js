import React from 'react';
import { cleanup, fireEvent, render, within } from '@testing-library/react';
import { Provider } from 'react-redux';

import configureStore from '../../../../store/configureStore.dev';
import initialState from '../../../../store/reducers/initialState';
import TimePeriodComboBox from './TimePeriodComboBox';

const filterMapping = [
  {
    "vintageYear": "1995",
    "programCode": "ARP",
    "accountNumber": "000000000030",
    "accountTypeCode": "RESERVE",
    "facilityId": null,
    "stateCode": null,
    "ownerOperator": null
  },
  {
    "vintageYear": "1995",
    "programCode": "ARP",
    "accountNumber": "000000000031",
    "accountTypeCode": "RESERVE",
    "facilityId": null,
    "stateCode": null,
    "ownerOperator": null
  },
  {
    "vintageYear": "1995",
    "programCode": "ARP",
    "accountNumber": "000000000032",
    "accountTypeCode": "RESERVE",
    "facilityId": null,
    "stateCode": null,
    "ownerOperator": null
  },
  {
    "vintageYear": "1995",
    "programCode": "ARP",
    "accountNumber": "000000000033",
    "accountTypeCode": "RESERVE",
    "facilityId": null,
    "stateCode": null,
    "ownerOperator": null
  },
  {
    "vintageYear": "1996",
    "programCode": "ARP",
    "accountNumber": "000000000034",
    "accountTypeCode": "RESERVE",
    "facilityId": null,
    "stateCode": null,
    "ownerOperator": null
  },
  {
    "vintageYear": "1995",
    "programCode": "ARP",
    "accountNumber": "000000000039",
    "accountTypeCode": "RESERVE",
    "facilityId": null,
    "stateCode": null,
    "ownerOperator": null
  },
  {
    "vintageYear": "1998",
    "programCode": "ARP",
    "accountNumber": "000000000043",
    "accountTypeCode": "ENFSURR",
    "facilityId": null,
    "stateCode": null,
    "ownerOperator": null
  },
  {
    "vintageYear": "1995",
    "programCode": "ARP",
    "accountNumber": "000054FACLTY",
    "accountTypeCode": "FACLTY",
    "facilityId": 54,
    "stateCode": "KY",
    "ownerOperator": "East Kentucky Power Cooperative"
  },
  {
    "vintageYear": "1995",
    "programCode": "ARP",
    "accountNumber": "002330FACLTY",
    "accountTypeCode": "FACLTY",
    "facilityId": 2330,
    "stateCode": "NV",
    "ownerOperator": "Sierra Pacific Power Company"
  },
  {
    "vintageYear": "1996",
    "programCode": "ARP",
    "accountNumber": "002336FACLTY",
    "accountTypeCode": "FACLTY",
    "facilityId": 2336,
    "stateCode": "NV",
    "ownerOperator": "Sierra Pacific Power Company"
  },
  {
    "vintageYear": "1995",
    "programCode": "ARP",
    "accountNumber": "004050FACLTY",
    "accountTypeCode": "FACLTY",
    "facilityId": 4050,
    "stateCode": "WI",
    "ownerOperator": "Wisconsin Power & Light Company"
  },
  {
    "vintageYear": "1995",
    "programCode": "ARP",
    "accountNumber": "006213FACLTY",
    "accountTypeCode": "FACLTY",
    "facilityId": 6213,
    "stateCode": "IN",
    "ownerOperator": "Hoosier Energy REC, Inc."
  },
  {
    "vintageYear": "1995",
    "programCode": "ARP",
    "accountNumber": "007335FACLTY",
    "accountTypeCode": "FACLTY",
    "facilityId": 7335,
    "stateCode": "IN",
    "ownerOperator": "Indiana Municipal Power Agency"
  },
  {
    "vintageYear": "1995",
    "programCode": "ARP",
    "accountNumber": "007336FACLTY",
    "accountTypeCode": "FACLTY",
    "facilityId": 7336,
    "stateCode": "IN",
    "ownerOperator": "Indiana Municipal Power Agency"
  },
  {
    "vintageYear": "1998",
    "programCode": "ARP",
    "accountNumber": "007782FACLTY",
    "accountTypeCode": "FACLTY",
    "facilityId": 7782,
    "stateCode": "OH",
    "ownerOperator": "American Municipal Power - Ohio"
  },
  {
    "vintageYear": "1995",
    "programCode": "ARP",
    "accountNumber": "007783FACLTY",
    "accountTypeCode": "FACLTY",
    "facilityId": 7783,
    "stateCode": "OH",
    "ownerOperator": "American Municipal Power - Ohio"
  },
  {
    "vintageYear": "1996",
    "programCode": "ARP",
    "accountNumber": "007829FACLTY",
    "accountTypeCode": "FACLTY",
    "facilityId": 7829,
    "stateCode": "GA",
    "ownerOperator": "Oglethorpe Power Corporation"
  }
];
const distinctYears = [...new Set(filterMapping.map(e=>e.vintageYear))];
initialState.filterCriteria.timePeriod.comboBoxYear = distinctYears.map(year => {return {id:year, label:year, selected:false, enabled:true}});
const store = configureStore(initialState);
let flyOutClosed = false;
let applyFilterLoading = false;

describe('Account Name/Number Component', () => {
  let query;
  beforeEach(() => {
    query = render(
      <Provider store={store}>
        <TimePeriodComboBox
          updateTimePeriodDispatcher={jest.fn()}
          addAppliedFilterDispatcher={jest.fn()}
          removeAppliedFilterDispatcher={jest.fn()}
          closeFlyOutHandler={() => (flyOutClosed = true)}
          renderedHandler={jest.fn()}
          filterToApply="Vintage Year"
          setApplyFilterLoading={() => applyFilterLoading = true}
        />
      </Provider>
    );
  });

  afterEach(cleanup);

  it('renders all elements properely', () => {
    const { getByTestId, getByText } = query;
    expect(getByText('Vintage Year')).toBeInTheDocument();
    const searchbox = getByTestId('input-search');
    expect(searchbox).toBeInTheDocument();
    searchbox.focus();
    fireEvent.click(searchbox);
    const listBox = getByTestId('multi-select-listbox');
    expect(listBox).toBeInTheDocument();
    expect(within(listBox).getAllByTestId('multi-select-option').length).toBe(
      initialState.filterCriteria.timePeriod.comboBoxYear.length
    );
  });

  it('handles click event of cancel button', () => {
    const { getByText } = query;
    fireEvent.click(getByText('Cancel'));
    expect(flyOutClosed).toBe(true);
  });

  test('It should search using input box for vintage years in listboxt', () => {
    const { getByTestId, getAllByTestId, getByRole, getByText } = query;
    const searchbox = getByTestId('input-search');
    searchbox.focus();
    fireEvent.click(searchbox);
    fireEvent.change(searchbox, { target: { value: '1998' } });
    expect(searchbox.value).toBe('1998');
    expect(within(getByTestId("multi-select-listbox")).getAllByTestId('multi-select-option').length).toBe(1);
    fireEvent.keyDown(searchbox, {key: 'Tab', code: 9});
    fireEvent.keyDown(searchbox, {key: 'Enter', code: 'Enter'})
    fireEvent.click(getByTestId("multi-select-option"));
    expect(getByRole("button", {name: "1998"})).toBeDefined();
    expect(getAllByTestId("multi-select-option").length).toBe(distinctYears.length);
    fireEvent.click(getByText("Apply Filter"));
    expect(applyFilterLoading).toBe(true);
  });
});
