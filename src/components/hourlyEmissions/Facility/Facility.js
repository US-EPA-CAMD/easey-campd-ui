import React, { useEffect, useState } from 'react';
import { connect } from "react-redux";
import MultiSelectCombobox from '../../MultiSelectCombobox/MultiSelectCombobox';
import {loadFacilities, updateFacilitySelection} from "../../../store/actions/customDataDownload/hourlyEmissions/hourlyEmissions";
import { addAppliedFilter, removeAppliedFilter } from "../../../store/actions/customDataDownload/customDataDownload";
import {isAddedToFilters} from "../../../utils/selectors/general";
import {Button} from "@trussworks/react-uswds";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons";

const Facility = ({
  facility,
  appliedFilters,
  loadFacilitiesDispatcher,
  updateFacilitySelectionDispacher,
  addAppliedFilterDispatcher,
  removeAppliedFilterDispatcher,
  loading,
  closeFlyOutHandler}) => {

  const [stateFacility, setStateFacility] = useState(JSON.parse(JSON.stringify(facility)));

  const filterToApply = "Facility";

  useEffect(()=>{
    if(facility.length===0){
      loadFacilitiesDispatcher();
    }// eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  useEffect(()=>{
    setStateFacility(JSON.parse(JSON.stringify(facility)));
  },[facility]);

  const handleApplyFilter = () =>{
    updateFacilitySelectionDispacher(stateFacility);
    if(isAddedToFilters(filterToApply, appliedFilters)){
      removeAppliedFilterDispatcher(filterToApply);
    }
    const selection = stateFacility.filter(e=>e.selected)
    if(selection.length>0){
      addAppliedFilterDispatcher({key:filterToApply, values:selection.map(e=>e.label)});
    }
    closeFlyOutHandler();
  };

  const onChangeUpdate = (id, updateType) =>{
    const stateCopy = [...stateFacility];
    const found =stateCopy.find(e=> e.id===id);
    if(found){
      updateType==="add"? found.selected = true : found.selected = false;
    }
    setStateFacility([...stateCopy]);
  }

  return (
    <>
      <div className="panel-header padding-top-2 margin-x-2">
        Facility
        <FontAwesomeIcon
          icon={faQuestionCircle}
          className="text-gray-30 font-body-md question-icon"
        />
        <hr />
      </div>
      {
        facility.length > 0 && loading===0 &&
        <>
          <div className="margin-x-2">
            <MultiSelectCombobox
              items={JSON.parse(JSON.stringify(facility))}
              label="Select or Search Facilities/ORIS Codes"
              entity={filterToApply}
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
              className="float-right"
              //disabled={!isApplyFilterEnabled()}
              onClick={handleApplyFilter}
            >
              Apply Filter
            </Button>
          </div>
        </>
      }
      {
        loading>0 && facility.length===0 &&
        <span className="font-alt-sm text-bold margin-x-2">Loading...</span>
      }
    </>
  );
}


const mapStateToProps = (state) => {
  return {
    facility: state.hourlyEmissions.facility,
    appliedFilters: state.customDataDownload.appliedFilters,
    loading: state.apiCallsInProgress
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadFacilitiesDispatcher: () => dispatch(loadFacilities()),
    updateFacilitySelectionDispacher: (facility) => dispatch(updateFacilitySelection(facility)),
    addAppliedFilterDispatcher: (filterToApply) => dispatch(addAppliedFilter(filterToApply)),
    removeAppliedFilterDispatcher: (removedFilter) => dispatch(removeAppliedFilter(removedFilter))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Facility);
