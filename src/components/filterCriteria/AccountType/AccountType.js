import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Button } from '@trussworks/react-uswds';
import { Help } from '@material-ui/icons';

import CheckboxGroupRenderer from '../../CheckboxGroupRenderer/CheckboxGroupRenderer';
import {
  updateFilterCriteria,
  updateAccountTypeSelection,
} from '../../../store/actions/customDataDownload/filterCriteria';
import {
  addAppliedFilter,
  removeAppliedFilter,
} from '../../../store/actions/customDataDownload/customDataDownload';
import { getSelectedIds } from '../../../utils/selectors/filterCriteria';
import { isAddedToFilters } from '../../../utils/selectors/general';
import Tooltip from '../../Tooltip/Tooltip';
import { engageFilterLogic } from '../../../utils/selectors/filterLogic';

const AccountType = ({
  storeAccountType,
  appliedFilters,
  updateAccountTypeSelectionDispatcher,
  addAppliedFilterDispatcher,
  removeAppliedFilterDispatcher,
  closeFlyOutHandler,
  renderedHandler,
  dataType,
  dataSubType,
  filterCriteria,
  updateFilterCriteriaDispacher,
  applyFilterLoading,
  setApplyFilterLoading,
}) => {
  const [accountType, setAccountTypes] = useState(
    JSON.parse(JSON.stringify(storeAccountType))
  );
  const [applyFilterClicked, setApplyFilterClicked] = useState(false);
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
    if (accountType.length > 0) {
      renderedHandler();
    } // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accountType]);

  useEffect(() => {
    if (applyFilterClicked) {
      if (filterCriteria.filterMapping.length > 0) {
        engageFilterLogic(
          dataType,
          dataSubType,
          filterToApply,
          JSON.parse(JSON.stringify(filterCriteria)),
          updateFilterCriteriaDispacher,
          setApplyFilterLoading,
        );
      }
      closeFlyOutHandler();
    } // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [applyFilterClicked]);

  useEffect(()=>{
    if(applyFilterLoading){
        updateAccountTypeSelectionDispatcher(accountType);
    if(isAddedToFilters(filterToApply, appliedFilters)) {
      removeAppliedFilterDispatcher(filterToApply);
    }
    const selection = getSelectedIds(accountType);
    if(selection.length > 0) {
      addAppliedFilterDispatcher({ key: filterToApply, values: selection });
    }
    setApplyFilterClicked(true);
    // setApplyFilterLoading(false);
    }//eslint-disable-next-line react-hooks/exhaustive-deps
  }, [applyFilterLoading]);
  const handleApplyFilter = () => {
    setApplyFilterLoading(true)
  };

  return (
    <>
      <div className="panel-header padding-top-2 margin-x-2">
        <h3>Account Type</h3>
        <Tooltip
          content="For more information on account types, use the Allowance Data Guide in the Tutorials section."
          field="Account Type"
        >
          <Help
            className="text-primary margin-left-1 margin-bottom-1"
            fontSize="small"
          />
        </Tooltip>
        <hr />
      </div>
      {accountType.length > 0 && (
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
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    storeAccountType: state.filterCriteria.accountType,
    appliedFilters: state.customDataDownload.appliedFilters,
    dataType: state.customDataDownload.dataType,
    dataSubType: state.customDataDownload.dataSubType,
    filterCriteria: state.filterCriteria,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateAccountTypeSelectionDispatcher: (selection) =>
      dispatch(updateAccountTypeSelection(selection)),
    addAppliedFilterDispatcher: (filterToApply) =>
      dispatch(addAppliedFilter(filterToApply)),
    removeAppliedFilterDispatcher: (removedFilter) =>
      dispatch(removeAppliedFilter(removedFilter)),
    updateFilterCriteriaDispacher: (filterCriteria) =>
      dispatch(updateFilterCriteria(filterCriteria)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AccountType);
