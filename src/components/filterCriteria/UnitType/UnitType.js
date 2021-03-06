import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Button } from '@trussworks/react-uswds';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';

import CheckboxGroupRenderer from '../../CheckboxGroupRenderer/CheckboxGroupRenderer';
import {
  loadUnitTypes,
  updateUnitTypeSelection,
} from '../../../store/actions/customDataDownload/filterCriteria';
import {
  addAppliedFilter,
  removeAppliedFilter,
} from '../../../store/actions/customDataDownload/customDataDownload';
import { getSelectedIds } from '../../../utils/selectors/filterCriteria';
import { isAddedToFilters } from '../../../utils/selectors/general';

const UnitType = ({
  storeUnitType,
  appliedFilters,
  loadUnitTypesDispatcher,
  updateUnitTypeSelectionDispatcher,
  addAppliedFilterDispatcher,
  removeAppliedFilterDispatcher,
  loading,
  closeFlyOutHandler,
  renderedHandler
}) => {
  const [unitType, setUnitTypes] = useState(
    JSON.parse(JSON.stringify(storeUnitType))
  );

  const filterToApply = 'Unit Type';

  const onSelectAllUnitTypesHandler = (e) => {
    const newUnitTypes = [...unitType];
    const groupIndex = newUnitTypes.findIndex(
      (group) => group.name === e.target.id
    );
    newUnitTypes[groupIndex].items.forEach((i) => {
      i.selected = e.target.checked;
    });
    setUnitTypes(newUnitTypes);
  };

  const onSelectUnitTypeHandler = (e) => {
    const newUnitTypes = [...unitType];
    const groupIndex = newUnitTypes.findIndex(
      (group) => group.name === e.target.name
    );
    const found = newUnitTypes[groupIndex].items.findIndex(
      (i) => i.id === e.target.id
    );
    if (found > -1) {
      newUnitTypes[groupIndex].items[found].selected = e.target.checked;
      setUnitTypes(newUnitTypes);
    }
  };

  useEffect(() => {
    if (storeUnitType.length === 0) {
      loadUnitTypesDispatcher();
    } // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setUnitTypes(JSON.parse(JSON.stringify(storeUnitType)));
  }, [storeUnitType]);

  useEffect(() => {
    if(unitType.length > 0 && loading === 0){
      renderedHandler();
    }// eslint-disable-next-line react-hooks/exhaustive-deps
  }, [unitType, loading]);

  const handleApplyFilter = () => {
    updateUnitTypeSelectionDispatcher(unitType);
    if (isAddedToFilters(filterToApply, appliedFilters)) {
      removeAppliedFilterDispatcher(filterToApply);
    }
    const selection = getSelectedIds(unitType);
    if (selection.length > 0) {
      addAppliedFilterDispatcher({ key: filterToApply, values: selection });
    }
    closeFlyOutHandler();
  };

  return (
    <>
      <div className="panel-header padding-top-2 margin-x-2">
        <h3>Unit Type</h3>
        <FontAwesomeIcon
          icon={faQuestionCircle}
          className="text-gray-30 font-body-md question-icon"
        />
        <hr />
      </div>
      {unitType.length > 0 && loading === 0 && (
        <>
          <div className="display-block maxh-mobile-lg overflow-y-scroll overflow-x-hidden">
            <CheckboxGroupRenderer
              items={unitType}
              enableSelectAll={true}
              onSelectAll={onSelectAllUnitTypesHandler}
              onSelectItem={onSelectUnitTypeHandler}
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
      {loading > 0 && unitType.length === 0 && (
        <span className="font-alt-sm text-bold margin-x-2">Loading...</span>
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    storeUnitType: state.filterCriteria.unitType,
    appliedFilters: state.customDataDownload.appliedFilters,
    loading: state.apiCallsInProgress,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadUnitTypesDispatcher: () => dispatch(loadUnitTypes()),
    updateUnitTypeSelectionDispatcher: (unitType) =>
      dispatch(updateUnitTypeSelection(unitType)),
    addAppliedFilterDispatcher: (filterToApply) =>
      dispatch(addAppliedFilter(filterToApply)),
    removeAppliedFilterDispatcher: (removedFilter) =>
      dispatch(removeAppliedFilter(removedFilter)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UnitType);
