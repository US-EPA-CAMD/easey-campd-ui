import React, { useEffect, useState } from 'react';
import { connect } from "react-redux";
import {Button} from "@trussworks/react-uswds";
import { Help } from '@material-ui/icons';

import CheckboxGroupRenderer from '../../CheckboxGroupRenderer/CheckboxGroupRenderer';
import { updateFilterCriteria, updateProgramSelection } from "../../../store/actions/customDataDownload/filterCriteria";
import { addAppliedFilter, removeAppliedFilter } from "../../../store/actions/customDataDownload/customDataDownload";
import { getSelectedIds, getApplicablePrograms } from "../../../utils/selectors/filterCriteria";
import { engageFilterLogic } from "../../../utils/selectors/filterLogic";
import { isAddedToFilters } from '../../../utils/selectors/general';
import Tooltip from '../../Tooltip/Tooltip';

export const Program = ({
  storeProgram,
  appliedFilters,
  updateFilterCriteriaDispatcher,
  updateProgramSelectionDispatcher,
  addAppliedFilterDispatcher,
  removeAppliedFilterDispatcher,
  closeFlyOutHandler,
  dataType,
  dataSubType,
  showActiveOnly=false,
  renderedHandler,
  filterCriteria,
  applyFilterLoading,
  setApplyFilterLoading,
}) => {

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
      if(filterCriteria.filterMapping.length>0){
        engageFilterLogic(dataType, dataSubType, filterToApply, JSON.parse(JSON.stringify(filterCriteria)), updateFilterCriteriaDispatcher, setApplyFilterLoading);
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

  useEffect(()=>{
    if(applyFilterLoading){
      updateProgramSelectionDispatcher(program);
      if(isAddedToFilters(filterToApply, appliedFilters)){
        removeAppliedFilterDispatcher(filterToApply);
      }
      const selection = getSelectedIds(program);
      if(selection.length>0){
        addAppliedFilterDispatcher({key:filterToApply, values:selection});
      }
      setApplyFilterClicked(true);
    }//eslint-disable-next-line react-hooks/exhaustive-deps
  }, [applyFilterLoading]);

  const handleApplyFilter = () =>{
    setApplyFilterLoading(true);
  };


  return (
    <>
      <div className="panel-header padding-top-2 margin-x-2">
        <h3>Program</h3>
        <Tooltip
          content="For more information on Programs, visit the Programs area of Clean Air Markets website."
          field="Program"
        >
          <Help
            className="text-primary margin-left-1 margin-bottom-1"
            fontSize="small"
          />
        </Tooltip>
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
    updateFilterCriteriaDispatcher: (filterCriteria) => dispatch(updateFilterCriteria(filterCriteria)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Program);
