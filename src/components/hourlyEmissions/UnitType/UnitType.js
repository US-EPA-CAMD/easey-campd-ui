import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Button } from '@trussworks/react-uswds';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';

import UnitCheckboxRenderer from '../../UnitCheckboxRenderer/UnitCheckboxRenderer';
import {
  loadEmissionsUnitTypes,
  updateUnitTypeSelection,
} from '../../../store/actions/customDataDownload/hourlyEmissions/hourlyEmissions';
import {
  addAppliedFilter,
  removeAppliedFilter,
} from '../../../store/actions/customDataDownload/customDataDownload';
import { getSelectedIds } from '../../../utils/selectors/hourlyEmissions';
import { isAddedToFilters } from '../../../utils/selectors/general';

const UnitType = ({
  storeUnitType,
  appliedFilters,
  loadEmissionsUnitTypesDispatcher,
  updateUnitTypeSelectionDispatcher,
  addAppliedFilterDispatcher,
  removeAppliedFilterDispatcher,
  loading,
  closeFlyOutHandler,
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
      loadEmissionsUnitTypesDispatcher();
    } // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setUnitTypes(JSON.parse(JSON.stringify(storeUnitType)));
  }, [storeUnitType]);

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
        Unit Type
        <FontAwesomeIcon
          icon={faQuestionCircle}
          className="text-gray-30 font-body-md question-icon"
        />
        <hr />
      </div>
      {unitType.length > 0 && loading === 0 && (
        <>
          <div className="display-block maxh-mobile-lg overflow-y-scroll overflow-x-hidden">
            <UnitCheckboxRenderer
              items={unitType}
              enableSelectAll={true}
              onSelectAll={onSelectAllUnitTypesHandler}
              onSelectItem={onSelectUnitTypeHandler}
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
      {loading > 0 && unitType.length === 0 && (
        <span className="font-alt-sm text-bold margin-x-2">Loading...</span>
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    storeUnitType: state.hourlyEmissions.unitType,
    appliedFilters: state.customDataDownload.appliedFilters,
    loading: state.apiCallsInProgress,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadEmissionsUnitTypesDispatcher: () => dispatch(loadEmissionsUnitTypes()),
    updateUnitTypeSelectionDispatcher: (unitType) =>
      dispatch(updateUnitTypeSelection(unitType)),
    addAppliedFilterDispatcher: (filterToApply) =>
      dispatch(addAppliedFilter(filterToApply)),
    removeAppliedFilterDispatcher: (removedFilter) =>
      dispatch(removeAppliedFilter(removedFilter)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UnitType);
