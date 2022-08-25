import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Button } from '@trussworks/react-uswds';
import { Help } from '@material-ui/icons';

import {
  updateFilterCriteria,
  updateAccountNameNumberSelection,
} from '../../../store/actions/customDataDownload/filterCriteria';
import {
  addAppliedFilter,
  removeAppliedFilter,
} from '../../../store/actions/customDataDownload/customDataDownload';
import { isAddedToFilters } from '../../../utils/selectors/general';
import MultiSelectCombobox from '../../MultiSelectCombobox/MultiSelectCombobox';
import { engageFilterLogic } from "../../../utils/selectors/filterLogic";
import Tooltip from '../../Tooltip/Tooltip';

const AccountNameNumber = ({
  accountNameNumber,
  appliedFilters,
  updateAccountNameNumberSelectionDispatcher,
  addAppliedFilterDispatcher,
  removeAppliedFilterDispatcher,
  closeFlyOutHandler,
  renderedHandler,
  dataType,
  dataSubType,
  filterCriteria,
  updateFilterCriteriaDispatcher,
  applyFilterLoading,
  setApplyFilterLoading,
}) => {
  const [_accountNameNumber, setAccountNameNumber] = useState(JSON.parse(JSON.stringify(accountNameNumber)));
  const [applyFilterClicked, setApplyFilterClicked] = useState(false);
  const filterToApply = 'Account Name/Number';

  useEffect(()=>{
    if(_accountNameNumber.length > 0){
      renderedHandler();
    }// eslint-disable-next-line react-hooks/exhaustive-deps
  },[_accountNameNumber]);

  useEffect(()=>{
    if(applyFilterClicked){
      if(filterCriteria.filterMapping.length>0){
        engageFilterLogic(dataType, dataSubType, filterToApply, JSON.parse(JSON.stringify(filterCriteria)), updateFilterCriteriaDispatcher, setApplyFilterLoading);
      } else {
        setApplyFilterLoading(false)
      }
      closeFlyOutHandler();
    }// eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accountNameNumber]);

  useEffect(()=>{
    if(applyFilterLoading){
      updateAccountNameNumberSelectionDispatcher(_accountNameNumber);
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
    setApplyFilterClicked(true);
    }// eslint-disable-next-line react-hooks/exhaustive-deps
  }, [applyFilterLoading]);

  const handleApplyFilter = () => {
    setApplyFilterLoading(true);
  };

  const onChangeUpdate = (id, updateType) => {
    const stateCopy = [..._accountNameNumber];
    const found = stateCopy.find((e) => e.id === id);
    if (found) {
      found.selected = updateType === 'add' ? true : false;
    }
    setAccountNameNumber([...stateCopy]);
  };

  return (
    <>
      <div className="panel-header padding-top-2 margin-x-2">
        <h3>Account Name/Number</h3>
        <Tooltip
          content="For more information on account numbers, use the Allowance Data Guide in the Tutorials section."
          field="Account Name/Number"
        >
          <Help
            className="text-primary margin-left-1 margin-bottom-1"
            fontSize="small"
          />
        </Tooltip>
        <hr />
      </div>
      {accountNameNumber.length > 0 && (
        <>
          <div className="margin-x-2">
            <MultiSelectCombobox
              items={JSON.parse(JSON.stringify(accountNameNumber))}
              label="Select or Search Account Names/Numbers"
              entity={'accounts'}
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
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    accountNameNumber: state.filterCriteria.accountNameNumber,
    appliedFilters: state.customDataDownload.appliedFilters,
    dataType: state.customDataDownload.dataType,
    dataSubType: state.customDataDownload.dataSubType,
    filterCriteria: state.filterCriteria,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateAccountNameNumberSelectionDispatcher: (accountNameNumberSelection) => 
      dispatch(updateAccountNameNumberSelection(accountNameNumberSelection)),
    addAppliedFilterDispatcher: (filterToApply) => dispatch(addAppliedFilter(filterToApply)),
    removeAppliedFilterDispatcher: (removedFilter) =>dispatch(removeAppliedFilter(removedFilter)),
    updateFilterCriteriaDispatcher: (filterCriteria) => dispatch(updateFilterCriteria(filterCriteria)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AccountNameNumber);
