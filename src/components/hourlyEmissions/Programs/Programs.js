import React, { useEffect, useState } from 'react';
import { connect } from "react-redux";
import GenericPrograms from '../../GenericPrograms/GenericPrograms';
import {loadEmissionsPrograms, updateProgramSelection} from "../../../store/actions/customDataDownload/hourlyEmissions/hourlyEmissions";
import {Button} from "@trussworks/react-uswds";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons";

const Programs = ({
  storePrograms,
  appliedFilters,
  loadEmissionsProgramsDispatcher,
  updateProgramSelectionDispatcher,
  loading,
  closeFlyOutHandler}) => {

  const [programs, setPrograms] = useState(JSON.parse(JSON.stringify(storePrograms)));

  const onSelectAllProgramsHandler = (e) =>{
    const newPrograms = [...programs];
    const [groupName, activeString] = e.target.id.split('-');
    const groupIndex = (groupName === 'Annual')? 0:1;
    const active = (activeString==='true');
    newPrograms[groupIndex].items.forEach(i=>{
      if(i.active===active){
        i.selected = e.target.checked
      }
    });
    setPrograms(newPrograms);
  };

  const onSelectProgramHandler = (e) =>{
    const newPrograms = [...programs];
    const groupIndex = (e.target.name === 'Annual')? 0:1;
    const found = newPrograms[groupIndex].items.findIndex(i=>i.id===e.target.id);
    if(found>-1){
      newPrograms[groupIndex].items[found].selected = e.target.checked;
      setPrograms(newPrograms);
    }
  };

  useEffect(()=>{
    if(storePrograms.length===0){
      loadEmissionsProgramsDispatcher();
    }// eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  useEffect(()=>{
    setPrograms(JSON.parse(JSON.stringify(storePrograms)));
  },[storePrograms]);

  const handleApplyFilter = () =>{
    updateProgramSelectionDispatcher(programs);
    closeFlyOutHandler();
  };

  const isApplyFilterEnabled = () =>{
    let annualSelection, ozonSelection;
    if(programs.length===0){
      annualSelection=false;
      ozonSelection=false;
    }else{
      annualSelection = programs[0].items.filter(i=>i.selected).length>0?true:false;
      ozonSelection = programs[1].items.filter(i=>i.selected).length>0?true:false;
    }
    return annualSelection || ozonSelection;
  };

  return (
    <>
      <div className="font-alt-xl text-bold padding-top-2">
        Program
        <FontAwesomeIcon
          icon={faQuestionCircle}
          className="text-gray-30 font-body-md question-icon"
        />
        <hr />
      </div>
      {
        programs.length > 0 && loading===0 &&
        <>
          <div className="display-block maxh-mobile-lg overflow-y-scroll overflow-x-hidden">
            <GenericPrograms
              showActiveRetired={true}
              items={programs}
              showActive={true}
              showRetired={true}
              enableSelectAll={true}
              onSelectAll={onSelectAllProgramsHandler}
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
              disabled={!isApplyFilterEnabled()}
              onClick={handleApplyFilter}
            >
              Apply Filter
            </Button>
          </div>
        </>
      }
      {
        loading>0 && programs.length===0 &&
        <span className="font-alt-sm text-bold">Loading...</span>
      }
    </>
  );
}


const mapStateToProps = (state) => {
  return {
    storePrograms: state.hourlyEmissions.programs,
    appliedFilters: state.customDataDownload.appliedFilters,
    loading: state.apiCallsInProgress
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadEmissionsProgramsDispatcher: () => dispatch(loadEmissionsPrograms()),
    updateProgramSelectionDispatcher: (programs) => dispatch(updateProgramSelection(programs))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Programs);
