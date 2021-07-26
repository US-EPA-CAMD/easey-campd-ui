import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Button } from '@trussworks/react-uswds';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';

import {
  loadAccountNameNumbers,
  updateAccountNameNumberSelection,
} from '../../../store/actions/customDataDownload/filterCriteria';
import {
  addAppliedFilter,
  removeAppliedFilter,
} from '../../../store/actions/customDataDownload/customDataDownload';
import { isAddedToFilters } from '../../../utils/selectors/general';
import MultiSelectCombobox from '../../MultiSelectCombobox/MultiSelectCombobox';

const AccountNameNumber = ({
  accountNameNumber,
  appliedFilters,
  loadAccountNameNumbersDispatcher,
  updateAccountNameNumberSelectionDispacher,
  addAppliedFilterDispatcher,
  removeAppliedFilterDispatcher,
  loading,
  closeFlyOutHandler,
}) => {
  const [_accountNameNumber, setAccountNameNumber] = useState(
    JSON.parse(JSON.stringify(accountNameNumber))
  );

  const filterToApply = 'Account Name/Number';

  useEffect(() => {
    if (accountNameNumber.length === 0) {
      loadAccountNameNumbersDispatcher();
    } // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setAccountNameNumber(JSON.parse(JSON.stringify(accountNameNumber)));
  }, [accountNameNumber]);

  const handleApplyFilter = () => {
    updateAccountNameNumberSelectionDispacher(_accountNameNumber);
    if (isAddedToFilters(filterToApply, appliedFilters)) {
      removeAppliedFilterDispatcher(filterToApply);
    }
    const selection = _accountNameNumber.filter((e) => e.selected);
    if (selection.length > 0) {
      addAppliedFilterDispatcher({
        key: filterToApply,
        values: selection.map((e) => e.label),
      });
    }
    closeFlyOutHandler();
  };

  const onChangeUpdate = (id, updateType) => {
    const stateCopy = [..._accountNameNumber];
    const found = stateCopy.find((e) => e.id === id);
    if (found) {
      updateType === 'add' ? (found.selected = true) : (found.selected = false);
    }
    setAccountNameNumber([...stateCopy]);
  };

  return (
    <>
      <div className="panel-header padding-top-2 margin-x-2">
        <h3>Account Name/Number</h3>
        <FontAwesomeIcon
          icon={faQuestionCircle}
          className="text-gray-30 font-body-md question-icon"
        />
        <hr />
      </div>
      {accountNameNumber.length > 0 && loading === 0 && (
        <>
          <div className="margin-x-2">
            <MultiSelectCombobox
              items={JSON.parse(JSON.stringify(accountNameNumber))}
              label="Select or Search Account Names/Numbers"
              entity={'name/number'}
              onChangeUpdate={onChangeUpdate}
              searchBy="contains"
            />
          </div>
          <hr />
          <div className="margin-top-4 margin-x-2">
            <Button type="button" outline onClick={closeFlyOutHandler}>
              Cancel
            </Button>
            <Button
              type="button"
              className="float-right autofocus2"
              onClick={handleApplyFilter}
            >
              Apply Filter
            </Button>
          </div>
        </>
      )}
      {loading > 0 && accountNameNumber.length === 0 && (
        <span className="font-alt-sm text-bold margin-x-2">Loading...</span>
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    accountNameNumber: state.filterCriteria.accountNameNumber,
    appliedFilters: state.customDataDownload.appliedFilters,
    loading: state.apiCallsInProgress,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadAccountNameNumbersDispatcher: () => dispatch(loadAccountNameNumbers()),
    updateAccountNameNumberSelectionDispacher: (accountNameNumberSelection) =>
      dispatch(updateAccountNameNumberSelection(accountNameNumberSelection)),
    addAppliedFilterDispatcher: (filterToApply) =>
      dispatch(addAppliedFilter(filterToApply)),
    removeAppliedFilterDispatcher: (removedFilter) =>
      dispatch(removeAppliedFilter(removedFilter)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AccountNameNumber);
