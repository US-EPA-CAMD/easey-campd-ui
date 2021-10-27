// *** GLOBAL FUNCTIONAL IMPORTS
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import {
  updateSelectedDataType,
  updateSelectedDataSubType,
  removeAppliedFilter,
} from '../../../store/actions/customDataDownload/customDataDownload';
import DataTypeSelectorView from '../DataTypeSelectorView/DataTypeSelectorView';
import FilterCriteriaMenu from '../../filterCriteria/FilterCriteriaMenu/FilterCriteriaMenu';
import FilterCriteriaPanel from '../../filterCriteria/FilterCriteriaPanel/FilterCriteriaPanel';
import ManageDataPreview from '../../dataPreview/ManageDataPreview/ManageDataPreview';
import * as constants from '../../../utils/constants/customDataDownload';
import LoadingModal from '../../LoadingModal/LoadingModal';

// *** STYLES (individual component)
import './ManageDataDownload.scss';
import { loadAllFilters, resetFilter } from '../../../store/actions/customDataDownload/filterCriteria';

const ManageDataDownload = ({
  selectedDataType,
  updateSelectedDataTypeDispatcher,
  updateSelectedDataSubTypeDispatcher,
  removeAppliedFiltersDispatcher,
  resetFilterDispatcher,
  appliedFilters,
  loadAllFiltersDispatcher,
  filterCriteria,
  loading,
}) => {
  useEffect(() => {
    document.title = "CAMPD - Manage Data Download";
  }, []);

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
  const [activeFilter, setActiveFilter] = useState(null);
  const [filterClickRef, setFilterClickRef] = useState(null);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDataType, selectedDataSubtype, appliedDataType]);

  useEffect(()=>{
    if(!activeFilter && filterClickRef!==null){
      filterClickRef.focus();
      setFilterClickRef(null);
    }// eslint-disable-next-line react-hooks/exhaustive-deps
  },[activeFilter]);

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
    setActiveFilter(false);
  };

  const handleFilterButtonClick = (filterType, evtTarget) => {
    // *** if the same button as is currently selected is pressed again
    if (displayFilters === true && selectedFilter === filterType) {
      setSelectedFilter('');
      setDisplayFilters(false);
      setActiveFilter(null);
    } else {
      setSelectedFilter(filterType);
      setDisplayFilters(true);
      setActiveFilter(filterType);
      setFilterClickRef(evtTarget);
    }
  };

  const handleApplyButtonClick = () => {
    if (selectedDataType !== '' && selectedDataSubtype !== '') {
      loadAllFiltersDispatcher(selectedDataType, getSelectedDataSubType(constants.DATA_SUBTYPES_MAP[selectedDataType]), filterCriteria);
      setDataTypeApplied(true);
      setDataSubtypeApplied(true);
      setAppliedDataType({
        dataType: selectedDataType,
        dataSubType: selectedDataSubtype,
      });
      if (selectionChange) {
        removeAppliedFiltersDispatcher(null, true);
        resetFilterDispatcher(null, true);
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
    setActiveFilter(null);
  };

  // *** UTILITY FUNCTION
  const getSelectedDataSubType = (options) => {
    const entry = options.find(
      (list) => list.value === parseFloat(selectedDataSubtype)
    );
    return entry ? entry.label : '';
  };

  const getFilterVariable = (selectedFilter) => {
    if (selectedDataSubtype) {
      const filters =
        constants.FILTERS_MAP[selectedDataType][
          getSelectedDataSubType(constants.DATA_SUBTYPES_MAP[selectedDataType])
        ];

      return (
        filters.filter((el) => el.value === selectedFilter)[0]?.stateVar || ''
      );
    }
    return selectedFilter;
  };

  return (
    <div className="position-relative">
      <div className="display-flex flex-no-wrap" data-testid="manage-data-download-wrapper">
        <div className={`${displayFilters ? 'desktop:display-none desktop-lg:display-block' : ''} side-nav side-nav-height bg-base-lighter margin-0`}>
          <DataTypeSelectorView
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
          <FilterCriteriaMenu
            dataSubtypeApplied={dataSubtypeApplied}
            selectedDataType={selectedDataType}
            getSelectedDataSubType={getSelectedDataSubType}
            handleFilterButtonClick={handleFilterButtonClick}
            appliedFilters={appliedFilters}
            activeFilter={activeFilter}
          />
        </div>
        <FilterCriteriaPanel
          show={displayFilters}
          selectedDataType={selectedDataType}
          selectedDataSubtype={getSelectedDataSubType(
            constants.DATA_SUBTYPES_MAP[selectedDataType]
          )}
          selectedFilter={getFilterVariable(selectedFilter)}
          closeFlyOutHandler={closeFlyOutHandler}
          getSelectedDataSubType={getSelectedDataSubType}
        />
        <ManageDataPreview
            dataType={appliedDataType.dataType}
            handleFilterButtonClick={handleFilterButtonClick}
          />
        {loading ? <LoadingModal loading={loading}/>: null}
      </div>
  </div>
  );
};

const mapStateToProps = (state) => {
  return {
    selectedDataType: state.customDataDownload.dataType,
    appliedFilters: state.customDataDownload.appliedFilters,
    filterCriteria: state.filterCriteria,
    loading: state.apiCallsInProgress,
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
    loadAllFiltersDispatcher: (dataType, dataSubType, filterCriteria) =>
      dispatch(loadAllFilters(dataType, dataSubType, filterCriteria)),
    resetFilterDispatcher: (filterToReset, resetAll) =>
      dispatch(resetFilter(filterToReset, resetAll)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDataDownload);
