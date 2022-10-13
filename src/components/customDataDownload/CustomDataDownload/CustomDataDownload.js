// *** GLOBAL FUNCTIONAL IMPORTS
import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';

import {
  updateSelectedDataType,
  updateSelectedDataSubType,
  removeAppliedFilter,
  updateSelectedAggregation,
  addAppliedFilter,
} from '../../../store/actions/customDataDownload/customDataDownload';
import DataTypeSelectorView from '../DataTypeSelectorView/DataTypeSelectorView';
import FilterCriteriaMenu from '../../filterCriteria/FilterCriteria/FilterCriteria';
import FilterCriteriaPanel from '../../filterCriteria/FilterCriteriaPanel/FilterCriteriaPanel';
import CddDataPreview from '../../cddDataPreview/CddDataPreview/CddDataPreview';
import RenderSpinner from '../../RenderSpinner/RenderSpinner';
import MobileMenu from '../../MobileComponents/MobileMenu'
import * as constants from '../../../utils/constants/customDataDownload';
import { loadAllFilters, resetFilter, loadFilterMapping, updateFilterCriteria, updateTimePeriod } from '../../../store/actions/customDataDownload/filterCriteria';
import hideNav from '../../../store/actions/hideNavAction';
import { applyBookmarkFilterTags, engageFilterLogic, getFilterVariable } from '../../../utils/selectors/filterLogic';
import { getTimePeriodYears } from '../../../utils/selectors/filterCriteria';
import useCheckWidth from '../../../utils/hooks/useCheckWidth'
import { metaAdder } from '../../../utils/document/metaAdder';
import { getBookmarkData } from '../../../utils/api/camdApi';
// *** STYLES (individual component)
import './CustomDataDownload.scss';

const CustomDataDownload = ({
  addAppliedFilterDispatcher,
  selectedDataType,
  updateSelectedDataTypeDispatcher,
  updateSelectedDataSubTypeDispatcher,
  updateSelectedAggregationDispatcher,
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
    aggregation: '',
  });

  const [selectedDataSubtype, setSelectedDataSubtype] = useState('');
  const [selectedAggregation, setSelectedAggregation] = useState('');

  const [selectionChange, setSelectionChange] = useState(false);
  const [onlyAggregationChanged, setOnlyAggregationChanged] = useState(false)

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
  const [renderPreviewData, setRenderPreviewData] = useState({
    display: false,
    dataType: '',
    dataSubType: '',
  });
  const [removedAppliedFilter, setRemovedAppliedFilter] = useState(null);
  const [ bookmarkData, setBookmarkData ] = useState(null);
  const [ bookmarkInit, setBookmarkInit ] = useState(false);
  const [applyFilterLoading, setApplyFilterLoading] = useState(false);
  const [handleApplyLoading, setHandleApplyLoading] = useState(false);
  const [localLoading, setLocalLoading] = useState(false);

  useEffect(() => {
    document.title = 'Custom Data Download | CAMPD | US EPA';
    const params = new Proxy(new URLSearchParams(window.location.search), {
      get: (searchParams, prop) => searchParams.get(prop),
    });
    if(params.bookmarkId){
      getBookmarkData(Number(params.bookmarkId)).then(res => setBookmarkData(res.data?.bookmarkData));
      setBookmarkInit(true);
    }
  }, []);

  useEffect(()=>{
    if(bookmarkInit && bookmarkData){
      if(selectedDataType === '' && selectedDataSubtype === ''){
        updateSelectedDataTypeDispatcher(bookmarkData?.dataType);
        const selectedDataSubtypeObj = constants.DATA_SUBTYPES_MAP[bookmarkData?.dataType].find(e=>e.label === bookmarkData?.dataSubType)
        setSelectedDataSubtype(selectedDataSubtypeObj.value);
        bookmarkData.hasOwnProperty('aggregation') ? setSelectedAggregation(bookmarkData.aggregation) : setSelectedAggregation(''); 
      }else {
        handleApplyButtonClick();
        window.history.pushState({}, document.title, window.location.href.split('?')[0])
      }
    }// eslint-disable-next-line
  },[bookmarkData, selectedDataType, selectedDataSubtype]);

  useEffect(() => {
    const resetFilters = () => {
      setSelectedDataSubtype('');
      resetFilterDispatcher(null, true);
      removeAppliedFiltersDispatcher(null, true);
      updateSelectedDataTypeDispatcher('');
    };
    return () => resetFilters(); // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (isMobileOrTablet) { 
      setDisplayCancelMobile(true);
    } else {
      setDisplayCancelMobile(false);
      setHideFilterMenu(false);
      setHideDataTypeSelector(false)
    }
  }, [isMobileOrTablet]);

  const fcRef = useRef(filterCriteria);
  fcRef.current = filterCriteria;
  useEffect(()=>{//console.log(filterCriteria.timePeriod.comboBoxYear); console.log("called");
    const dataSubType = getSelectedDataSubType(constants.DATA_SUBTYPES_MAP[selectedDataType]);
    if(applyClicked && loading ===0 && !handleApplyLoading){
      if (bookmarkInit && bookmarkData?.dataPreview?.excludedColumns.length){
        updateFilterCriteriaDispatcher({excludeParams: bookmarkData?.dataPreview?.excludedColumns})
      }
      if(selectedDataType !== "EMISSIONS" && selectedDataType !== "MERCURY AND AIR TOXICS EMISSIONS" && 
        selectedDataType !== "FACILITY" && dataSubType !== "Transactions"){
        if((selectedDataType === "COMPLIANCE" || dataSubType === "Holdings") && comboBoxYearUpdated === false){//console.log("updatetime");
          const distinctYears = [...new Set(filterCriteria.filterMapping.map(e=>selectedDataType === "COMPLIANCE" ? e.year : e.vintageYear))];
          updateTimePeriodDispatcher({
            ...filterCriteria.timePeriod,
            comboBoxYear: distinctYears.map(year => {
              return {
                id:year, 
                label:year, 
                selected: bookmarkData? bookmarkData.filters?.comboBoxYear.selected.includes(year) : false, 
                enabled: bookmarkData? bookmarkData.filters?.comboBoxYear.enabled.includes(year) 
                  || bookmarkData.filters?.comboBoxYear.selected.includes(year) : true
              }})
          });
          setComboBoxYearUpdated(true);
        }
        if(dataSubType === "Account Information"){
          setComboBoxYearUpdated(true);
        }
        if(comboBoxYearUpdated && !bookmarkInit){
          const executeFilterLogic = async() => {
            await setLocalLoading(true)
            engageFilterLogic(selectedDataType, dataSubType, null, JSON.parse(JSON.stringify(fcRef.current)), updateFilterCriteriaDispatcher, setLocalLoading, true);
          setApplyClicked(false);
          setComboBoxYearUpdated(false);}
          executeFilterLogic()
          setTimeout(()=>changeDataTypeButton && changeDataTypeButton.focus())
        }
        if(comboBoxYearUpdated && bookmarkInit){
          applyBookmarkFilterTags(bookmarkData, filterCriteria, addAppliedFilterDispatcher);
          setBookmarkInit(false);
          handlePreviewDataButtonClick();
          setBookmarkData(null);
        }
      }else if(bookmarkInit && bookmarkData && filterCriteria.filterMapping.length>0){
        let distinctYears =[];
        const bookmarkTimePeriod = bookmarkData.filters.timePeriod;
        if(bookmarkData.dataSubType === "Transactions"){
          distinctYears = [...new Set(filterCriteria.filterMapping.map(e=>e.vintageYear))];
        }
        updateTimePeriodDispatcher({
          ...filterCriteria.timePeriod,
          startDate: bookmarkTimePeriod.startDate,
          endDate: bookmarkTimePeriod.endDate,
          opHrsOnly: bookmarkTimePeriod.opHrsOnly,
          year: bookmarkTimePeriod.year,
          comboBoxYear: distinctYears?  distinctYears.map(year => {return {
            id:year, 
            label:year, 
            selected: bookmarkData.filters.comboBoxYear.selected.includes(year), 
            enabled: bookmarkData.filters.comboBoxYear.enabled.includes(year) || bookmarkData.filters.comboBoxYear.selected.includes(year)
          }}) : [],
          month: bookmarkTimePeriod.month,
          quarter: bookmarkTimePeriod.quarter, 
        });
        applyBookmarkFilterTags(bookmarkData, filterCriteria, addAppliedFilterDispatcher);
        setBookmarkInit(false);
        handlePreviewDataButtonClick();
        setBookmarkData(null);
      }
    }else if (applyClicked){
      setHandleApplyLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[applyClicked, loading, comboBoxYearUpdated, bookmarkData])
  const changeDataTypeButton = document.querySelector('#change-data-type-button');
  useEffect(() => {
    setTimeout(() =>{if (handleApplyLoading) {
      console.log('check before execution');
      setHideFilterMenu(true);
      setApplyClicked(true);
      const dataSubType = getSelectedDataSubType(constants.DATA_SUBTYPES_MAP[selectedDataType]);
      if (selectedDataType !== '' && selectedDataSubtype !== '') {
        if(selectedDataType !== "EMISSIONS" && selectedDataType !== "FACILITY" && selectedDataType !== "MERCURY AND AIR TOXICS EMISSIONS" && dataSubType !== "Transactions"){
          loadFilterMappingDispatcher(selectedDataType, dataSubType);
        }else if(bookmarkInit && bookmarkData){
          const { startDate, endDate, year } = bookmarkData.filters.timePeriod;
          if(bookmarkData.filters.timePeriod.year.yearArray.length > 0){
            loadFilterMappingDispatcher(bookmarkData.dataType, bookmarkData.dataSubType, getTimePeriodYears(null, null, year.yearString));
          }else{
            if(bookmarkData.dataSubType === "Transactions"){
              loadFilterMappingDispatcher(bookmarkData.dataType, bookmarkData.dataSubType, [startDate, endDate])
            }else if(bookmarkData.dataType === "MERCURY AND AIR TOXICS EMISSIONS" ){
              loadFilterMappingDispatcher(bookmarkData.dataType, bookmarkData.dataSubType, getTimePeriodYears(startDate, endDate, null));
            }else{
              loadFilterMappingDispatcher(bookmarkData.dataType, bookmarkData.dataSubType, getTimePeriodYears(startDate, endDate));
            }
          }
        }
        loadAllFiltersDispatcher(selectedDataType, dataSubType, filterCriteria, bookmarkData?.filters);
        setDataTypeApplied(true);
        setDataSubtypeApplied(true);
        setAppliedDataType({
          dataType: selectedDataType,
          dataSubType: selectedDataSubtype,
          aggregation: selectedAggregation,
        });
        updateSelectedAggregationDispatcher(selectedAggregation);
        if (selectionChange) {
          if(!onlyAggregationChanged){
            removeAppliedFiltersDispatcher(null, true);
            resetFilterDispatcher(null, true);
          }
          if (selectedDataType !== "EMISSIONS"){
            setSelectedAggregation('');
            updateSelectedAggregationDispatcher("");
          }
        }
        setSelectionChange(false);
        setDisplayCancel(true);
        updateSelectedDataSubTypeDispatcher(
          getSelectedDataSubType(constants.DATA_SUBTYPES_MAP[selectedDataType])
        );
      }
      setHandleApplyLoading(false);
      setTimeout(() => {
        changeDataTypeButton && changeDataTypeButton.focus()
      })
    }})//eslint-disable-next-line react-hooks/exhaustive-deps
  }, [handleApplyLoading])
  useEffect(() => {
    const noAggregationChange = appliedDataType.aggregation === selectedAggregation || !selectedAggregation;
    const aggregationChange = appliedDataType.aggregation !== selectedAggregation;
    if (
      (appliedDataType.dataType === selectedDataType &&
        appliedDataType.dataSubType === selectedDataSubtype && noAggregationChange) ||
      selectedDataSubtype === ''
    ) {
      setSelectionChange(false);
      setOnlyAggregationChanged(false);
    } else if (appliedDataType.dataType === selectedDataType &&
      appliedDataType.dataSubType === selectedDataSubtype && aggregationChange) {
      setOnlyAggregationChanged(true);
      setSelectionChange(true);
      }else{
      setSelectionChange(true);
      setOnlyAggregationChanged(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDataType, selectedDataSubtype, appliedDataType, selectedAggregation]);

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

  const changeAggregation = (event) => {
    if (event) {
      setSelectedAggregation(event.target.value);
    }
    return true;
  }
  const handleDataTypeDropdown = (event) => {
    const value = event.target.value;
    if (value !== '') {
      setSelectedDataSubtype('');
      updateSelectedDataTypeDispatcher(value);
    }
    if (constants.DATA_SUBTYPES_MAP[value].length === 1){
      setSelectedDataSubtype(1);
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
    setHandleApplyLoading(true)
  };

  const handlePreviewDataButtonClick = () => {
    setRenderPreviewData({
      display: true,
      dataType: selectedDataType,
      dataSubType: selectedDataSubtype,
    });
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
            selectedAggregation={selectedAggregation}
            dataTypeApplied={dataTypeApplied}
            dataSubtypeApplied={dataSubtypeApplied}
            handleDataTypeDropdown={handleDataTypeDropdown}
            handleChangeButtonClick={handleChangeButtonClick}
            changeDataSubtype={changeDataSubtype}
            changeAggregation={changeAggregation}
            handleApplyButtonClick={handleApplyButtonClick}
            handleCancelButtonClick={handleCancelButtonClick}
            selectionChange={selectionChange}
            displayCancel={displayCancel}
            displayCancelMobile={displayCancelMobile}
            hideDataTypeSelector={hideDataTypeSelector}
            displayMobileDataType={displayMobileDataType}
            renderPreviewData={renderPreviewData}
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
            setRemovedAppliedFilter={setRemovedAppliedFilter}
            renderPreviewData={renderPreviewData}
          />
          <MobileMenu 
          handleBackButtonClick={handleBackButtonClick}
          appliedFilters={appliedFilters}
          dataSubtypeApplied={dataSubtypeApplied}
          handlePreviewDataButtonClick={handlePreviewDataButtonClick}
          hideFilterMenu={hideFilterMenu}
          resetFiltersDispatcher={resetFilterDispatcher}
          />
        </div>
        <FilterCriteriaPanel
          show={displayFilters}
          selectedDataType={selectedDataType}
          selectedDataSubtype={getSelectedDataSubType(
            constants.DATA_SUBTYPES_MAP[selectedDataType]
          )}
          selectedFilter={getFilterVariable(selectedFilter, selectedDataType, selectedDataSubtype)}
          closeFlyOutHandler={closeFlyOutHandler}
          getSelectedDataSubType={getSelectedDataSubType}
          appliedFilters={appliedFilters}
          handleBackButtonClick={handleBackButtonClick}
          applyFilterLoading={applyFilterLoading}
          setApplyFilterLoading={setApplyFilterLoading}
        />
        <CddDataPreview
          dataType={appliedDataType.dataType}
          displayMobileDataType={displayMobileDataType}
          setDisplayMobileDataType={setDisplayMobileDataType}
          handleFilterButtonClick={handleFilterButtonClick}
          handleMobileFiltersButtonClick={handleMobileFiltersButtonClick}
          renderPreviewData={renderPreviewData}
          setRenderPreviewData={setRenderPreviewData}
          handlePreviewDataButtonClick={handlePreviewDataButtonClick}
          isMobileOrTablet={isMobileOrTablet}
          removedAppliedFilter={removedAppliedFilter}
          setRemovedAppliedFilter={setRemovedAppliedFilter}
          setApplyFilterLoading={setApplyFilterLoading}
        />
        <RenderSpinner showSpinner={loading || filterCriteria.filterLogicEngaged || bookmarkInit || handleApplyLoading || applyFilterLoading || localLoading || comboBoxYearUpdated|| applyClicked } />
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
    addAppliedFilterDispatcher: (filterToApply) =>
      dispatch(addAppliedFilter(filterToApply)),
    updateSelectedDataTypeDispatcher: (dataType) =>
      dispatch(updateSelectedDataType(dataType)),
    updateSelectedDataSubTypeDispatcher: (dataSubType) =>
      dispatch(updateSelectedDataSubType(dataSubType)),
    updateSelectedAggregationDispatcher: (aggregation) =>
      dispatch(updateSelectedAggregation(aggregation)),
    updateFilterCriteriaDispatcher: (filterCriteria) => 
      dispatch(updateFilterCriteria(filterCriteria)),
    removeAppliedFiltersDispatcher: (removedFilter, removeAll) =>
      dispatch(removeAppliedFilter(removedFilter, removeAll)),
    loadAllFiltersDispatcher: (dataType, dataSubType, filterCriteria, bookmarkFilters) =>
      dispatch(loadAllFilters(dataType, dataSubType, filterCriteria, bookmarkFilters)),
    resetFilterDispatcher: (filterToReset, resetAll) =>
      dispatch(resetFilter(filterToReset, resetAll)),
    loadFilterMappingDispatcher: (dataType, dataSubType, years) =>
      dispatch(loadFilterMapping(dataType, dataSubType, years)),
    updateTimePeriodDispatcher: (timePeriod) =>
      dispatch(updateTimePeriod(timePeriod)),
      hideNavDispatcher: (boolean) => dispatch(hideNav(boolean)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CustomDataDownload);
