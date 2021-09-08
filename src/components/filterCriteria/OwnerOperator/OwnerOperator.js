import React, { useEffect, useState } from 'react';
import { connect } from "react-redux";
import MultiSelectCombobox from '../../MultiSelectCombobox/MultiSelectCombobox';
import { loadOwnerOperators, updateOwnerOperatorSelection } from "../../../store/actions/customDataDownload/filterCriteria";
import { addAppliedFilter, removeAppliedFilter } from "../../../store/actions/customDataDownload/customDataDownload";
import { isAddedToFilters } from "../../../utils/selectors/general";
import {Button} from "@trussworks/react-uswds";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons";

const OwnerOperator = ({
  ownerOperator,
  dataSubType,
  appliedFilters,
  loadownerOperatorsDispatcher,
  updateOwnerOperatorDispacher,
  addAppliedFilterDispatcher,
  removeAppliedFilterDispatcher,
  loading,
  closeFlyOutHandler,
  renderedHandler}) => {

  const [_ownerOperator, setOwnerOperator] = useState(JSON.parse(JSON.stringify(ownerOperator)));

  const filterToApply = "Owner/Operator";

  useEffect(()=>{
    if(ownerOperator.length===0){
      loadownerOperatorsDispatcher(dataSubType);
    }else{
      if(_ownerOperator.length===0){
        setOwnerOperator(JSON.parse(JSON.stringify(ownerOperator)));
      }
      renderedHandler();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[ownerOperator]);

  const handleApplyFilter = () =>{
    updateOwnerOperatorDispacher(_ownerOperator);
    if(isAddedToFilters(filterToApply, appliedFilters)){
      removeAppliedFilterDispatcher(filterToApply);
    }
    const selection = _ownerOperator.filter(e=>e.selected)
    if(selection.length>0){
      addAppliedFilterDispatcher({key:filterToApply, values:selection.map(e=>e.label)});
    }
    closeFlyOutHandler();
  };

  const onChangeUpdate = (id, updateType) =>{
    const opCopy = [..._ownerOperator];
    const found =opCopy.find(e=> e.id===id);
    if(found){
      updateType==="add"? found.selected = true : found.selected = false;
    }
    setOwnerOperator([...opCopy]);
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
        _ownerOperator.length > 0 && loading===0 &&
        <>
          <div className="margin-x-2">
            <MultiSelectCombobox
              items={JSON.parse(JSON.stringify(_ownerOperator))}
              label="Select or Search Owners/Operators"
              entity={"owners/operators"}
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
        loading>0 && ownerOperator.length===0 &&
        <span className="font-alt-sm text-bold margin-x-2">Loading...</span>
      }
    </>
  );
}


const mapStateToProps = (state) => {
  return {
    dataSubType: state.customDataDownload.dataSubType,
    ownerOperator: state.filterCriteria.ownerOperator,
    appliedFilters: state.customDataDownload.appliedFilters,
    loading: state.apiCallsInProgress
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadownerOperatorsDispatcher: (dataSubType) => dispatch(loadOwnerOperators(dataSubType)),
    updateOwnerOperatorDispacher: (ownerOperator) => dispatch(updateOwnerOperatorSelection(ownerOperator)),
    addAppliedFilterDispatcher: (filterToApply) => dispatch(addAppliedFilter(filterToApply)),
    removeAppliedFilterDispatcher: (removedFilter) => dispatch(removeAppliedFilter(removedFilter))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(OwnerOperator);
