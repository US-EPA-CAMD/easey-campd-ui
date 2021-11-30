import React, { useEffect, useState } from 'react';
import { connect } from "react-redux";
import CheckboxGroupRenderer from '../../CheckboxGroupRenderer/CheckboxGroupRenderer';
import { updateFilterCriteria, updateProgramSelection } from "../../../store/actions/customDataDownload/filterCriteria";
import { addAppliedFilter, removeAppliedFilter } from "../../../store/actions/customDataDownload/customDataDownload";
import { getSelectedIds, getApplicablePrograms } from "../../../utils/selectors/filterCriteria";
import { engageFilterLogic } from "../../../utils/selectors/filterLogic";
import { isAddedToFilters } from '../../../utils/selectors/general';
import {Button} from "@trussworks/react-uswds";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons";

export const Program = ({
  storeProgram,
  appliedFilters,
  updateFilterCriteriaDispacher,
  updateProgramSelectionDispatcher,
  addAppliedFilterDispatcher,
  removeAppliedFilterDispatcher,
  closeFlyOutHandler,
  dataType,
  dataSubType,
  showActiveOnly=false,
  renderedHandler,
  filterCriteria}) => {

  const [program, setPrograms] = useState(JSON.parse(JSON.stringify(getApplicablePrograms(storeProgram, dataSubType))));
  const [applyFilterClicked, setApplyFilterClicked] = useState(false);
  const filterToApply = "Program";

  useEffect(()=>{
    if(program.length > 0){
      renderedHandler();
    }// eslint-disable-next-line react-hooks/exhaustive-deps
  },[program]);

  useEffect(()=>{
    if(applyFilterClicked){
      if(dataType === "EMISSIONS" || dataSubType === "Account Information" || dataSubType === "Holdings"){
        if(filterCriteria.filterMapping.length>0){
          engageFilterLogic(dataType, dataSubType, filterToApply, JSON.parse(JSON.stringify(filterCriteria)), updateFilterCriteriaDispacher);
        }
      }
      closeFlyOutHandler();
    }// eslint-disable-next-line react-hooks/exhaustive-deps
  }, [applyFilterClicked]);


  const onSelectProgramHandler = (e) =>{
    const newPrograms = [...program];
    let found = -1;
    newPrograms.forEach(group =>{
      if(group.name === e.target.name){
        found = group.items.findIndex(i=>i.id===e.target.id);
        if(found>-1){
          group.items[found].selected = e.target.checked;
          setPrograms(newPrograms);
        }
      }
    })
  };

  const handleApplyFilter = () =>{
    updateProgramSelectionDispatcher(program);
    if(isAddedToFilters(filterToApply, appliedFilters)){
      removeAppliedFilterDispatcher(filterToApply);
    }
    const selection = getSelectedIds(program);
    if(selection.length>0){
      addAppliedFilterDispatcher({key:filterToApply, values:selection});
    }
    setApplyFilterClicked(true);
  };

  return (
    <>
      <div className="panel-header padding-top-2 margin-x-2">
        <h3>Program</h3>
        <FontAwesomeIcon
          icon={faQuestionCircle}
          className="text-gray-30 font-body-md question-icon"
        />
        <hr />
      </div>
      {
        program.length > 0 &&
        <>
          <div className="display-block maxh-mobile-lg overflow-y-scroll overflow-x-hidden">
            <CheckboxGroupRenderer
              showActiveRetired={true}
              items={program}
              showActive={true}
              showRetired={!showActiveOnly}
              enableSelectAll={false}
              onSelectItem={onSelectProgramHandler}
            />
          </div>
          <hr />
          <div className="margin-top-3">
            <Button type="button" outline onClick={closeFlyOutHandler}>
              Cancel
            </Button>
            <Button
              type="button"
              className="float-right"
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
    storeProgram: state.filterCriteria.program,
    filterCriteria: state.filterCriteria,
    appliedFilters: state.customDataDownload.appliedFilters,
    dataType: state.customDataDownload.dataType,
    dataSubType: state.customDataDownload.dataSubType,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateProgramSelectionDispatcher: (program) => dispatch(updateProgramSelection(program)),
    addAppliedFilterDispatcher: (filterToApply) => dispatch(addAppliedFilter(filterToApply)),
    removeAppliedFilterDispatcher: (removedFilter) => dispatch(removeAppliedFilter(removedFilter)),
    updateFilterCriteriaDispacher: (filterCriteria) => dispatch(updateFilterCriteria(filterCriteria)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Program);
