import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Button } from '@trussworks/react-uswds';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';

import UnitCheckboxRenderer from '../../UnitCheckboxRenderer/UnitCheckboxRenderer';
import {
  loadEmissionsFuelTypes,
  updateFuelTypeSelection,
} from '../../../store/actions/customDataDownload/hourlyEmissions/hourlyEmissions';
import {
  addAppliedFilter,
  removeAppliedFilter,
} from '../../../store/actions/customDataDownload/customDataDownload';
import {
  isAddedToFilters,
  getSelectedIds,
} from '../../../utils/selectors/hourlyEmissions';

const FuelType = ({
  storeFuelType,
  appliedFilters,
  loadEmissionsFuelTypesDispatcher,
  updateFuelTypeSelectionDispatcher,
  addAppliedFilterDispatcher,
  removeAppliedFilterDispatcher,
  loading,
  closeFlyOutHandler,
}) => {
  const [fuelType, setFuelTypes] = useState(
    JSON.parse(JSON.stringify(storeFuelType))
  );

  const filterToApply = 'Unit Fuel Type';

  const onSelectAllFuelTypesHandler = (e) => {
    const newFuelTypes = [...fuelType];
    const groupName = e.target.id;
    const groupIndex = groupName === 'Boilers' ? 0 : 1;
    newFuelTypes[groupIndex].items.forEach((i) => {
      i.selected = e.target.checked;
    });
    setFuelTypes(newFuelTypes);
  };

  const onSelectFuelTypeHandler = (e) => {
    const newFuelTypes = [...fuelType];
    const groupIndex = e.target.name === 'Boilers' ? 0 : 1;
    const found = newFuelTypes[groupIndex].items.findIndex(
      (i) => i.id === e.target.id
    );
    if (found > -1) {
      newFuelTypes[groupIndex].items[found].selected = e.target.checked;
      setFuelTypes(newFuelTypes);
    }
  };

  useEffect(() => {
    if (storeFuelType.length === 0) {
      loadEmissionsFuelTypesDispatcher();
    } // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setFuelTypes(JSON.parse(JSON.stringify(storeFuelType)));
  }, [storeFuelType]);

  const handleApplyFilter = () => {
    updateFuelTypeSelectionDispatcher(fuelType);
    if (isAddedToFilters(filterToApply, appliedFilters)) {
      removeAppliedFilterDispatcher(filterToApply);
    }
    const selection = getSelectedIds(fuelType);
    if (selection.length > 0) {
      addAppliedFilterDispatcher({ key: filterToApply, values: selection });
    }
    closeFlyOutHandler();
  };

  return (
    <>
      <div className="panel-header padding-top-2 margin-x-2">
        Unit Fuel Type
        <FontAwesomeIcon
          icon={faQuestionCircle}
          className="text-gray-30 font-body-md question-icon"
        />
        <hr />
      </div>
      {fuelType.length > 0 && loading === 0 && (
        <>
          <div className="display-block maxh-mobile-lg overflow-y-scroll overflow-x-hidden">
            <UnitCheckboxRenderer
              items={fuelType}
              enableSelectAll={true}
              onSelectAll={onSelectAllFuelTypesHandler}
              onSelectItem={onSelectFuelTypeHandler}
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
      {loading > 0 && fuelType.length === 0 && (
        <span className="font-alt-sm text-bold margin-x-2">Loading...</span>
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    storeFuelType: state.hourlyEmissions.fuelType,
    appliedFilters: state.customDataDownload.appliedFilters,
    loading: state.apiCallsInProgress,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadEmissionsFuelTypesDispatcher: () => dispatch(loadEmissionsFuelTypes()),
    updateFuelTypeSelectionDispatcher: (fuelType) =>
      dispatch(updateFuelTypeSelection(fuelType)),
    addAppliedFilterDispatcher: (filterToApply) =>
      dispatch(addAppliedFilter(filterToApply)),
    removeAppliedFilterDispatcher: (removedFilter) =>
      dispatch(removeAppliedFilter(removedFilter)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FuelType);
