import React, { useEffect, useState } from 'react';
import { connect } from "react-redux";
import {Button} from "@trussworks/react-uswds";
import { Help } from '@material-ui/icons';

import MultiSelectCombobox from '../../MultiSelectCombobox/MultiSelectCombobox';
import { updateFilterCriteria, updateFacilitySelection} from "../../../store/actions/customDataDownload/filterCriteria";
import { addAppliedFilter, removeAppliedFilter } from "../../../store/actions/customDataDownload/customDataDownload";
import {isAddedToFilters} from "../../../utils/selectors/general";
import { engageFilterLogic } from "../../../utils/selectors/filterLogic";
import Tooltip from '../../Tooltip/Tooltip';

const Facility = ({
  facility,
  appliedFilters,
  updateFacilitySelectionDispatcher,
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
      if(filterCriteria.filterMapping.length>0){
        engageFilterLogic(dataType, dataSubType, filterToApply, JSON.parse(JSON.stringify(filterCriteria)), updateFilterCriteriaDispatcher, setApplyFilterLoading);
      } else {
        setApplyFilterLoading(false)
      }
      closeFlyOutHandler();
    }// eslint-disable-next-line react-hooks/exhaustive-deps
  }, [facility]);

  useEffect(()=>{
    if(applyFilterLoading){
      updateFacilitySelectionDispatcher(stateFacility);
      if(isAddedToFilters(filterToApply, appliedFilters)){
        removeAppliedFilterDispatcher(filterToApply);
      }
      const selection = stateFacility.filter(e=>e.selected)
      if(selection.length>0){
        addAppliedFilterDispatcher({key:filterToApply, values:selection.map(e=>e.label)});
      }
      setApplyFilterClicked(true);
    }//eslint-disable-next-line react-hooks/exhaustive-deps
  }, [applyFilterLoading]);

  const handleApplyFilter = () =>{
    setApplyFilterLoading(true);
  };

  const onChangeUpdate = (id, updateType) =>{
    const stateCopy = [...stateFacility];
    const found =stateCopy.find(e=> e.id.toString()===id.toString());
    if(found){
      updateType==="add"? found.selected = true : found.selected = false;
    }
    setStateFacility([...stateCopy]);
  }

  return (
    <>
      <div className="panel-header padding-top-2 margin-x-2">
        <h3>Facility</h3>
        <Tooltip
          content="ORIS Code: Facility ID Code assigned by the U.S. Energy Information Administration. Also known as ORISPL or Plant ID Code."
          field="Facility"
        >
          <Help
            className="text-primary margin-left-1 margin-bottom-1"
            fontSize="small"
          />
        </Tooltip>
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
    updateFilterCriteriaDispatcher: (filterCriteria) => dispatch(updateFilterCriteria(filterCriteria)),
    updateFacilitySelectionDispatcher: (facility) => dispatch(updateFacilitySelection(facility)),
    addAppliedFilterDispatcher: (filterToApply) => dispatch(addAppliedFilter(filterToApply)),
    removeAppliedFilterDispatcher: (removedFilter) => dispatch(removeAppliedFilter(removedFilter))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Facility);