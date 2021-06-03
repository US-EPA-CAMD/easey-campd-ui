import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Button } from '@trussworks/react-uswds';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';

import UnitCheckboxRenderer from '../../UnitCheckboxRenderer/UnitCheckboxRenderer';
import {
  loadControlTechnologies,
  updateControlTechnologySelection,
} from '../../../store/actions/customDataDownload/filterCriteria';
import {
  addAppliedFilter,
  removeAppliedFilter,
} from '../../../store/actions/customDataDownload/customDataDownload';
import { getSelectedIds } from '../../../utils/selectors/filterCriteria';
import { isAddedToFilters } from '../../../utils/selectors/general';

const ControlTechnology = ({
  storeControlTechnology,
  appliedFilters,
  loadControlTechnologiesDispatcher,
  updateControlTechnologySelectionDispatcher,
  addAppliedFilterDispatcher,
  removeAppliedFilterDispatcher,
  loading,
  closeFlyOutHandler,
}) => {
  const [controlTechnology, setControlTechnologies] = useState(
    JSON.parse(JSON.stringify(storeControlTechnology))
  );

  const filterToApply = 'Control Technology';

  const onSelectAllControlTechnologiesHandler = (e) => {
    const newControlTechnologies = [...controlTechnology];
    const groupIndex = newControlTechnologies.findIndex(
      (group) => group.name === e.target.id
    );
    newControlTechnologies[groupIndex].items.forEach((i) => {
      i.selected = e.target.checked;
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

  useEffect(() => {
    if (storeControlTechnology.length === 0) {
      loadControlTechnologiesDispatcher();
    } // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setControlTechnologies(JSON.parse(JSON.stringify(storeControlTechnology)));
  }, [storeControlTechnology]);

  const handleApplyFilter = () => {
    updateControlTechnologySelectionDispatcher(controlTechnology);
    if (isAddedToFilters(filterToApply, appliedFilters)) {
      removeAppliedFilterDispatcher(filterToApply);
    }
    const selection = getSelectedIds(controlTechnology);
    if (selection.length > 0) {
      addAppliedFilterDispatcher({ key: filterToApply, values: selection });
    }
    closeFlyOutHandler();
  };

  return (
    <>
      <div className="panel-header padding-top-2 margin-x-2">
        Control Technology
        <FontAwesomeIcon
          icon={faQuestionCircle}
          className="text-gray-30 font-body-md question-icon"
        />
        <hr />
      </div>
      {controlTechnology.length > 0 && loading === 0 && (
        <>
          <div className="display-block maxh-mobile-lg overflow-y-scroll overflow-x-hidden">
            <UnitCheckboxRenderer
              items={controlTechnology}
              enableSelectAll={true}
              onSelectAll={onSelectAllControlTechnologiesHandler}
              onSelectItem={onSelectControlTechnologyHandler}
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
      )}
      {loading > 0 && controlTechnology.length === 0 && (
        <span className="font-alt-sm text-bold margin-x-2">Loading...</span>
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    storeControlTechnology: state.filterCriteria.controlTechnology,
    appliedFilters: state.customDataDownload.appliedFilters,
    loading: state.apiCallsInProgress,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadControlTechnologiesDispatcher: () => dispatch(loadControlTechnologies()),
    updateControlTechnologySelectionDispatcher: (controlTechnology) =>
      dispatch(updateControlTechnologySelection(controlTechnology)),
    addAppliedFilterDispatcher: (filterToApply) =>
      dispatch(addAppliedFilter(filterToApply)),
    removeAppliedFilterDispatcher: (removedFilter) =>
      dispatch(removeAppliedFilter(removedFilter)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ControlTechnology);
