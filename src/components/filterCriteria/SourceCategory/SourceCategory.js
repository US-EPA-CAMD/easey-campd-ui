import React, { useEffect, useState } from 'react';
import { connect } from "react-redux";
import {Button} from "@trussworks/react-uswds";
import { Help } from '@material-ui/icons';

import MultiSelectCombobox from '../../MultiSelectCombobox/MultiSelectCombobox';
import { updateFilterCriteria, updateSourceCategorySelection} from "../../../store/actions/customDataDownload/filterCriteria";
import { addAppliedFilter, removeAppliedFilter } from "../../../store/actions/customDataDownload/customDataDownload";
import { isAddedToFilters } from "../../../utils/selectors/general";
import { engageFilterLogic } from "../../../utils/selectors/filterLogic";
import Tooltip from '../../Tooltip/Tooltip';

const SourceCategory = ({
  sourceCategory,
  appliedFilters,
  updateFilterCriteriaDispatcher,
  updateSourceCategorySelectionDispatcher,
  addAppliedFilterDispatcher,
  removeAppliedFilterDispatcher,
  closeFlyOutHandler,
  renderedHandler,
  dataType,
  dataSubType,
  filterCriteria
  }) => {

  const [_sourceCategory, setSourceCategory] = useState(JSON.parse(JSON.stringify(sourceCategory)));
  const [applyFilterClicked, setApplyFilterClicked] = useState(false);
  const filterToApply = "Source Category";

  useEffect(()=>{
    if(_sourceCategory.length > 0){
      renderedHandler();
    }// eslint-disable-next-line react-hooks/exhaustive-deps
  },[_sourceCategory]);

  useEffect(()=>{
    if(applyFilterClicked){
      if(dataType === "EMISSIONS"){
        if(filterCriteria.filterMapping.length>0){
          engageFilterLogic(dataType, dataSubType, filterToApply, JSON.parse(JSON.stringify(filterCriteria)), updateFilterCriteriaDispatcher);
        }
      }
      closeFlyOutHandler();
    }// eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sourceCategory]);

  const handleApplyFilter = () =>{
    updateSourceCategorySelectionDispatcher(_sourceCategory);
    if(isAddedToFilters(filterToApply, appliedFilters)){
      removeAppliedFilterDispatcher(filterToApply);
    }
    const selection = _sourceCategory.filter(e=>e.selected)
    if(selection.length>0){
      addAppliedFilterDispatcher({key:filterToApply, values:selection.map(e=>e.label)});
    }
    setApplyFilterClicked(true);
  };

  const onChangeUpdate = (id, updateType) =>{
    const stateCopy = [..._sourceCategory];
    const found =stateCopy.find(e=> e.id===id);
    if(found){
      updateType==="add"? found.selected = true : found.selected = false;
    }
    setSourceCategory([...stateCopy]);
  }

  return (
    <>
      <div className="panel-header padding-top-2 margin-x-2">
        <h3>{filterToApply}</h3>
        <Tooltip
          content="A source category classifies a unit in terms of its primary function."
          field={filterToApply}
        >
          <Help
            className="text-primary margin-left-1 margin-bottom-1"
            fontSize="small"
          />
        </Tooltip>
        <hr />
      </div>
      {
        _sourceCategory.length > 0 &&
        <>
          <div className="margin-x-2">
            <MultiSelectCombobox
              items={JSON.parse(JSON.stringify(_sourceCategory))}
              label="Select or Search Source Categories"
              entity={"source-categories"}
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
    sourceCategory: state.filterCriteria.sourceCategory,
    appliedFilters: state.customDataDownload.appliedFilters,
    dataType: state.customDataDownload.dataType,
    dataSubType: state.customDataDownload.dataSubType,
    filterCriteria: state.filterCriteria,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateFilterCriteriaDispatcher: (filterCriteria) => dispatch(updateFilterCriteria(filterCriteria)),
    updateSourceCategorySelectionDispatcher: (sourceCategory) => dispatch(updateSourceCategorySelection(sourceCategory)),
    addAppliedFilterDispatcher: (filterToApply) => dispatch(addAppliedFilter(filterToApply)),
    removeAppliedFilterDispatcher: (removedFilter) => dispatch(removeAppliedFilter(removedFilter))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SourceCategory);
