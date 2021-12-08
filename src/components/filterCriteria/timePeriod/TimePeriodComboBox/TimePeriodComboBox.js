import React, { useEffect, useState } from 'react';
import { connect } from "react-redux";
import MultiSelectCombobox from '../../../MultiSelectCombobox/MultiSelectCombobox';
import { updateFilterCriteria, updateTimePeriod } from "../../../../store/actions/customDataDownload/filterCriteria";
import { addAppliedFilter, removeAppliedFilter } from "../../../../store/actions/customDataDownload/customDataDownload";
import { isAddedToFilters } from "../../../../utils/selectors/general";
import {Button} from "@trussworks/react-uswds";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons";

const TimePeriodComboBox = ({
  timePeriod,
  appliedFilters,
  updateTimePeriodDispacher,
  addAppliedFilterDispatcher,
  removeAppliedFilterDispatcher,
  closeFlyOutHandler,
  renderedHandler,
  filterToApply
  }) => {

  const [yearsArray, setYearsArray] = useState(JSON.parse(JSON.stringify(timePeriod.comboBoxYear)));

  useEffect(()=>{
    if(yearsArray.length > 0){
      renderedHandler();
    }// eslint-disable-next-line react-hooks/exhaustive-deps
  },[yearsArray]);

  const handleApplyFilter = () =>{
    updateTimePeriodDispacher({
      ...timePeriod,
      comboBoxYear: yearsArray
    });
    if(isAddedToFilters(filterToApply, appliedFilters)){
      removeAppliedFilterDispatcher(filterToApply);
    }
    const selection = yearsArray.filter(e=>e.selected)
    if(selection.length>0){
      addAppliedFilterDispatcher({key:filterToApply, values: selection.map(e=>e.label)})
    }
    closeFlyOutHandler();
  };

  const onChangeUpdate = (id, updateType) =>{
    const stateCopy = [...yearsArray];
    const found =stateCopy.find(e=> e.id===id);
    if(found){
      updateType==="add"? found.selected = true : found.selected = false;
    }
    setYearsArray([...stateCopy]);
  }

  return (
    <>
      <div className="panel-header padding-top-2 margin-x-2">
        <h3>Vintage Year</h3>
        <FontAwesomeIcon
          icon={faQuestionCircle}
          className="text-gray-30 font-body-md question-icon"
        />
        <hr />
      </div>
      {
        timePeriod.comboBoxYear.length > 0 &&
        <>
          <div className="margin-x-2">
            <MultiSelectCombobox
              items={JSON.parse(JSON.stringify(timePeriod.comboBoxYear))}
              label="Select or Search Vintage Years"
              entity={"vintage-years"}
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
    timePeriod: state.filterCriteria.timePeriod,
    appliedFilters: state.customDataDownload.appliedFilters,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateTimePeriodDispacher: (timePeriod) => dispatch(updateTimePeriod(timePeriod)),
    addAppliedFilterDispatcher: (filterToApply) => dispatch(addAppliedFilter(filterToApply)),
    removeAppliedFilterDispatcher: (removedFilter) => dispatch(removeAppliedFilter(removedFilter)),
    updateFilterCriteriaDispacher: (filterCriteria) => dispatch(updateFilterCriteria(filterCriteria)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TimePeriodComboBox);