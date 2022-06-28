import React, { useEffect, useState } from 'react';
import { connect } from "react-redux";
import {Button} from "@trussworks/react-uswds";
import { Help } from '@material-ui/icons';

import MultiSelectCombobox from '../../../MultiSelectCombobox/MultiSelectCombobox';
import { updateFilterCriteria, updateTimePeriod } from "../../../../store/actions/customDataDownload/filterCriteria";
import { addAppliedFilter, removeAppliedFilter } from "../../../../store/actions/customDataDownload/customDataDownload";
import { isAddedToFilters } from "../../../../utils/selectors/general";
import { engageFilterLogic } from "../../../../utils/selectors/filterLogic";
import Tooltip from '../../../Tooltip/Tooltip';

const TimePeriodComboBox = ({
  timePeriod,
  appliedFilters,
  updateTimePeriodDispatcher,
  addAppliedFilterDispatcher,
  removeAppliedFilterDispatcher,
  closeFlyOutHandler,
  renderedHandler,
  filterToApply,
  dataType,
  dataSubType,
  filterCriteria,
  updateFilterCriteriaDispatcher,
  applyFilterLoading,
  setApplyFilterLoading,
  }) => {

  const [yearsArray, setYearsArray] = useState(JSON.parse(JSON.stringify(timePeriod.comboBoxYear)));
  const [applyFilterClicked, setApplyFilterClicked] = useState(false);

  let tooltip;

  if (dataType === "ALLOWANCE") {
    tooltip =
      "All allowances have an associated vintage year.  This is the first year an allowance may be used in compliance. For more information on vintage years, use the Allowance Data Guide in the Tutorials section.";
  }
  if (dataType === "COMPLIANCE") {
    tooltip = "Compliance is assessed on an annual basis.";
  }

  useEffect(()=>{
    if(yearsArray.length > 0){
      renderedHandler();
    }// eslint-disable-next-line react-hooks/exhaustive-deps
  },[yearsArray]);

  useEffect(()=>{
    if(applyFilterClicked){
      if(dataSubType === "Holdings" || dataSubType === "Transactions" || dataType === "COMPLIANCE"){
        if(filterCriteria.filterMapping.length>0){
          engageFilterLogic(dataType, dataSubType, filterToApply, JSON.parse(JSON.stringify(filterCriteria)), updateFilterCriteriaDispatcher, setApplyFilterLoading);
        } else {
          setApplyFilterLoading(false)
        }
      } else {
        setApplyFilterLoading(false)
      }
      closeFlyOutHandler();
    }// eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timePeriod.comboBoxYear]);

  useEffect(()=>{
    if(applyFilterLoading){
      updateTimePeriodDispatcher({
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
      setApplyFilterClicked(true);
    }//eslint-disable-next-line react-hooks/exhaustive-deps
  }, [applyFilterLoading]);

  const handleApplyFilter = () =>{
    setApplyFilterLoading(true);
  };

  const onChangeUpdate = (id, updateType) =>{
    const stateCopy = [...yearsArray];
    const found =stateCopy.find(e=> e.id.toString()===id.toString());
    if(found){
      updateType==="add"? found.selected = true : found.selected = false;
    }
    setYearsArray([...stateCopy]);
  }

  return (
    <>
      <div className="panel-header padding-top-2 margin-x-2">
        <h3>{filterToApply}</h3>
        <Tooltip content={tooltip} field={filterToApply}>
          <Help
            className=" text-primary margin-left-1 margin-bottom-1"
            fontSize="small"
          />
        </Tooltip>
      </div>
      {
        timePeriod.comboBoxYear.length > 0 &&
        <>
          <div className="margin-x-2">
            <MultiSelectCombobox
              items={JSON.parse(JSON.stringify(timePeriod.comboBoxYear))}
              label={`Select or Search ${filterToApply}s`}
              entity={`${filterToApply.toLowerCase()}s`}
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
    dataType: state.customDataDownload.dataType,
    dataSubType: state.customDataDownload.dataSubType,
    filterCriteria: state.filterCriteria,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateTimePeriodDispatcher: (timePeriod) => dispatch(updateTimePeriod(timePeriod)),
    addAppliedFilterDispatcher: (filterToApply) => dispatch(addAppliedFilter(filterToApply)),
    removeAppliedFilterDispatcher: (removedFilter) => dispatch(removeAppliedFilter(removedFilter)),
    updateFilterCriteriaDispatcher: (filterCriteria) => dispatch(updateFilterCriteria(filterCriteria)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TimePeriodComboBox);
