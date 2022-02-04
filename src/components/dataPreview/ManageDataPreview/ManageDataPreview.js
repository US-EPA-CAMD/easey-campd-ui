import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Button, Alert, Link } from '@trussworks/react-uswds';
import { Help } from '@material-ui/icons';

import DataPreview from '../DataPreview/DataPreview';
import FilterTags from '../../FilterTags/FilterTags';
import { isAddedToFilters } from '../../../utils/selectors/general';
import { engageFilterLogic } from '../../../utils/selectors/filterLogic';
import {
  resetDataPreview,
  removeAppliedFilter,
} from '../../../store/actions/customDataDownload/customDataDownload';
import {
  resetFilter,
  updateTimePeriod,
  updateFilterCriteria,
} from '../../../store/actions/customDataDownload/filterCriteria';
import hideNav from '../../../store/actions/hideNavAction';
import { EMISSIONS_DATA_SUBTYPES } from '../../../utils/constants/emissions';
import { ALLOWANCES_DATA_SUBTYPES } from '../../../utils/constants/allowances';
import { COMPLIANCES_DATA_SUBTYPES } from '../../../utils/constants/compliances';
import { FACILITY_DATA_SUBTYPES } from '../../../utils/constants/facility';
import Tooltip from '../../Tooltip/Tooltip';
import config from "../../../config";

const ManageDataPreview = ({
  dataType,
  dataSubType,
  appliedFilters,
  displayMobileDataType,
  setDisplayMobileDataType,
  timePeriod,
  handleFilterButtonClick,
  handleMobileFiltersButtonClick,
  hideNav,
  hideNavDispatcher,
  resetDataPreviewDispatcher,
  resetFiltersDispatcher,
  removeAppliedFiltersDispatcher,
  updateTimePeriodDispatcher,
  filterCriteria,
  updateFilterCriteriaDispatcher,
  renderPreviewData,
  setRenderPreviewData,
  handlePreviewDataButtonClick,
  isMobileOrTablet,
  spinnerActive,
  setSpinnerActive,
  totalCount,
  removedAppliedFilter,
  setRemovedAppliedFilter
}) => {
  const [requirementsMet, setRequirementsMet] = useState(false);

  useEffect(() => {
    if (
      dataType &&
      dataSubType &&
      dataSubType !== '' &&
      contains()
    ) {
      setRequirementsMet(true);
    } else {
      setRequirementsMet(false);
    }// eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataType, dataSubType, appliedFilters]);

  useEffect(()=>{
    if(removedAppliedFilter !== null){
      if(filterCriteria.filterMapping.length>0){
        engageFilterLogic(dataType, dataSubType, removedAppliedFilter, JSON.parse(JSON.stringify(filterCriteria)), updateFilterCriteriaDispatcher, true);
      }
    }// eslint-disable-next-line react-hooks/exhaustive-deps
  },[appliedFilters]);


  useEffect(() => {
    if (!isMobileOrTablet) {
      hideNavDispatcher(false);
    } else {
      if (displayMobileDataType) {
        hideNavDispatcher(true);
      }
    } // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMobileOrTablet]);

  const handleUpdateInAppliedFilters = () => {
    resetDataPreviewDispatcher();
    setRenderPreviewData(false);
  };

  const onFilterTagRemovedHandler = (filterType, label) => {
    if (filterType === 'Time Period' || filterType === "Transaction Date") {
      if(label === "Operating Hours Only"){
        updateTimePeriodDispatcher({
          startDate: timePeriod.startDate,
          endDate: timePeriod.endDate,
          opHrsOnly: false,
        });
        removeAppliedFiltersDispatcher(filterType, false, true);
      }else{
        if(window.confirm(`Removing ${dataSubType==="Transactions"? "transaction date":"time period"} will clear out previously selected criteria. Do you want to proceed?`)){
          resetFiltersDispatcher(null, true);
          removeAppliedFiltersDispatcher(null, true);
        }
      }
    } else {
      resetFiltersDispatcher(filterType);
      removeAppliedFiltersDispatcher(filterType);
      setRemovedAppliedFilter(filterType);
    }
    handleUpdateInAppliedFilters();
  };

  const onFilterTagClearAllHandler = () => {
    resetFiltersDispatcher(null, true);
    removeAppliedFiltersDispatcher(null, true);
    handleUpdateInAppliedFilters();
    window.alert('Filters have been successfully cleared.');
    document.getElementById('filter0').focus();
  };

  const contains = () => {
    const mapRequiredFilters = {
      EMISSIONS: EMISSIONS_DATA_SUBTYPES,
      ALLOWANCE: ALLOWANCES_DATA_SUBTYPES,
      COMPLIANCE: COMPLIANCES_DATA_SUBTYPES,
      FACILITY: FACILITY_DATA_SUBTYPES,
    };
    const subTypes = mapRequiredFilters[dataType] || null;
    if (!subTypes) {
      return false;
    }
    const index = subTypes.filter((el) => el.label === dataSubType);
    if (index.length === 0) {
      return false;
    }

    const search =
      index[0].required[0] === 'none'
        ? [true]
        : index[0].required.map((el) =>
            isAddedToFilters(el, appliedFilters)
          );
    return appliedFilters.length > 0 && search.indexOf(false) === -1;
  };

  return (
    <div className="width-full">
      <div className={`${isMobileOrTablet && renderPreviewData? 'display-none': 'desktop:display-flex flex-row flex-justify bg-base-lightest desktop:padding-x-3 minh-10 padding-0'}`} >
        <div className="tablet:display-flex tablet:flex-row tablet:flex-justify tablet:width-full">
          <h2 className="flex-align-self-center font-sans-xl text-bold margin-0 padding-x-2 tablet:padding-x-4 desktop:padding-x-0">
            Custom Data Download
          </h2>
          <div className="flex-align-self-center padding-0 desktop:padding-right-4 widescreen:padding-right-10">
            {!hideNav && (
              <Tooltip
                content={!requirementsMet ? "Preview button will be disabled until at least one filter is selected." : "Preview the first 100 rows of your query here."}
                field="Preview Data"
              >
                <Help
                  className="text-primary margin-bottom-2 margin-left-2"
                  fontSize="small"
                />
              </Tooltip>
            )}
            <Button
              type="button"
              className="clearfix width-card height-6 font-sans-md margin-left-1 margin-2 desktop:margin-0 desktop:margin-left-1"
              id='previewDataButton'
              disabled={!requirementsMet}
              onClick={handlePreviewDataButtonClick}
            >
              Preview Data
            </Button>
          </div>
        </div>
        <div className={"margin-0 padding-y-2 padding-x-2 tablet:padding-left-4 desktop:padding-2 tablet:display-flex desktop:display-none width-full bg-base-lighter"}>
          <Button
            type="button"
            className="usa-button margin-y-1 desktop:display-none width-full height-6"
            id='dataTypeButton'
            onClick={() => {
              setDisplayMobileDataType(true);
              hideNavDispatcher(true);
            }}
          >
            Data Type
          </Button>
          <Button
            type="button"
            className="usa-button margin-y-1 desktop:display-none width-full height-6"
            id='filtersButton'
            disabled={!dataType || !dataSubType}
            onClick={() => {
              setDisplayMobileDataType(true)
              handleMobileFiltersButtonClick()}}
          >
            Filters {appliedFilters.length? `(${appliedFilters.length})`: ''}
          </Button>
        </div>
      </div>
      {appliedFilters.length > 0 && (
        <div className="display-none desktop:display-block">
          <div className="bg-base-lightest padding-left-3 padding-right-3 padding-bottom-2 font-sans-sm">
            <FilterTags
              dataType={dataType}
              items={appliedFilters}
              onClick={(filterType, evtTarget) =>
                handleFilterButtonClick(filterType, evtTarget)
              }
              onRemove={(filterType, filterTag) =>
                onFilterTagRemovedHandler(filterType, filterTag)
              }
              onClearAll={() => onFilterTagClearAllHandler()}
            />
          </div>
        </div>
      )}
      {!isMobileOrTablet && appliedFilters.length>0 && totalCount !== null && totalCount > config.streamingLimit && (
        <div className='padding-x-3 padding-top-3'>
          <Alert type="warning">
            {`Your query exceeds the record limit of ${config.streamingLimit}. Refine your query to further limit the number of records returned or visit the `}
            <Link 
              target="_blank"
              rel="noopener noreferrer"
              href="/data/bulk-data-files"
            >
              Bulk Data Files.</Link>
          </Alert>
        </div>
      )}
      {renderPreviewData ? (
        <DataPreview
          handleUpdateInAppliedFilters={handleUpdateInAppliedFilters}
          spinnerActive={spinnerActive}
          setSpinnerActive={setSpinnerActive}
        />
      ) : (
        <div className="desktop:margin-3 tablet:margin-x-10 flex-justify-center padding-3 tablet:border mobile-lg:width-mobile-lg line-height-sans-5 margin-0 tablet:margin-3">
          <h3 className="font-sans-lg margin-top-0">To get started:</h3>
          <ul>
            <li>
              Build a query by choosing a data type and subtype. Click Apply.
            </li>
            <li>
              Refine query by using available filters. Selection must be made
              for required filter.
            </li>
            <li>Click Preview Data to view data selection.</li>
            <li>
              Activate the tool tips{' '}
              <Help
                className="text-primary padding-top-1"
                aria-label="Tooltip image"
                aria-hidden="false"
              />{' '}
              to reveal helpful tips and info.{' '}
            </li>
            <li>
              For more help, view the{' '}
              <Link
              target="_blank"
              rel="noopener noreferrer"
              href={`${config.services.content.uri}/campd/documents/CustomDataDownload-QuickStartGuide.pdf`}
              >
                Quick Start Guide.
              </Link>
            </li>
            <li>
              <b>
                Queries are limited to --- records or about --- of hourly emissions data with no additional filters. For larger downloads, visit{' '}
                <Link
                target="_blank"
                rel="noopener noreferrer"
                href="/data/bulk-data-files"
                >
                  Bulk Data Files.
                </Link>
              </b>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    dataType: state.customDataDownload.dataType,
    dataSubType: state.customDataDownload.dataSubType,
    appliedFilters: state.customDataDownload.appliedFilters,
    totalCount: state.customDataDownload.totalCount,
    timePeriod: state.filterCriteria.timePeriod,
    filterCriteria: state.filterCriteria,
    hideNav: state.hideNav,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    hideNavDispatcher: (boolean) => dispatch(hideNav(boolean)),
    resetDataPreviewDispatcher: () => dispatch(resetDataPreview()),
    removeAppliedFiltersDispatcher: (removedFilter, removeAll, opHours) =>
      dispatch(removeAppliedFilter(removedFilter, removeAll, opHours)),
    resetFiltersDispatcher: (filterToReset, resetAll) =>
      dispatch(resetFilter(filterToReset, resetAll)),
    updateTimePeriodDispatcher: (timePeriod) =>
      dispatch(updateTimePeriod(timePeriod)),
    updateFilterCriteriaDispatcher: (filterCriteria) =>
      dispatch(updateFilterCriteria(filterCriteria)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDataPreview);
