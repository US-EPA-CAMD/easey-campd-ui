import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Button } from '@trussworks/react-uswds';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';

import CheckboxGroupRenderer from '../../CheckboxGroupRenderer/CheckboxGroupRenderer';
import {
  loadAccountTypes,
  updateAccountTypeSelection,
} from '../../../store/actions/customDataDownload/filterCriteria';
import {
  addAppliedFilter,
  removeAppliedFilter,
} from '../../../store/actions/customDataDownload/customDataDownload';
import { getSelectedIds } from '../../../utils/selectors/filterCriteria';
import { isAddedToFilters } from '../../../utils/selectors/general';

const AccountType = ({
  storeAccountType,
  appliedFilters,
  loadAccountTypesDispatcher,
  updateAccountTypeSelectionDispatcher,
  addAppliedFilterDispatcher,
  removeAppliedFilterDispatcher,
  loading,
  closeFlyOutHandler,
  renderedHandler
}) => {
  const [accountType, setAccountTypes] = useState(
    JSON.parse(JSON.stringify(storeAccountType))
  );

  const filterToApply = 'Account Type';

  const onSelectAllAccountTypesHandler = (e) => {
    const newAccountTypes = [...accountType];
    const groupIndex = newAccountTypes.findIndex(
      (group) => group.name === e.target.id
    );
    newAccountTypes[groupIndex].items.forEach((i) => {
      i.selected = i.enabled && e.target.checked;
    });
    setAccountTypes(newAccountTypes);
  };

  const onSelectAccountTypeHandler = (e) => {
    const newAccountTypes = [...accountType];
    const groupIndex = newAccountTypes.findIndex(
      (group) => group.name === e.target.name
    );
    const found = newAccountTypes[groupIndex].items.findIndex(
      (i) => i.id === e.target.id
    );
    if (found > -1) {
      newAccountTypes[groupIndex].items[found].selected = e.target.checked;
      setAccountTypes(newAccountTypes);
    }
  };

  useEffect(() => {
    if (storeAccountType.length === 0) {
      loadAccountTypesDispatcher();
    } // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setAccountTypes(JSON.parse(JSON.stringify(storeAccountType)));
  }, [storeAccountType]);

  useEffect(() => {
    if(accountType.length > 0 && loading === 0){
      renderedHandler();
    }// eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accountType, loading]);

  const handleApplyFilter = () => {
    updateAccountTypeSelectionDispatcher(accountType);
    if (isAddedToFilters(filterToApply, appliedFilters)) {
      removeAppliedFilterDispatcher(filterToApply);
    }
    const selection = getSelectedIds(accountType);
    if (selection.length > 0) {
      addAppliedFilterDispatcher({ key: filterToApply, values: selection });
    }
    closeFlyOutHandler();
  };

  return (
    <>
      <div className="panel-header padding-top-2 margin-x-2">
        <h3>Account Type</h3>
        <FontAwesomeIcon
          icon={faQuestionCircle}
          className="text-gray-30 font-body-md question-icon"
        />
        <hr />
      </div>
      {accountType.length > 0 && loading === 0 && (
        <>
          <div className="display-block maxh-mobile-lg overflow-y-scroll overflow-x-hidden">
            <CheckboxGroupRenderer
              items={accountType}
              enableSelectAll={true}
              onSelectAll={onSelectAllAccountTypesHandler}
              onSelectItem={onSelectAccountTypeHandler}
              showActiveRetired={false}
            />
          </div>
          <hr />
          <div className="margin-top-3">
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
      {loading > 0 && accountType.length === 0 && (
        <span className="font-alt-sm text-bold margin-x-2">Loading...</span>
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    storeAccountType: state.filterCriteria.accountType,
    appliedFilters: state.customDataDownload.appliedFilters,
    loading: state.apiCallsInProgress,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadAccountTypesDispatcher: () => dispatch(loadAccountTypes()),
    updateAccountTypeSelectionDispatcher: (accountType) =>
      dispatch(updateAccountTypeSelection(accountType)),
    addAppliedFilterDispatcher: (filterToApply) =>
      dispatch(addAppliedFilter(filterToApply)),
    removeAppliedFilterDispatcher: (removedFilter) =>
      dispatch(removeAppliedFilter(removedFilter)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AccountType);
