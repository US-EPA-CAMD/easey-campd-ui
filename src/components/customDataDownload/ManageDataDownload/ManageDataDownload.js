// *** GLOBAL FUNCTIONAL IMPORTS
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import {
  updateSelectedDataType,
  updateSelectedDataSubType,
  removeAppliedFilter,
} from '../../../store/actions/customDataDownload/customDataDownload';
import DataTypeSelectorRender from '../DataTypeSelectorRender/DataTypeSelectorRender';
import FilterCriteriaRender from '../FilterCriteriaRender/FilterCriteriaRender';
import FlyOutPanel from '../FlyOutPanel/FlyOutPanel';
import ManageDataPreview from '../ManageDataPreview/ManageDataPreview';
import * as constants from '../../../utils/constants/customDataDownload';

// *** STYLES (individual component)
import './ManageDataDownload.scss';

const ManageDataDownload = ({
  selectedDataType,
  updateSelectedDataTypeDispatcher,
  updateSelectedDataSubTypeDispatcher,
  removeAppliedFiltersDispatcher,
  appliedFilters,
}) => {
  // *** HOOKS
  const [dataTypeApplied, setDataTypeApplied] = useState(false);
  const [dataSubtypeApplied, setDataSubtypeApplied] = useState(false);
  const [appliedDataType, setAppliedDataType] = useState({
    dataType: selectedDataType,
    dataSubType: '',
  });

  const [selectedDataSubtype, setSelectedDataSubtype] = useState('');
  const [selectionChange, setSelectionChange] = useState(false);

  const [displayCancel, setDisplayCancel] = useState(false);
  const [displayFilters, setDisplayFilters] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('');

  useEffect(() => {
    if (
      (appliedDataType.dataType === selectedDataType &&
        appliedDataType.dataSubType === selectedDataSubtype) ||
      selectedDataSubtype === ''
    ) {
      setSelectionChange(false);
    } else {
      setSelectionChange(true);
    }
  }, [selectedDataType, selectedDataSubtype, appliedDataType]);

  // *** EVENT HANDLERS
  const changeDataSubtype = (event) => {
    if (event) {
      setSelectedDataSubtype(event.target.value);
    }
    return true;
  };

  const handleDataTypeDropdown = (event) => {
    if (event.target.value !== '') {
      setSelectedDataSubtype('');
      updateSelectedDataTypeDispatcher(event.target.value);
    }
  };

  const handleChangeButtonClick = () => {
    setDataTypeApplied(false);
    setDataSubtypeApplied(false);
    setDisplayFilters(false);
  };

  const handleFilterButtonClick = (filterType) => {
    // *** if the same button as is currently selected is pressed again
    if (displayFilters === true && selectedFilter === filterType) {
      setSelectedFilter('');
      setDisplayFilters(false);
    } else {
      setSelectedFilter(filterType);
      setDisplayFilters(true);
    }
  };

  const handleApplyButtonClick = () => {
    if (selectedDataType !== '' && selectedDataSubtype !== '') {
      setDataTypeApplied(true);
      setDataSubtypeApplied(true);
      setAppliedDataType({
        dataType: selectedDataType,
        dataSubType: selectedDataSubtype,
      });
      if (selectionChange) {
        removeAppliedFiltersDispatcher(null, true);
      }
      setSelectionChange(false);
      setDisplayCancel(true);
      updateSelectedDataSubTypeDispatcher(
        getSelectedDataSubType(constants.DATA_SUBTYPES_MAP[selectedDataType])
      );
    }
  };

  const handleCancelButtonClick = () => {
    setDataTypeApplied(true);
    setDataSubtypeApplied(true);
    updateSelectedDataTypeDispatcher(appliedDataType.dataType);
    setSelectedDataSubtype(appliedDataType.dataSubType);
  };

  const closeFlyOutHandler = () => {
    setSelectedFilter('');
    setDisplayFilters(false);
  };

  // *** UTILITY FUNCTION
  const getSelectedDataSubType = (options) => {
    const entry = options.find(
      (list) => list.value === parseFloat(selectedDataSubtype)
    );
    return entry ? entry.label : '';
  };

  return (
    <div
      className="manage-download-wrapper"
      data-testid="manage-data-download-wrapper"
    >
      <div className="side-panel bg-base-lighter margin-0">
        <DataTypeSelectorRender
          selectedDataType={selectedDataType}
          getSelectedDataSubType={getSelectedDataSubType}
          selectedDataSubtype={selectedDataSubtype}
          dataTypeApplied={dataTypeApplied}
          dataSubtypeApplied={dataSubtypeApplied}
          handleDataTypeDropdown={handleDataTypeDropdown}
          handleChangeButtonClick={handleChangeButtonClick}
          changeDataSubtype={changeDataSubtype}
          handleApplyButtonClick={handleApplyButtonClick}
          handleCancelButtonClick={handleCancelButtonClick}
          selectionChange={selectionChange}
          displayCancel={displayCancel}
        />
        <FilterCriteriaRender
          dataSubtypeApplied={dataSubtypeApplied}
          selectedDataType={selectedDataType}
          getSelectedDataSubType={getSelectedDataSubType}
          handleFilterButtonClick={handleFilterButtonClick}
          appliedFilters={appliedFilters}
        />
      </div>
      <FlyOutPanel
        show={displayFilters}
        selectedDataSubtype={getSelectedDataSubType(
          constants.DATA_SUBTYPES_MAP[selectedDataType]
        )}
        selectedFilter={selectedFilter}
        closeFlyOutHandler={closeFlyOutHandler}
      />
      <ManageDataPreview handleFilterButtonClick={handleFilterButtonClick} />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    selectedDataType: state.customDataDownload.dataType,
    appliedFilters: state.customDataDownload.appliedFilters,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateSelectedDataTypeDispatcher: (dataType) =>
      dispatch(updateSelectedDataType(dataType)),
    updateSelectedDataSubTypeDispatcher: (dataSubType) =>
      dispatch(updateSelectedDataSubType(dataSubType)),
    removeAppliedFiltersDispatcher: (removedFilter, removeAll) =>
      dispatch(removeAppliedFilter(removedFilter, removeAll)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDataDownload);
