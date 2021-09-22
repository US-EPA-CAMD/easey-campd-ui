import React, { useEffect, useState } from 'react';
import { connect } from "react-redux";
import CheckboxGroupRenderer from '../../CheckboxGroupRenderer/CheckboxGroupRenderer';
import {loadPrograms, updateProgramSelection} from "../../../store/actions/customDataDownload/filterCriteria";
import { addAppliedFilter, removeAppliedFilter } from "../../../store/actions/customDataDownload/customDataDownload";
import { getSelectedIds, getApplicablePrograms } from "../../../utils/selectors/filterCriteria";
import {getProgramsFilteredSet} from "../../../utils/selectors/filterLogic";
import { isAddedToFilters } from '../../../utils/selectors/general';
import {Button} from "@trussworks/react-uswds";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons";

const Program = ({
  storeProgram,
  appliedFilters,
  loadProgramsDispatcher,
  updateProgramSelectionDispatcher,
  addAppliedFilterDispatcher,
  removeAppliedFilterDispatcher,
  loading,
  closeFlyOutHandler,
  dataType,
  dataSubType,
  showActiveOnly=false,
  renderedHandler,
  filterCriteria}) => {

  const [program, setPrograms] = useState(JSON.parse(JSON.stringify(storeProgram)));

  const filterToApply = "Program";

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

  useEffect(()=>{
    if(storeProgram.length===0){
      loadProgramsDispatcher(dataType, showActiveOnly);
    }// eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  useEffect(()=>{
    if(dataType === "EMISSIONS" && filterCriteria.filterMapping.length > 0){
      const programsMDM = JSON.parse(JSON.stringify(getApplicablePrograms(storeProgram, dataSubType)));
      const filteredSet = getProgramsFilteredSet(filterCriteria);
      programsMDM.forEach(p => {
        p.items.forEach(el =>{
          el.enabled = filteredSet.includes(el.id);
        })
      });
      setPrograms(programsMDM);
    }else{
      setPrograms(JSON.parse(JSON.stringify(getApplicablePrograms(storeProgram, dataSubType))));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[storeProgram, filterCriteria.filterMapping]);

  useEffect(()=>{
    if(program.length > 0 && loading===0){
      renderedHandler();
    }// eslint-disable-next-line react-hooks/exhaustive-deps
  },[program, loading]);

  const handleApplyFilter = () =>{
    updateProgramSelectionDispatcher(program);
    if(isAddedToFilters(filterToApply, appliedFilters)){
      removeAppliedFilterDispatcher(filterToApply);
    }
    const selection = getSelectedIds(program);
    if(selection.length>0){
      addAppliedFilterDispatcher({key:filterToApply, values:selection});
    }
    closeFlyOutHandler();
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
        program.length > 0 && loading===0 &&
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
      {
        loading>0 &&
        <span className="font-alt-sm text-bold margin-x-2">Loading...</span>
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
    loading: state.apiCallsInProgress
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadProgramsDispatcher: (dataType, showActiveOnly) => dispatch(loadPrograms(dataType, showActiveOnly)),
    updateProgramSelectionDispatcher: (program) => dispatch(updateProgramSelection(program)),
    addAppliedFilterDispatcher: (filterToApply) => dispatch(addAppliedFilter(filterToApply)),
    removeAppliedFilterDispatcher: (removedFilter) => dispatch(removeAppliedFilter(removedFilter))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Program);
