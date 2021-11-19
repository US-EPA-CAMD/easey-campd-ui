import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Button } from '@trussworks/react-uswds';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';

import CheckboxGroupRenderer from '../../CheckboxGroupRenderer/CheckboxGroupRenderer';
import { updateFilterCriteria, updateControlTechnologySelection} from '../../../store/actions/customDataDownload/filterCriteria';
import { addAppliedFilter, removeAppliedFilter } from '../../../store/actions/customDataDownload/customDataDownload';
import { getSelectedIds } from '../../../utils/selectors/filterCriteria';
import { isAddedToFilters } from '../../../utils/selectors/general';
import { engageFilterLogic } from "../../../utils/selectors/filterLogic";

export const ControlTechnology = ({
  storeControlTechnology,
  appliedFilters,
  updateFilterCriteriaDispacher,
  updateControlTechnologySelectionDispatcher,
  addAppliedFilterDispatcher,
  removeAppliedFilterDispatcher,
  closeFlyOutHandler,
  renderedHandler,
  dataType,
  dataSubType,
  filterCriteria
}) => {
  const [controlTechnology, setControlTechnologies] = useState(
    JSON.parse(JSON.stringify(storeControlTechnology))
  );
  const [applyFilterClicked, setApplyFilterClicked] = useState(false);
  const filterToApply = 'Control Technology';

  useEffect(() => {
    if(controlTechnology.length > 0){
      renderedHandler();
    }// eslint-disable-next-line react-hooks/exhaustive-deps
  }, [controlTechnology]);

  useEffect(()=>{
    if(applyFilterClicked){
      if(dataType === "EMISSIONS"){
        if(filterCriteria.filterMapping.length>0){
          engageFilterLogic(dataType, dataSubType, filterToApply, JSON.parse(JSON.stringify(filterCriteria)), updateFilterCriteriaDispacher);
        }
      }
      closeFlyOutHandler();
    }// eslint-disable-next-line react-hooks/exhaustive-deps
  }, [applyFilterClicked]);

  const onSelectAllControlTechnologiesHandler = (e) => {
    const newControlTechnologies = [...controlTechnology];
    const groupIndex = newControlTechnologies.findIndex(
      (group) => group.name === e.target.id
    );
    newControlTechnologies[groupIndex].items.forEach((i) => {
      i.selected = i.enabled && e.target.checked;
    });
    setControlTechnologies(newControlTechnologies);
  };

  const onSelectControlTechnologyHandler = (e) => {
    const newControlTechnologies = [...controlTechnology];
    const groupIndex = newControlTechnologies.findIndex(
      (group) => group.name === e.target.name
    );
    const found = newControlTechnologies[groupIndex].items.findIndex(
      (i) => i.id === e.target.id
    );
    if (found > -1) {
      newControlTechnologies[groupIndex].items[found].selected = e.target.checked;
      setControlTechnologies(newControlTechnologies);
    }
  };

  const handleApplyFilter = () => {
    updateControlTechnologySelectionDispatcher(controlTechnology);
    if (isAddedToFilters(filterToApply, appliedFilters)) {
      removeAppliedFilterDispatcher(filterToApply);
    }
    const selection = getSelectedIds(controlTechnology);
    if (selection.length > 0) {
      addAppliedFilterDispatcher({ key: filterToApply, values: selection });
    }
    setApplyFilterClicked(true);
  };

  return (
    <>
      <div className="panel-header padding-top-2 margin-x-2">
        <h3>Control Technology</h3>
        <FontAwesomeIcon
          icon={faQuestionCircle}
          className="text-gray-30 font-body-md question-icon"
        />
        <hr />
      </div>
      {controlTechnology.length > 0 && (
        <>
          <div className="display-block maxh-mobile-lg overflow-y-scroll overflow-x-hidden">
            <CheckboxGroupRenderer
              items={controlTechnology}
              enableSelectAll={true}
              onSelectAll={onSelectAllControlTechnologiesHandler}
              onSelectItem={onSelectControlTechnologyHandler}
              showActiveRetired={false}
            />
          </div>
          <hr />
          <div className="margin-top-3">
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
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    storeControlTechnology: state.filterCriteria.controlTechnology,
    filterCriteria: state.filterCriteria,
    appliedFilters: state.customDataDownload.appliedFilters,
    dataType: state.customDataDownload.dataType,
    dataSubType: state.customDataDownload.dataSubType,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateFilterCriteriaDispacher: (filterCriteria) => 
      dispatch(updateFilterCriteria(filterCriteria)),
    updateControlTechnologySelectionDispatcher: (controlTechnology) =>
      dispatch(updateControlTechnologySelection(controlTechnology)),
    addAppliedFilterDispatcher: (filterToApply) =>
      dispatch(addAppliedFilter(filterToApply)),
    removeAppliedFilterDispatcher: (removedFilter) =>
      dispatch(removeAppliedFilter(removedFilter)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ControlTechnology);
