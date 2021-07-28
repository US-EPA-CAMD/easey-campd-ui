import React from 'react';
import { cleanup, fireEvent, render, within } from '@testing-library/react';
import { Provider } from 'react-redux';

import configureStore from '../../../store/configureStore.dev';
import initialState from '../../../store/reducers/initialState';
import AccountNameNumber from './AccountNameNumber';

const nameNumbers = [
  {
    accountNumber: '000000000001',
    accountName: 'Auction Reserve',
  },
  {
    accountNumber: '000000000002',
    accountName: 'Direct Sale Reserve',
  },
  {
    accountNumber: '000000000003',
    accountName: 'Small Diesel Reserve',
  },
  {
    accountNumber: '000000000004',
    accountName: 'Phase I Extension Reserve',
  },
  {
    accountNumber: '000000000005',
    accountName: 'Conservation and Renewables Reserve',
  },
  {
    accountNumber: '000000000006',
    accountName: 'Renewable Energy Reserve',
  },
  {
    accountNumber: '000000000007',
    accountName: 'Repowering Reserve',
  },
  {
    accountNumber: '000000000008',
    accountName: 'Reduced Utilization Reserve',
  },
  {
    accountNumber: '000000000009',
    accountName: 'Initial Allocation Reserve',
  },
  {
    accountNumber: '000000000010',
    accountName: 'Opt In Reserve',
  },
  {
    accountNumber: '000000000011',
    accountName: 'Substitution Reserve',
  },
];

initialState.filterCriteria.accountNameNumber = nameNumbers.map((ann) => ({
  id: ann.accountNumber,
  label: `${ann.accountName} (${ann.accountNumber})`,
  selected: false,
}));
const store = configureStore(initialState);
let flyOutClosed = false;

describe('Account Name/Number Component', () => {
  let query;
  beforeEach(() => {
    query = render(
      <Provider store={store}>
        <AccountNameNumber
          loadAccountNameNumbersDispatcher={jest.fn()}
          updateAccountNameNumberSelectionDispacher={jest.fn()}
          addAppliedFilterDispatcher={jest.fn()}
          removeAppliedFilterDispatcher={jest.fn()}
          closeFlyOutHandler={() => (flyOutClosed = true)}
        />
      </Provider>
    );
  });

  afterEach(cleanup);

  it('renders all elements properely', () => {
    const { getByTestId, getByText } = query;
    expect(getByText('Account Name/Number')).toBeInTheDocument();
    const searchbox = getByTestId('input-search');
    expect(searchbox).toBeInTheDocument();
    searchbox.focus();
    fireEvent.click(searchbox);
    const listBox = getByTestId('multi-select-listbox');
    expect(listBox).toBeInTheDocument();
    expect(within(listBox).getAllByTestId('multi-select-option').length).toBe(
      initialState.filterCriteria.accountNameNumber.length
    );
  });

  it('handles click event of cancel button', () => {
    const { getByText } = query;
    fireEvent.click(getByText('Cancel'));
    expect(flyOutClosed).toBe(true);
  });

  test('It should search using input box for Account Name/Numbers in listboxt', () => {
    const { getByTestId } = query;
    const searchbox = getByTestId('input-search');
    searchbox.focus();
    fireEvent.click(searchbox);
    fireEvent.change(searchbox, { target: { value: 'Auction Reserve' } });
    expect(searchbox.value).toBe('Auction Reserve');
    expect(
      within(getByTestId('multi-select-listbox')).getAllByTestId(
        'multi-select-option'
      ).length
    ).toBe(1);
  });
});
