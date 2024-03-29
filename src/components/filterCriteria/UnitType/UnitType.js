import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import { Button } from '@trussworks/react-uswds';

import CheckboxGroupRenderer from '../../CheckboxGroupRenderer/CheckboxGroupRenderer';
import {
  updateUnitTypeSelection,
  updateFilterCriteria,
} from '../../../store/actions/customDataDownload/filterCriteria';
import {
  addAppliedFilter,
  removeAppliedFilter,
} from '../../../store/actions/customDataDownload/customDataDownload';
import { engageFilterLogic } from '../../../utils/selectors/filterLogic';
import { getSelectedIds } from '../../../utils/selectors/filterCriteria';
import { isAddedToFilters } from '../../../utils/selectors/general';

export const UnitType = ({
  storeUnitType,
  appliedFilters,
  updateFilterCriteriaDispatcher,
  updateUnitTypeSelectionDispatcher,
  addAppliedFilterDispatcher,
  removeAppliedFilterDispatcher,
  closeFlyOutHandler,
  renderedHandler,
  dataType,
  dataSubType,
  filterCriteria,
  setApplyFilterLoading,
}) => {
  const [unitType, setUnitTypes] = useState(
    JSON.parse(JSON.stringify(storeUnitType))
  );
  const fcRef = useRef(filterCriteria);
  fcRef.current = filterCriteria;
  const filterToApply = 'Unit Type';

  useEffect(() => {
    if (unitType.length > 0) {
      renderedHandler();
    } // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [unitType]);


  const onSelectAllUnitTypesHandler = (e) => {
    const newUnitTypes = [...unitType];
    const groupIndex = newUnitTypes.findIndex(
      (group) => group.name === e.target.id
    );
    newUnitTypes[groupIndex].items.forEach((i) => {
      i.selected = i.enabled && e.target.checked;
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

  const handleApplyFilter = () =>{
    setApplyFilterLoading(true);
    setApplyFilterLoading(true);
    setTimeout(async()=>{await updateFilters();
      if(fcRef.current.filterMapping.length>0){
        engageFilterLogic(dataType, dataSubType, filterToApply, JSON.parse(JSON.stringify(fcRef.current)), updateFilterCriteriaDispatcher, setApplyFilterLoading);
      } else {
        setApplyFilterLoading(false)
      }
      closeFlyOutHandler();
    })
  };

  const updateFilters = () => {
    updateUnitTypeSelectionDispatcher(unitType);
      if (isAddedToFilters(filterToApply, appliedFilters)) {
        removeAppliedFilterDispatcher(filterToApply);
      }
      const selection = getSelectedIds(unitType);
      if (selection.length > 0) {
        addAppliedFilterDispatcher({ key: filterToApply, values: selection });
      }
  }

  return (
    <>
      <div className="panel-header padding-top-2 margin-x-2">
        <h3 data-testid="filter-criteria-title">Unit Type</h3>
        <hr />
      </div>
      {unitType.length > 0 && (
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
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    storeUnitType: state.filterCriteria.unitType,
    filterCriteria: state.filterCriteria,
    appliedFilters: state.customDataDownload.appliedFilters,
    dataType: state.customDataDownload.dataType,
    dataSubType: state.customDataDownload.dataSubType,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateUnitTypeSelectionDispatcher: (unitType) =>
      dispatch(updateUnitTypeSelection(unitType)),
    addAppliedFilterDispatcher: (filterToApply) =>
      dispatch(addAppliedFilter(filterToApply)),
    removeAppliedFilterDispatcher: (removedFilter) =>
      dispatch(removeAppliedFilter(removedFilter)),
    updateFilterCriteriaDispatcher: (filterCriteria) =>
      dispatch(updateFilterCriteria(filterCriteria)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UnitType);
