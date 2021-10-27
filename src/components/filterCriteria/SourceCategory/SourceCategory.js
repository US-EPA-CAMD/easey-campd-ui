import React, { useEffect, useState } from 'react';
import { connect } from "react-redux";
import MultiSelectCombobox from '../../MultiSelectCombobox/MultiSelectCombobox';
import {loadSourceCategories, updateSourceCategorySelection} from "../../../store/actions/customDataDownload/filterCriteria";
import { addAppliedFilter, removeAppliedFilter } from "../../../store/actions/customDataDownload/customDataDownload";
import {isAddedToFilters} from "../../../utils/selectors/general";
import {Button} from "@trussworks/react-uswds";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons";

const SourceCategory = ({
  sourceCategory,
  appliedFilters,
  loadSourceCategoriesDispatcher,
  updateSourceCategorySelectionDispacher,
  addAppliedFilterDispatcher,
  removeAppliedFilterDispatcher,
  loading,
  closeFlyOutHandler,
  renderedHandler}) => {

  const [_sourceCategory, setSourceCategory] = useState(JSON.parse(JSON.stringify(sourceCategory)));

  const filterToApply = "Source Category";

  useEffect(()=>{
    if(sourceCategory.length===0){
      loadSourceCategoriesDispatcher();
    }else{
      if(_sourceCategory.length===0){
        setSourceCategory(JSON.parse(JSON.stringify(sourceCategory)));
      }
      renderedHandler();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[sourceCategory]);

  const handleApplyFilter = () =>{
    updateSourceCategorySelectionDispacher(_sourceCategory);
    if(isAddedToFilters(filterToApply, appliedFilters)){
      removeAppliedFilterDispatcher(filterToApply);
    }
    const selection = _sourceCategory.filter(e=>e.selected)
    if(selection.length>0){
      addAppliedFilterDispatcher({key:filterToApply, values:selection.map(e=>e.label)});
    }
    closeFlyOutHandler();
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
        <FontAwesomeIcon
          icon={faQuestionCircle}
          className="text-gray-30 font-body-md question-icon"
        />
        <hr />
      </div>
      {
        _sourceCategory.length > 0 && loading===0 &&
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
      {
        loading>0 && _sourceCategory.length===0 &&
        <span className="font-alt-sm text-bold margin-x-2">Loading...</span>
      }
    </>
  );
}


const mapStateToProps = (state) => {
  return {
    sourceCategory: state.filterCriteria.sourceCategory,
    appliedFilters: state.customDataDownload.appliedFilters,
    loading: state.apiCallsInProgress
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadSourceCategoriesDispatcher: () => dispatch(loadSourceCategories()),
    updateSourceCategorySelectionDispacher: (sourceCategory) => dispatch(updateSourceCategorySelection(sourceCategory)),
    addAppliedFilterDispatcher: (filterToApply) => dispatch(addAppliedFilter(filterToApply)),
    removeAppliedFilterDispatcher: (removedFilter) => dispatch(removeAppliedFilter(removedFilter))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SourceCategory);
