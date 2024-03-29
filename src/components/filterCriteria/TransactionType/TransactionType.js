import React, { useEffect, useRef, useState } from 'react';
import { connect } from "react-redux";
import {Button} from "@trussworks/react-uswds";
import { Help } from '@material-ui/icons';

import MultiSelectCombobox from '../../MultiSelectCombobox/MultiSelectCombobox';
import {updateFilterCriteria, updateTransactionTypeSelection} from "../../../store/actions/customDataDownload/filterCriteria";
import { addAppliedFilter, removeAppliedFilter } from "../../../store/actions/customDataDownload/customDataDownload";
import {isAddedToFilters} from "../../../utils/selectors/general";
import Tooltip from '../../Tooltip/Tooltip';
import { engageFilterLogic } from '../../../utils/selectors/filterLogic';

const TransactionType = ({
  transactionType,
  appliedFilters,
  updateTransactionTypeSelectionDispatcher,
  addAppliedFilterDispatcher,
  removeAppliedFilterDispatcher,
  closeFlyOutHandler,
  renderedHandler,
  dataType,
  dataSubType,
  filterCriteria,
  updateFilterCriteriaDispatcher,
  setApplyFilterLoading,
  }) => {

  const [_transactionType, setTransactionType] = useState(JSON.parse(JSON.stringify(transactionType)));
  const fcRef = useRef(filterCriteria);
  fcRef.current = filterCriteria;
  const filterToApply = "Transaction Type";

  useEffect(()=>{
    if(_transactionType.length > 0){
      renderedHandler();
    }// eslint-disable-next-line react-hooks/exhaustive-deps
  },[_transactionType]);

  const handleApplyFilter = () =>{
    setApplyFilterLoading(true);
    setTimeout(async()=>{await updateFilters();
      if(fcRef.current.filterMapping.length>0){
        engageFilterLogic(dataType, dataSubType, filterToApply, JSON.parse(JSON.stringify(fcRef.current)), updateFilterCriteriaDispatcher, setApplyFilterLoading);
      } else {
        setApplyFilterLoading(false)
      }
      closeFlyOutHandler();
    });
  };

  const onChangeUpdate = (id, updateType) =>{
    const stateCopy = [..._transactionType];
    const found =stateCopy.find(e=> e.id===id);
    if(found){
      updateType==="add"? found.selected = true : found.selected = false;
    }
    setTransactionType([...stateCopy]);
  }

  const updateFilters = () => {
    updateTransactionTypeSelectionDispatcher(_transactionType);
      if(isAddedToFilters(filterToApply, appliedFilters)){
        removeAppliedFilterDispatcher(filterToApply);
      }
      const selection = _transactionType.filter(e=>e.selected)
      if(selection.length>0){
        addAppliedFilterDispatcher({key:filterToApply, values:selection.map(e=>e.label)});
      }
  }

  return (
    <>
      <div className="panel-header padding-top-2 margin-x-2">
        <h3 data-testid="filter-criteria-title">{filterToApply}</h3>
        <Tooltip
          content="For more information on transaction types, use the Allowance Data Guide in the Tutorials section."
          field={filterToApply}
        >
          <Help
            className=" text-primary margin-left-1 margin-bottom-1"
            fontSize="small"
          />
        </Tooltip>
        <hr />
      </div>
      {
        _transactionType.length > 0 &&
        <>
          <div className="margin-x-2">
            <MultiSelectCombobox
              items={JSON.parse(JSON.stringify(_transactionType))}
              label="Select or Search Transaction Types"
              entity={"transaction-types"}
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
      }
    </>
  );
}


const mapStateToProps = (state) => {
  return {
    transactionType: state.filterCriteria.transactionType,
    appliedFilters: state.customDataDownload.appliedFilters,
    dataType: state.customDataDownload.dataType,
    dataSubType: state.customDataDownload.dataSubType,
    filterCriteria: state.filterCriteria,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateTransactionTypeSelectionDispatcher: (selection) => dispatch(updateTransactionTypeSelection(selection)),
    addAppliedFilterDispatcher: (filterToApply) => dispatch(addAppliedFilter(filterToApply)),
    removeAppliedFilterDispatcher: (removedFilter) => dispatch(removeAppliedFilter(removedFilter)),
    updateFilterCriteriaDispatcher: (filterCriteria) => dispatch(updateFilterCriteria(filterCriteria)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TransactionType);
