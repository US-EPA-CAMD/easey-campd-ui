import React, { useEffect, useState } from 'react';
import { connect } from "react-redux";
import MultiSelectCombobox from '../../MultiSelectCombobox/MultiSelectCombobox';
import { updateFilterCriteria, updateFacilitySelection} from "../../../store/actions/customDataDownload/filterCriteria";
import { addAppliedFilter, removeAppliedFilter } from "../../../store/actions/customDataDownload/customDataDownload";
import {isAddedToFilters} from "../../../utils/selectors/general";
import {Button} from "@trussworks/react-uswds";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons";
import { engageFilterLogic } from "../../../utils/selectors/filterLogic";

const Facility = ({
  facility,
  appliedFilters,
  updateFacilitySelectionDispacher,
  addAppliedFilterDispatcher,
  removeAppliedFilterDispatcher,
  closeFlyOutHandler,
  renderedHandler,
  dataType,
  dataSubType,
  filterCriteria,
  updateFilterCriteriaDispacher
  }) => {

  const [stateFacility, setStateFacility] = useState(JSON.parse(JSON.stringify(facility)));
  const [applyFilterClicked, setApplyFilterClicked] = useState(false);
  const filterToApply = "Facility";

  useEffect(()=>{
    if(stateFacility.length > 0){
      renderedHandler();
    }// eslint-disable-next-line react-hooks/exhaustive-deps
  },[stateFacility]);

  useEffect(()=>{
    if(applyFilterClicked){
      if(dataType === "EMISSIONS" || (dataSubType === "Account Information" || dataSubType === "Holdings")){
        if(filterCriteria.filterMapping.length>0){
          engageFilterLogic(dataType, dataSubType, filterToApply, JSON.parse(JSON.stringify(filterCriteria)), updateFilterCriteriaDispacher);
        }
      }
      closeFlyOutHandler();
    }// eslint-disable-next-line react-hooks/exhaustive-deps
  }, [facility]);

  const handleApplyFilter = () =>{
    updateFacilitySelectionDispacher(stateFacility);
    if(isAddedToFilters(filterToApply, appliedFilters)){
      removeAppliedFilterDispatcher(filterToApply);
    }
    const selection = stateFacility.filter(e=>e.selected)
    if(selection.length>0){
      addAppliedFilterDispatcher({key:filterToApply, values:selection.map(e=>e.label)});
    }
    setApplyFilterClicked(true);
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
        <h3>Facility</h3>
        <FontAwesomeIcon
          icon={faQuestionCircle}
          className="text-gray-30 font-body-md question-icon"
        />
        <hr />
      </div>
      {
        facility.length > 0 &&
        <>
          <div className="margin-x-2">
            <MultiSelectCombobox
              items={JSON.parse(JSON.stringify(facility))}
              label="Select or Search Facilities/ORIS Codes"
              entity={"facilities"}
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
    facility: state.filterCriteria.facility,
    appliedFilters: state.customDataDownload.appliedFilters,
    dataType: state.customDataDownload.dataType,
    dataSubType: state.customDataDownload.dataSubType,
    filterCriteria: state.filterCriteria,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateFilterCriteriaDispacher: (filterCriteria) => dispatch(updateFilterCriteria(filterCriteria)),
    updateFacilitySelectionDispacher: (facility) => dispatch(updateFacilitySelection(facility)),
    addAppliedFilterDispatcher: (filterToApply) => dispatch(addAppliedFilter(filterToApply)),
    removeAppliedFilterDispatcher: (removedFilter) => dispatch(removeAppliedFilter(removedFilter))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Facility);
