import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Button } from '@trussworks/react-uswds';
import { Help } from '@material-ui/icons';

import CheckboxGroupRenderer from '../../CheckboxGroupRenderer/CheckboxGroupRenderer';
import { updateFuelTypeSelection, updateFilterCriteria } from '../../../store/actions/customDataDownload/filterCriteria';
import { addAppliedFilter, removeAppliedFilter} from '../../../store/actions/customDataDownload/customDataDownload';
import { getSelectedIds } from '../../../utils/selectors/filterCriteria';
import { isAddedToFilters } from '../../../utils/selectors/general';
import { engageFilterLogic } from "../../../utils/selectors/filterLogic";
import Tooltip from '../../Tooltip/Tooltip';

export const FuelType = ({
  storeFuelType,
  appliedFilters,
  updateFuelTypeSelectionDispatcher,
  updateFilterCriteriaDispatcher,
  addAppliedFilterDispatcher,
  removeAppliedFilterDispatcher,
  closeFlyOutHandler,
  renderedHandler,
  dataType,
  dataSubType,
  filterCriteria
}) => {
  const [fuelType, setFuelTypes] = useState(JSON.parse(JSON.stringify(storeFuelType)));
  const [applyFilterClicked, setApplyFilterClicked] = useState(false);
  const filterToApply = 'Unit Fuel Type';

  useEffect(() => {
    if(fuelType.length > 0){
      renderedHandler();
    }// eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fuelType]);

  useEffect(()=>{
    if(applyFilterClicked){
      if(dataType === "EMISSIONS"){
        if(filterCriteria.filterMapping.length>0){
          engageFilterLogic(dataType, dataSubType, filterToApply, JSON.parse(JSON.stringify(filterCriteria)), updateFilterCriteriaDispatcher);
        }
      }
      closeFlyOutHandler();
    }// eslint-disable-next-line react-hooks/exhaustive-deps
  }, [applyFilterClicked]);

  const onSelectAllFuelTypesHandler = (e) => {
    const newFuelTypes = [...fuelType];
    const groupIndex = newFuelTypes.findIndex(
      (group) => group.name === e.target.id
    );
    newFuelTypes[groupIndex].items.forEach((i) => {
      i.selected = i.enabled && e.target.checked;
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

  const handleApplyFilter = () => {
    updateFuelTypeSelectionDispatcher(fuelType);
    if (isAddedToFilters(filterToApply, appliedFilters)) {
      removeAppliedFilterDispatcher(filterToApply);
    }
    const selection = getSelectedIds(fuelType);
    if (selection.length > 0) {
      addAppliedFilterDispatcher({ key: filterToApply, values: selection });
    }
    setApplyFilterClicked(true);
  };

  return (
    <>
      <div className="panel-header padding-top-2 margin-x-2">
        <h3>Unit Fuel Type</h3>
        <Tooltip
          content="Selections made will filter on both primary and secondary fuel types."
          field="Unit Fuel Type"
        >
          <Help
            className="text-primary margin-left-1 margin-bottom-1"
            fontSize="small"
          />
        </Tooltip>
        <hr />
      </div>
      {fuelType.length > 0 && (
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
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    storeFuelType: state.filterCriteria.fuelType,
    filterCriteria: state.filterCriteria,
    appliedFilters: state.customDataDownload.appliedFilters,
    dataType: state.customDataDownload.dataType,
    dataSubType: state.customDataDownload.dataSubType,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateFuelTypeSelectionDispatcher: (fuelType) =>
      dispatch(updateFuelTypeSelection(fuelType)),
    addAppliedFilterDispatcher: (filterToApply) =>
      dispatch(addAppliedFilter(filterToApply)),
    removeAppliedFilterDispatcher: (removedFilter) =>
      dispatch(removeAppliedFilter(removedFilter)),
    updateFilterCriteriaDispatcher: (filterCriteria) => 
      dispatch(updateFilterCriteria(filterCriteria)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FuelType);
