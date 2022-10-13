import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import { Button } from '@trussworks/react-uswds';
import { Help } from '@material-ui/icons';

import CheckboxGroupRenderer from '../../CheckboxGroupRenderer/CheckboxGroupRenderer';
import { updateFilterCriteria, updateControlTechnologySelection} from '../../../store/actions/customDataDownload/filterCriteria';
import { addAppliedFilter, removeAppliedFilter } from '../../../store/actions/customDataDownload/customDataDownload';
import { getSelectedIds } from '../../../utils/selectors/filterCriteria';
import { isAddedToFilters } from '../../../utils/selectors/general';
import { engageFilterLogic } from "../../../utils/selectors/filterLogic";
import Tooltip from '../../Tooltip/Tooltip';

export const ControlTechnology = ({
  storeControlTechnology,
  appliedFilters,
  updateFilterCriteriaDispatcher,
  updateControlTechnologySelectionDispatcher,
  addAppliedFilterDispatcher,
  removeAppliedFilterDispatcher,
  closeFlyOutHandler,
  renderedHandler,
  dataType,
  dataSubType,
  filterCriteria,
  setApplyFilterLoading,
}) => {
  const [controlTechnology, setControlTechnologies] = useState(
    JSON.parse(JSON.stringify(storeControlTechnology))
  );
  const fcRef = useRef(filterCriteria);
  fcRef.current = filterCriteria;
  const filterToApply = 'Control Technology';

  useEffect(() => {
    if(controlTechnology.length > 0){
      renderedHandler();
    }// eslint-disable-next-line react-hooks/exhaustive-deps
  }, [controlTechnology]);

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
    setApplyFilterLoading(true);
    setTimeout(async()=>{await updateFilters();
      if(fcRef.current.filterMapping.length>0){
        engageFilterLogic(dataType, dataSubType, filterToApply, JSON.parse(JSON.stringify(fcRef.current)), updateFilterCriteriaDispatcher, setApplyFilterLoading);
      } else {
        setApplyFilterLoading(false)
      }
      closeFlyOutHandler();
    });
  };
  const updateFilters = () => {
    updateControlTechnologySelectionDispatcher(controlTechnology);
    if (isAddedToFilters(filterToApply, appliedFilters)) {
      removeAppliedFilterDispatcher(filterToApply);
    }
    const selection = getSelectedIds(controlTechnology);
    if (selection.length > 0) {
      addAppliedFilterDispatcher({ key: filterToApply, values: selection });
    }
  }

  return (
    <>
      <div className="panel-header padding-top-2 margin-x-2">
        <h3>Control Technology</h3>
        <Tooltip
          content="Units may use one or more methods/equipment to minimize emissions of various pollutants. Methods under the “Other” category may be used to control multiple pollutants."
          field="Control Technology"
        >
          <Help
            className="text-primary margin-left-1 margin-bottom-1"
            fontSize="small"
          />
        </Tooltip>
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
    updateFilterCriteriaDispatcher: (filterCriteria) => 
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
