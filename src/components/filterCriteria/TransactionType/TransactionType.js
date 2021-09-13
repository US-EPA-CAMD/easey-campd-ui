import React, { useEffect, useState } from 'react';
import { connect } from "react-redux";
import MultiSelectCombobox from '../../MultiSelectCombobox/MultiSelectCombobox';
import {loadTransactionTypes, updateTransactionTypeSelection} from "../../../store/actions/customDataDownload/filterCriteria";
import { addAppliedFilter, removeAppliedFilter } from "../../../store/actions/customDataDownload/customDataDownload";
import {isAddedToFilters} from "../../../utils/selectors/general";
import {Button} from "@trussworks/react-uswds";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons";

const TransactionType = ({
  transactionType,
  appliedFilters,
  loadtransactionTypesDispatcher,
  updatetransactionTypeSelectionDispacher,
  addAppliedFilterDispatcher,
  removeAppliedFilterDispatcher,
  loading,
  closeFlyOutHandler,
  renderedHandler}) => {

  const [_transactionType, setTransactionType] = useState(JSON.parse(JSON.stringify(transactionType)));

  const filterToApply = "Transaction Type";

  useEffect(()=>{
    if(transactionType.length===0){
      loadtransactionTypesDispatcher();
    }else{
      if(_transactionType.length===0){
        setTransactionType(JSON.parse(JSON.stringify(transactionType)));
      }
      renderedHandler();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[transactionType]);

  const handleApplyFilter = () =>{
    updatetransactionTypeSelectionDispacher(_transactionType);
    if(isAddedToFilters(filterToApply, appliedFilters)){
      removeAppliedFilterDispatcher(filterToApply);
    }
    const selection = _transactionType.filter(e=>e.selected)
    if(selection.length>0){
      addAppliedFilterDispatcher({key:filterToApply, values:selection.map(e=>e.label)});
    }
    closeFlyOutHandler();
  };

  const onChangeUpdate = (id, updateType) =>{
    const stateCopy = [..._transactionType];
    const found =stateCopy.find(e=> e.id===id);
    if(found){
      updateType==="add"? found.selected = true : found.selected = false;
    }
    setTransactionType([...stateCopy]);
  }

  return (
    <>
      <div className="panel-header padding-top-2 margin-x-2">
        <h3>{filterToApply}</h3>
        <FontAwesomeIcon
          icon={faQuestionCircle}
          className="text-gray-30 font-body-md question-icon"
        />
        <hr />
      </div>
      {
        _transactionType.length > 0 && loading===0 &&
        <>
          <div className="margin-x-2">
            <MultiSelectCombobox
              items={JSON.parse(JSON.stringify(_transactionType))}
              label="Select or Search Transaction Types"
              entity={"transaction types"}
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
      {
        loading>0 && _transactionType.length===0 &&
        <span className="font-alt-sm text-bold margin-x-2">Loading...</span>
      }
    </>
  );
}


const mapStateToProps = (state) => {
  return {
    transactionType: state.filterCriteria.transactionType,
    appliedFilters: state.customDataDownload.appliedFilters,
    loading: state.apiCallsInProgress
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadtransactionTypesDispatcher: () => dispatch(loadTransactionTypes()),
    updatetransactionTypeSelectionDispacher: (selection) => dispatch(updateTransactionTypeSelection(selection)),
    addAppliedFilterDispatcher: (filterToApply) => dispatch(addAppliedFilter(filterToApply)),
    removeAppliedFilterDispatcher: (removedFilter) => dispatch(removeAppliedFilter(removedFilter))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TransactionType);
