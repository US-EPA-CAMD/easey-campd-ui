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
import MobileMenu from '../../MobileComponents/MobileMenu'
import * as constants from '../../../utils/constants/customDataDownload';
import LoadingModal from '../../LoadingModal/LoadingModal';

// *** STYLES (individual component)
import './ManageDataDownload.scss';
import { loadAllFilters, resetFilter, loadFilterMapping, updateFilterCriteria, updateTimePeriod } from '../../../store/actions/customDataDownload/filterCriteria';
import hideNav from '../../../store/actions/hideNavAction';
import { engageFilterLogic } from '../../../utils/selectors/filterLogic';
import useCheckWidth from '../../../utils/hooks/useCheckWidth'
import { metaAdder } from '../../../utils/document/metaAdder';

const ManageDataDownload = ({
  selectedDataType,
  updateSelectedDataTypeDispatcher,
  updateSelectedDataSubTypeDispatcher,
  updateFilterCriteriaDispatcher,
  updateTimePeriodDispatcher,
  removeAppliedFiltersDispatcher,
  loadFilterMappingDispatcher,
  resetFilterDispatcher,
  appliedFilters,
  loadAllFiltersDispatcher,
  hideNavDispatcher,
  filterCriteria,
  loading,
}) => {
  useEffect(() => {
    document.title = 'Custom Data Download | CAMPD | US EPA';
  }, []);

  useEffect(() => {
    const resetFilters = () => {
      resetFilterDispatcher(null, true);
      removeAppliedFiltersDispatcher(null, true);
    };
    return () => resetFilters(); // eslint-disable-next-line
  }, []);

  metaAdder(
    'description',
    'The custom data download tool allows users to create custom queries of emissions, allowance, compliance and/or facility information.'
  );
  metaAdder(
    'keywords',
    'EPA, AMPD, emissions data, customized dataset, allowance compliance, Clean air markets program data, analysis, data, facility information, custom data download, CAMPD, CAMD'
  );

  // *** HOOKS
  const [dataTypeApplied, setDataTypeApplied] = useState(false);
  const [dataSubtypeApplied, setDataSubtypeApplied] = useState(false);
  const [appliedDataType, setAppliedDataType] = useState({
    dataType: '',
    dataSubType: '',
  });

  const [selectedDataSubtype, setSelectedDataSubtype] = useState('');
  const [selectionChange, setSelectionChange] = useState(false);

  const [displayCancel, setDisplayCancel] = useState(false);
  const [displayFilters, setDisplayFilters] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('');
  const [activeFilter, setActiveFilter] = useState(null);
  const [filterClickRef, setFilterClickRef] = useState(null);
  const [applyClicked, setApplyClicked] = useState(false);
  const [comboBoxYearUpdated, setComboBoxYearUpdated] = useState(false);
  const [displayMobileDataType, setDisplayMobileDataType] = useState(false);
  const [displayCancelMobile, setDisplayCancelMobile] = useState(false);
  const [hideFilterMenu, setHideFilterMenu] = useState(false);
  const [hideDataTypeSelector, setHideDataTypeSelector] = useState(false);
  const isMobileOrTablet = useCheckWidth([0, 1024]);
  const [renderPreviewData, setRenderPreviewData] = useState(false);

  useEffect(() => {
    if (isMobileOrTablet) { 
      setDisplayCancelMobile(true);
    } else {
      setDisplayCancelMobile(false);
      setHideFilterMenu(false);
      setHideDataTypeSelector(false)
    }
  }, [isMobileOrTablet])
  useEffect(()=>{//console.log(filterCriteria.timePeriod.comboBoxYear); console.log("called");
    const dataSubType = getSelectedDataSubType(constants.DATA_SUBTYPES_MAP[selectedDataType]);
    if(applyClicked && loading === 0 && selectedDataType !== "EMISSIONS" && dataSubType !== "Transactions"){
      if((selectedDataType === "COMPLIANCE" || dataSubType === "Holdings") && comboBoxYearUpdated === false){//console.log("updatetime");
        const distinctYears = [...new Set(filterCriteria.filterMapping.map(e=>selectedDataType === "COMPLIANCE" ? e.year : e.vintageYear))];
        updateTimePeriodDispatcher({
          ...filterCriteria.timePeriod,
          comboBoxYear: distinctYears.map(year => {return {id:year, label:year, selected:false, enabled:true}})
        });
        setComboBoxYearUpdated(true);
      }
      if(dataSubType === "Account Information"){
        setComboBoxYearUpdated(true);
      }
      if(comboBoxYearUpdated){
        engageFilterLogic(selectedDataType, dataSubType, null, JSON.parse(JSON.stringify(filterCriteria)), updateFilterCriteriaDispatcher, true);
        setApplyClicked(false);
        setComboBoxYearUpdated(false);
      }
    }// eslint-disable-next-line react-hooks/exhaustive-deps
  },[applyClicked, loading, comboBoxYearUpdated])

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
    console.log(event.target.value);
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

  const handleBackButtonClick = () => {
    hideNavDispatcher(false);
    setDisplayMobileDataType(false);
    setDataTypeApplied(false);
    setDataSubtypeApplied(false);
    setDisplayFilters(false);
    setActiveFilter(false);
    hideFilterMenu && document.querySelector('#dataTypeButton').focus();
    hideDataTypeSelector && document.querySelector('#filtersButton').focus();
    setHideFilterMenu(false);
    setHideDataTypeSelector(false);
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
    setHideFilterMenu(true)
    setApplyClicked(true);
    const dataSubType = getSelectedDataSubType(constants.DATA_SUBTYPES_MAP[selectedDataType]);
    if (selectedDataType !== '' && selectedDataSubtype !== '') {
      if(selectedDataType !== "EMISSIONS" && dataSubType !== "Transactions"){
        loadFilterMappingDispatcher(selectedDataType, dataSubType);
      }
      loadAllFiltersDispatcher(selectedDataType, dataSubType, filterCriteria);
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

  const handlePreviewDataButtonClick = () => {
    setRenderPreviewData(true);
  };

  const handleMobileFiltersButtonClick = () => {
    hideNavDispatcher(true);
    setDataTypeApplied(true);
    setDataSubtypeApplied(true);
    setDisplayMobileDataType(true);
    setHideFilterMenu(false);
    setHideDataTypeSelector(true);
  };

  const handleCancelButtonClick = () => {
    if (!appliedDataType.dataType || !appliedDataType.dataSubType) {
      hideNavDispatcher(false)
      document.querySelector('#dataTypeButton').focus();
      return setDisplayMobileDataType(false)
    }
    if (isMobileOrTablet) {
      setHideFilterMenu(true)
    }
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
    const entry = options?.find(
      (list) => list.value === parseFloat(selectedDataSubtype)
    );
    return entry ? entry.label : '';
  };

  const getFilterVariable = (selectedFilter) => {
    if (selectedDataSubtype !== '') {
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

  const mobileDataTypeDisplay = displayMobileDataType? 'width-full tablet:width-mobile-lg minh-viewport'
  : 'display-none desktop:display-block';
  const position = isMobileOrTablet ? 'position-absolute pin-y' : 'position-static';
  return (
    <div className="position-relative">
      <div
        className="display-flex flex-no-wrap"
        data-testid="manage-data-download-wrapper"
      >
        <div
          className={`${
            displayFilters
              ? 'desktop:display-none desktop-lg:display-block'
              : ''
          } side-nav side-nav-height bg-base-lighter margin-0 ${mobileDataTypeDisplay +  ' ' + position}`}
        >
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
            displayCancelMobile={displayCancelMobile}
            hideDataTypeSelector={hideDataTypeSelector}
            displayMobileDataType={displayMobileDataType}
          />
          <FilterCriteriaMenu
            dataSubtypeApplied={dataSubtypeApplied}
            selectedDataType={selectedDataType}
            getSelectedDataSubType={getSelectedDataSubType}
            handleFilterButtonClick={handleFilterButtonClick}
            appliedFilters={appliedFilters}
            activeFilter={activeFilter}
            filterCriteria={filterCriteria}
            hideFilterMenu={hideFilterMenu}
            setHideFilterMenu={setHideFilterMenu}
            isMobileOrTablet={isMobileOrTablet}
          />
          <MobileMenu 
          handleBackButtonClick={handleBackButtonClick}
          appliedFilters={appliedFilters}
          dataSubtypeApplied={dataSubtypeApplied}
          handlePreviewDataButtonClick={handlePreviewDataButtonClick}
          hideFilterMenu={hideFilterMenu}
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
          appliedFilters={appliedFilters}
          handleBackButtonClick={handleBackButtonClick}
        />
        <ManageDataPreview
          dataType={appliedDataType.dataType}
          displayMobileDataType={displayMobileDataType}
          setDisplayMobileDataType={setDisplayMobileDataType}
          handleFilterButtonClick={handleFilterButtonClick}
          handleMobileFiltersButtonClick={handleMobileFiltersButtonClick}
          renderPreviewData={renderPreviewData}
          setRenderPreviewData={setRenderPreviewData}
          handlePreviewDataButtonClick={handlePreviewDataButtonClick}
          isMobileOrTablet={isMobileOrTablet}
        />
        {loading ? <LoadingModal loading={loading} /> : null}
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
    updateFilterCriteriaDispatcher: (filterCriteria) => 
      dispatch(updateFilterCriteria(filterCriteria)),
    removeAppliedFiltersDispatcher: (removedFilter, removeAll) =>
      dispatch(removeAppliedFilter(removedFilter, removeAll)),
    loadAllFiltersDispatcher: (dataType, dataSubType, filterCriteria) =>
      dispatch(loadAllFilters(dataType, dataSubType, filterCriteria)),
    resetFilterDispatcher: (filterToReset, resetAll) =>
      dispatch(resetFilter(filterToReset, resetAll)),
    loadFilterMappingDispatcher: (dataType, dataSubType, years) =>
      dispatch(loadFilterMapping(dataType, dataSubType, years)),
    updateTimePeriodDispatcher: (timePeriod) =>
      dispatch(updateTimePeriod(timePeriod)),
      hideNavDispatcher: (boolean) => dispatch(hideNav(boolean)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDataDownload);
