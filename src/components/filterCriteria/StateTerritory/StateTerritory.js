import React, { useEffect, useState } from 'react';
import { connect } from "react-redux";
import MultiSelectCombobox from '../../MultiSelectCombobox/MultiSelectCombobox';
import { loadStates, updateStateSelection } from "../../../store/actions/customDataDownload/filterCriteria";
import { addAppliedFilter, removeAppliedFilter } from "../../../store/actions/customDataDownload/customDataDownload";
import { isAddedToFilters } from "../../../utils/selectors/general";
import {Button} from "@trussworks/react-uswds";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons";

const StateTerritory = ({
  stateTerritory,
  appliedFilters,
  loadStatesDispatcher,
  updateStateSelectionDispacher,
  addAppliedFilterDispatcher,
  removeAppliedFilterDispatcher,
  loading,
  closeFlyOutHandler}) => {

  const [_stateTerritory, setStateTerritory] = useState(JSON.parse(JSON.stringify(stateTerritory)));

  const filterToApply = "State/Territory";

  useEffect(()=>{
    if(stateTerritory.length===0){
      loadStatesDispatcher();
    }// eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  useEffect(()=>{
    setStateTerritory(JSON.parse(JSON.stringify(stateTerritory)));
  },[stateTerritory]);

  const handleApplyFilter = () =>{
    updateStateSelectionDispacher(_stateTerritory);
    if(isAddedToFilters(filterToApply, appliedFilters)){
      removeAppliedFilterDispatcher(filterToApply);
    }
    const selection = _stateTerritory.filter(e=>e.selected)
    if(selection.length>0){
      addAppliedFilterDispatcher({key:filterToApply, values:selection.map(e=>e.label)});
    }
    closeFlyOutHandler();
  };

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
        <h3>State/Territory</h3>
        <FontAwesomeIcon
          icon={faQuestionCircle}
          className="text-gray-30 font-body-md question-icon"
        />
        <hr />
      </div>
      {
        stateTerritory.length > 0 && loading===0 &&
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
      {
        loading>0 && stateTerritory.length===0 &&
        <span className="font-alt-sm text-bold margin-x-2">Loading...</span>
      }
    </>
  );
}


const mapStateToProps = (state) => {
  return {
    stateTerritory: state.filterCriteria.stateTerritory,
    appliedFilters: state.customDataDownload.appliedFilters,
    loading: state.apiCallsInProgress
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadStatesDispatcher: () => dispatch(loadStates()),
    updateStateSelectionDispacher: (stateSelection) => dispatch(updateStateSelection(stateSelection)),
    addAppliedFilterDispatcher: (filterToApply) => dispatch(addAppliedFilter(filterToApply)),
    removeAppliedFilterDispatcher: (removedFilter) => dispatch(removeAppliedFilter(removedFilter))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(StateTerritory);
