import React, { useEffect, useRef, useState } from 'react';
import { connect } from "react-redux";
import {Button} from "@trussworks/react-uswds";

import MultiSelectCombobox from '../../MultiSelectCombobox/MultiSelectCombobox';
import { updateFilterCriteria, updateStateSelection } from "../../../store/actions/customDataDownload/filterCriteria";
import { addAppliedFilter, removeAppliedFilter } from "../../../store/actions/customDataDownload/customDataDownload";
import { isAddedToFilters } from "../../../utils/selectors/general";
import { engageFilterLogic } from "../../../utils/selectors/filterLogic";

const StateTerritory = ({
  stateTerritory,
  appliedFilters,
  updateStateSelectionDispatcher,
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

  const [_stateTerritory, setStateTerritory] = useState(JSON.parse(JSON.stringify(stateTerritory)));
  const filterToApply = "State/Territory";
  const fcRef = useRef(filterCriteria);
  fcRef.current = filterCriteria;

  useEffect(()=>{
    if(_stateTerritory.length > 0){
      renderedHandler();
    }// eslint-disable-next-line react-hooks/exhaustive-deps
  },[_stateTerritory]);

  const handleApplyFilter = () => {
    setApplyFilterLoading(true);
    setTimeout(async()=>{
      await updateFilters();
      if(fcRef.current.filterMapping.length>0){
      engageFilterLogic(dataType, dataSubType, filterToApply, JSON.parse(JSON.stringify(fcRef.current)), updateFilterCriteriaDispatcher, setApplyFilterLoading);
    } else {
      setApplyFilterLoading(false)
    }
    closeFlyOutHandler();
    })
  };
  const updateFilters = () => {updateStateSelectionDispatcher(_stateTerritory);
    if(isAddedToFilters(filterToApply, appliedFilters)){
      removeAppliedFilterDispatcher(filterToApply);
    }
    const selection = _stateTerritory.filter(e=>e.selected)
    if(selection.length>0){
      addAppliedFilterDispatcher({key:filterToApply, values:selection.map(e=>e.label)});
    }}
  

  const onChangeUpdate = (id, updateType) =>{
    const stateCopy = [..._stateTerritory];
    const found =stateCopy.find(e=> e.id===id);
    if(found){
      updateType==="add"? found.selected = true : found.selected = false;
    }
    setStateTerritory([...stateCopy]);
  }

  return (
    <>
      <div className="panel-header padding-top-2 margin-x-2">
        <h3 data-testid="filter-criteria-title">State/Territory</h3>
        <hr />
      </div>
      {
        stateTerritory.length > 0 &&
        <>
          <div className="margin-x-2">
            <MultiSelectCombobox
              items={JSON.parse(JSON.stringify(stateTerritory))}
              label="Select or Search States/Territories"
              entity={"states/territories"}
              onChangeUpdate={onChangeUpdate}
              searchBy="beginsWith"
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
    stateTerritory: state.filterCriteria.stateTerritory,
    appliedFilters: state.customDataDownload.appliedFilters,
    dataType: state.customDataDownload.dataType,
    dataSubType: state.customDataDownload.dataSubType,
    filterCriteria: state.filterCriteria,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateStateSelectionDispatcher: (stateSelection) => dispatch(updateStateSelection(stateSelection)),
    addAppliedFilterDispatcher: (filterToApply) => dispatch(addAppliedFilter(filterToApply)),
    removeAppliedFilterDispatcher: (removedFilter) => dispatch(removeAppliedFilter(removedFilter)),
    updateFilterCriteriaDispatcher: (filterCriteria) => dispatch(updateFilterCriteria(filterCriteria)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(StateTerritory);
