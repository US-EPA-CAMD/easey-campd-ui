import React from 'react';
import { render, fireEvent, cleanup } from '@testing-library/react';
import { Provider } from 'react-redux';

import AccountType from './AccountType';
import { restructureAccountTypes } from '../../../utils/selectors/filterCriteria';
import configureStore from '../../../store/configureStore.dev';
import initialState from '../../../store/reducers/initialState';
jest.useFakeTimers();
jest.spyOn(global, 'setTimeout');
const accountType = [
  {
    accountTypeCode: 'CASURR',
    accountTypeDescription: 'Compliance Assurance Surrender Account',
    accountTypeGroupCode: 'RETIRE',
    accountTypeGroupDescription: 'Surrender',
  },
  {
    accountTypeCode: 'ENFSURR',
    accountTypeDescription: 'Enforcement Surrender Account',
    accountTypeGroupCode: 'RETIRE',
    accountTypeGroupDescription: 'Surrender',
  },
  {
    accountTypeCode: 'FACLTY',
    accountTypeDescription: 'Facility Account',
    accountTypeGroupCode: 'FACLTY',
    accountTypeGroupDescription: 'Facility',
  },
  {
    accountTypeCode: 'GENERAL',
    accountTypeDescription: 'General Account',
    accountTypeGroupCode: 'GENERAL',
    accountTypeGroupDescription: 'General',
  },
  {
    accountTypeCode: 'RESERVE',
    accountTypeDescription: 'EPA Reserve Account',
    accountTypeGroupCode: 'RESERVE',
    accountTypeGroupDescription: 'Reserve',
  },
  {
    accountTypeCode: 'SERDRES',
    accountTypeDescription: 'State Early Reduction Reserve Account',
    accountTypeGroupCode: 'RESERVE',
    accountTypeGroupDescription: 'Reserve',
  },
  {
    accountTypeCode: 'SGENRES',
    accountTypeDescription: 'State General Reserve Account',
    accountTypeGroupCode: 'RESERVE',
    accountTypeGroupDescription: 'Reserve',
  },
  {
    accountTypeCode: 'SNSARES',
    accountTypeDescription: 'New Unit Set Aside Reserve Account',
    accountTypeGroupCode: 'RESERVE',
    accountTypeGroupDescription: 'Reserve',
  },
  {
    accountTypeCode: 'SOPTRES',
    accountTypeDescription: 'State Opt-In Reserve Account',
    accountTypeGroupCode: 'RESERVE',
    accountTypeGroupDescription: 'Reserve',
  },
  {
    accountTypeCode: 'SOTHRES',
    accountTypeDescription: 'State Other Reserve Account',
    accountTypeGroupCode: 'RESERVE',
    accountTypeGroupDescription: 'Reserve',
  },
  {
    accountTypeCode: 'SPRMRES',
    accountTypeDescription: 'State Primary Reserve Account',
    accountTypeGroupCode: 'RESERVE',
    accountTypeGroupDescription: 'Reserve',
  },
  {
    accountTypeCode: 'SRETIRE',
    accountTypeDescription: 'State Retirement Account',
    accountTypeGroupCode: 'RETIRE',
    accountTypeGroupDescription: 'Surrender',
  },
  {
    accountTypeCode: 'SURR',
    accountTypeDescription: 'Surrender Account',
    accountTypeGroupCode: 'RETIRE',
    accountTypeGroupDescription: 'Surrender',
  },
  {
    accountTypeCode: 'UNIT',
    accountTypeDescription: 'Unit Account',
    accountTypeGroupCode: 'UNIT',
    accountTypeGroupDescription: 'Unit',
  },
  {
    accountTypeCode: 'VOLSURR',
    accountTypeDescription: 'Voluntary Surrender Account',
    accountTypeGroupCode: 'RETIRE',
    accountTypeGroupDescription: 'Surrender',
  },
];

const storeAccountType = restructureAccountTypes(accountType);
initialState.filterCriteria.accountType = storeAccountType;
const store = configureStore(initialState);
let flyoutClosed = false;
let applyFilterLoading = false;

describe('Account Type', () => {
  let queries;
  beforeEach(() => {
    // setup a DOM element as a render target
    queries = render(
      <Provider store={store}>
        <AccountType
          closeFlyOutHandler={() => flyoutClosed = true}
          loadAccountTypesDispatcher={jest.fn()}
          updateAccountTypeSelectionDispatcher={jest.fn()}
          addAppliedFilterDispatcher={jest.fn()}
          removeAppliedFilterDispatcher={jest.fn()}
          renderedHandler={jest.fn()}
          setApplyFilterLoading={() => applyFilterLoading = true}

        />
      </Provider>
    );
  });

  afterEach(cleanup);

  it('Check that the component properly renders', () => {
    const { getByText, getAllByTestId, getAllByRole } = queries;
    expect(getByText('Surrender')).toBeInTheDocument();
    expect(getByText('Facility')).toBeInTheDocument();
    expect(getByText('General')).toBeInTheDocument();
    expect(getByText('Reserve')).toBeInTheDocument();
    expect(getByText('Unit')).toBeInTheDocument();

    const selectAllCheckBoxes = getAllByTestId('select-all');
    expect(selectAllCheckBoxes).toHaveLength(5);

    const checkbox = getAllByRole('checkbox');
    expect(checkbox).toHaveLength(
      storeAccountType[0].items.length +
        storeAccountType[1].items.length +
        storeAccountType[2].items.length +
        storeAccountType[3].items.length +
        storeAccountType[4].items.length +
        selectAllCheckBoxes.length
    );
  });

  it('handles checkbox selection appropriately and applies them', () => {
    const { getByRole, getByText } = queries;
    const saCheckbox = getByRole('checkbox', {
      name: 'Surrender Account (SURR)',
    });
    fireEvent.click(saCheckbox);
    expect(saCheckbox.checked).toEqual(true);

    const selectAllRetire = getByRole('checkbox', {
      name: 'All Surrender',
    });
    fireEvent.click(selectAllRetire);
    expect(selectAllRetire.checked).toEqual(true);
    const applyFilterButton = getByText('Apply Filter').closest('button');
    fireEvent.click(applyFilterButton);
    jest.runAllTimers();
    expect(applyFilterLoading).toBe(true);
  });
});
