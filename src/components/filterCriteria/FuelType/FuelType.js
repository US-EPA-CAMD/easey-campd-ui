import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Button } from '@trussworks/react-uswds';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';

import CheckboxGroupRenderer from '../../CheckboxGroupRenderer/CheckboxGroupRenderer';
import {
  loadFuelTypes,
  updateFuelTypeSelection,
} from '../../../store/actions/customDataDownload/filterCriteria';
import {
  addAppliedFilter,
  removeAppliedFilter,
} from '../../../store/actions/customDataDownload/customDataDownload';
import { getSelectedIds } from '../../../utils/selectors/filterCriteria';
import { isAddedToFilters } from '../../../utils/selectors/general';

const FuelType = ({
  storeFuelType,
  appliedFilters,
  loadFuelTypesDispatcher,
  updateFuelTypeSelectionDispatcher,
  addAppliedFilterDispatcher,
  removeAppliedFilterDispatcher,
  loading,
  closeFlyOutHandler,
  renderedHandler
}) => {
  const [fuelType, setFuelTypes] = useState(
    JSON.parse(JSON.stringify(storeFuelType))
  );

  const filterToApply = 'Unit Fuel Type';

  const onSelectAllFuelTypesHandler = (e) => {
    const newFuelTypes = [...fuelType];
    const groupIndex = newFuelTypes.findIndex(
      (group) => group.name === e.target.id
    );
    newFuelTypes[groupIndex].items.forEach((i) => {
      i.selected = e.target.checked;
    });
    setFuelTypes(newFuelTypes);
  };

  const onSelectFuelTypeHandler = (e) => {
    const newFuelTypes = [...fuelType];
    const groupIndex = newFuelTypes.findIndex(
      (group) => group.name === e.target.name
    );
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
      loadFuelTypesDispatcher();
    } // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setFuelTypes(JSON.parse(JSON.stringify(storeFuelType)));
  }, [storeFuelType]);

  useEffect(() => {
    if(fuelType.length > 0 && loading === 0){
      renderedHandler();
    }// eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fuelType, loading]);

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
        <h3>Unit Fuel Type</h3>
        <FontAwesomeIcon
          icon={faQuestionCircle}
          className="text-gray-30 font-body-md question-icon"
        />
        <hr />
      </div>
      {fuelType.length > 0 && loading === 0 && (
        <>
          <div className="display-block maxh-mobile-lg overflow-y-scroll overflow-x-hidden">
            <CheckboxGroupRenderer
              items={fuelType}
              enableSelectAll={true}
              onSelectAll={onSelectAllFuelTypesHandler}
              onSelectItem={onSelectFuelTypeHandler}
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
      {loading > 0 && fuelType.length === 0 && (
        <span className="font-alt-sm text-bold margin-x-2">Loading...</span>
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    storeFuelType: state.filterCriteria.fuelType,
    appliedFilters: state.customDataDownload.appliedFilters,
    loading: state.apiCallsInProgress,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadFuelTypesDispatcher: () => dispatch(loadFuelTypes()),
    updateFuelTypeSelectionDispatcher: (fuelType) =>
      dispatch(updateFuelTypeSelection(fuelType)),
    addAppliedFilterDispatcher: (filterToApply) =>
      dispatch(addAppliedFilter(filterToApply)),
    removeAppliedFilterDispatcher: (removedFilter) =>
      dispatch(removeAppliedFilter(removedFilter)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FuelType);
