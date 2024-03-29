import React, { useEffect, useRef, useState } from 'react';
import { connect } from "react-redux";
import {Button} from "@trussworks/react-uswds";
import { Help } from '@material-ui/icons';

import MultiSelectCombobox from '../../MultiSelectCombobox/MultiSelectCombobox';
import { updateOwnerOperatorSelection, updateFilterCriteria } from "../../../store/actions/customDataDownload/filterCriteria";
import { addAppliedFilter, removeAppliedFilter } from "../../../store/actions/customDataDownload/customDataDownload";
import { isAddedToFilters } from "../../../utils/selectors/general";
import { engageFilterLogic } from "../../../utils/selectors/filterLogic";
import Tooltip from '../../Tooltip/Tooltip';

const OwnerOperator = ({
  ownerOperator,
  dataType,
  dataSubType,
  filterCriteria,
  appliedFilters,
  updateOwnerOperatorDispatcher,
  addAppliedFilterDispatcher,
  removeAppliedFilterDispatcher,
  loading,
  updateFilterCriteriaDispatcher,
  closeFlyOutHandler,
  renderedHandler,
  setApplyFilterLoading,
}) => {

  const [_ownerOperator, setOwnerOperator] = useState(JSON.parse(JSON.stringify(ownerOperator)));
  const fcRef = useRef(filterCriteria);
  fcRef.current = filterCriteria;
  const filterToApply = "Owner/Operator";
  let tooltip ="";

  if (dataType === "COMPLIANCE"){
     tooltip = "Select one or more companies that own and/or operate a unit using the drop down."
  }
  else {
    tooltip = "Search for one or more individuals/companies that own an allowance account."
  }

  useEffect(()=>{
    if(_ownerOperator.length > 0){
      renderedHandler();
    }// eslint-disable-next-line react-hooks/exhaustive-deps
  },[_ownerOperator]);

  const updateFilters = () => {
    updateOwnerOperatorDispatcher(_ownerOperator);
    if(isAddedToFilters(filterToApply, appliedFilters)){
      removeAppliedFilterDispatcher(filterToApply);
    }
    const selection = _ownerOperator.filter(e=>e.selected)
    if(selection.length>0){
      addAppliedFilterDispatcher({key:filterToApply, values:selection.map(e=>e.label)});
    }}
  const handleApplyFilter = () =>{
    setApplyFilterLoading(true);
    setTimeout(async()=>{await updateFilters();
      if(dataType === "ALLOWANCE" || dataType === "COMPLIANCE"){
        if(fcRef.current.filterMapping.length>0){
          engageFilterLogic(dataType, dataSubType, filterToApply, JSON.parse(JSON.stringify(fcRef.current)), updateFilterCriteriaDispatcher, setApplyFilterLoading);
        } else {
          setApplyFilterLoading(false)
        }
      } else {
        setApplyFilterLoading(false)
      }
      closeFlyOutHandler();
    })
  };


  const onChangeUpdate = (id, updateType) =>{
    const opCopy = [..._ownerOperator];
    const found =opCopy.find(e=> e.id===id);
    if(found){
      updateType==="add"? found.selected = true : found.selected = false;
    }
    setOwnerOperator([...opCopy]);
  }

  return (
    <>
      <div className="panel-header padding-top-2 margin-x-2">
        <h3 data-testid="filter-criteria-title">{filterToApply}</h3>
        <Tooltip content={tooltip} field={filterToApply}>
          <Help
            className="text-primary margin-left-1 margin-bottom-1"
            fontSize="small"
          />
        </Tooltip>
        <hr />
      </div>
      {
        _ownerOperator.length > 0 && loading===0 &&
        <>
          <div className="margin-x-2">
            <MultiSelectCombobox
              items={JSON.parse(JSON.stringify(_ownerOperator))}
              label="Select or Search Owners/Operators"
              entity={"owners/operators"}
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
        loading > 0 && ownerOperator.length === 0 && 
        <span className="font-alt-sm text-bold margin-x-2">Loading...</span>
      }
    </>
  );
}


const mapStateToProps = (state) => {
  return {
    dataSubType: state.customDataDownload.dataSubType,
    ownerOperator: state.filterCriteria.ownerOperator,
    appliedFilters: state.customDataDownload.appliedFilters,
    dataType: state.customDataDownload.dataType,
    loading: state.apiCallsInProgress,
    filterCriteria: state.filterCriteria
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateOwnerOperatorDispatcher: (ownerOperator) => dispatch(updateOwnerOperatorSelection(ownerOperator)),
    addAppliedFilterDispatcher: (filterToApply) => dispatch(addAppliedFilter(filterToApply)),
    removeAppliedFilterDispatcher: (removedFilter) => dispatch(removeAppliedFilter(removedFilter)),
    updateFilterCriteriaDispatcher: (filterCriteria) => dispatch(updateFilterCriteria(filterCriteria)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(OwnerOperator);
