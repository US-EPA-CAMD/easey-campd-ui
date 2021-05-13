import React, { useEffect, useState } from 'react';
import { connect } from "react-redux";
import ProgramRenderer from '../../ProgramRenderer/ProgramRenderer';
import {loadEmissionsPrograms, updateProgramSelection} from "../../../store/actions/customDataDownload/hourlyEmissions/hourlyEmissions";
import { addAppliedFilter, removeAppliedFilter } from "../../../store/actions/customDataDownload/customDataDownload";
import {isAddedToFilters, getSelectedProgramIds} from "../../../utils/selectors/hourlyEmissions";
import {Button} from "@trussworks/react-uswds";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons";

const Program = ({
  storeProgram,
  appliedFilters,
  loadEmissionsProgramsDispatcher,
  updateProgramSelectionDispatcher,
  addAppliedFilterDispatcher,
  removeAppliedFilterDispatcher,
  loading,
  closeFlyOutHandler}) => {

  const [program, setPrograms] = useState(JSON.parse(JSON.stringify(storeProgram)));

  const filterToApply = "Program";

  // const onSelectAllProgramsHandler = (e) =>{
  //   const newPrograms = [...program];
  //   const [groupName, activeString] = e.target.id.split('-');
  //   const groupIndex = (groupName === 'Annual')? 0:1;
  //   const active = (activeString==='true');
  //   newPrograms[groupIndex].items.forEach(i=>{
  //     if(i.active===active){
  //       i.selected = e.target.checked
  //     }
  //   });
  //   setPrograms(newPrograms);
  // };

  const onSelectProgramHandler = (e) =>{
    const newPrograms = [...program];
    const groupIndex = (e.target.name === 'Annual')? 0:1;
    const found = newPrograms[groupIndex].items.findIndex(i=>i.id===e.target.id);
    if(found>-1){
      newPrograms[groupIndex].items[found].selected = e.target.checked;
      setPrograms(newPrograms);
    }
  };

  useEffect(()=>{
    if(storeProgram.length===0){
      loadEmissionsProgramsDispatcher();
    }// eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  useEffect(()=>{
    setPrograms(JSON.parse(JSON.stringify(storeProgram)));
  },[storeProgram]);

  const handleApplyFilter = () =>{
    updateProgramSelectionDispatcher(program);
    if(isAddedToFilters(filterToApply, appliedFilters)){
      removeAppliedFilterDispatcher(filterToApply);
    }
    const selection = getSelectedProgramIds(program);
    if(selection.length>0){
      addAppliedFilterDispatcher({key:filterToApply, values:selection});
    }
    closeFlyOutHandler();
  };

  // const isApplyFilterEnabled = () =>{
  //   let annualSelection, ozonSelection;
  //   if(program.length===0){
  //     annualSelection=false;
  //     ozonSelection=false;
  //   }else{
  //     annualSelection = program[0].items.filter(i=>i.selected).length>0?true:false;
  //     ozonSelection = program[1].items.filter(i=>i.selected).length>0?true:false;
  //   }
  //   return annualSelection || ozonSelection;
  // };

  return (
    <>
      <div className="panel-header padding-top-2 margin-x-2">
        Program
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
            <ProgramRenderer
              showActiveRetired={true}
              items={program}
              showActive={true}
              showRetired={true}
              enableSelectAll={false}
              //onSelectAll={onSelectAllProgramsHandler}
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
              //disabled={!isApplyFilterEnabled()}
              onClick={handleApplyFilter}
            >
              Apply Filter
            </Button>
          </div>
        </>
      }
      {
        loading>0 && program.length===0 &&
        <span className="font-alt-sm text-bold margin-x-2">Loading...</span>
      }
    </>
  );
}


const mapStateToProps = (state) => {
  return {
    storeProgram: state.hourlyEmissions.program,
    appliedFilters: state.customDataDownload.appliedFilters,
    loading: state.apiCallsInProgress
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadEmissionsProgramsDispatcher: () => dispatch(loadEmissionsPrograms()),
    updateProgramSelectionDispatcher: (program) => dispatch(updateProgramSelection(program)),
    addAppliedFilterDispatcher: (filterToApply) => dispatch(addAppliedFilter(filterToApply)),
    removeAppliedFilterDispatcher: (removedFilter) => dispatch(removeAppliedFilter(removedFilter))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Program);
