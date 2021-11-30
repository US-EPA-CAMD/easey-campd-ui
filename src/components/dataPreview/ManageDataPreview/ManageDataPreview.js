import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Button } from '@trussworks/react-uswds';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
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
import { EMISSIONS_DATA_SUBTYPES } from '../../../utils/constants/emissions';
import { ALLOWANCES_DATA_SUBTYPES } from '../../../utils/constants/allowances';
import { COMPLIANCES_DATA_SUBTYPES } from '../../../utils/constants/compliances';

const ManageDataPreview = ({
  dataType,
  dataSubType,
  appliedFilters,
  timePeriod,
  handleFilterButtonClick,
  resetDataPreviewDispacher,
  resetFiltersDispatcher,
  removeAppliedFiltersDispatcher,
  updateTimePeriodDispatcher,
  filterCriteria,
  updateFilterCriteriaDispacher
}) => {
  const [requirementsMet, setRequirementsMet] = useState(false);
  const [renderPreviewData, setRenderPreviewData] = useState(false);
  const [removedAppliedFilter, setRemovedAppliedFilter] = useState(null);

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
      if(dataType === "EMISSIONS" || dataSubType === "Account Information" || dataSubType === "Holdings"){
        if(filterCriteria.filterMapping.length>0){
          engageFilterLogic(dataType, dataSubType, removedAppliedFilter, JSON.parse(JSON.stringify(filterCriteria)), updateFilterCriteriaDispacher, true);
        }
      }
    }// eslint-disable-next-line react-hooks/exhaustive-deps
  },[appliedFilters]);

  const handleUpdateInAppliedFilters = () => {
    resetDataPreviewDispacher();
    setRenderPreviewData(false);
  };

  const onFilterTagRemovedHandler = (filterType, label) => {
    if (filterType === 'Time Period') {
      if(label === "Operating Hours Only"){
        updateTimePeriodDispatcher({
          startDate: timePeriod.startDate,
          endDate: timePeriod.endDate,
          opHrsOnly: false,
        });
        removeAppliedFiltersDispatcher(filterType, false, true);
      }else{
        if(window.confirm("Removing time period will clear out previously selected criteria. Do you want to proceed?")){
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
  };

  const contains = () => {
    const mapRequiredFilters = {
      EMISSIONS: EMISSIONS_DATA_SUBTYPES,
      ALLOWANCE: ALLOWANCES_DATA_SUBTYPES,
      COMPLIANCE: COMPLIANCES_DATA_SUBTYPES,
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
      <div className="display-flex flex-row flex-justify bg-base-lightest padding-x-3 minh-10">
        <h2 className="flex-align-self-center font-sans-xl text-bold margin-0">
          Custom Data Download
        </h2>
        <div className="flex-align-self-center">
          <FontAwesomeIcon
            icon={faQuestionCircle}
            className="text-primary font-sans-md question-icon"
            title="Preview the first 100 rows of your query here."
          />
          <Button
            type="button"
            className="clearfix width-card height-6 font-sans-md margin-left-3"
            disabled={!requirementsMet}
            onClick={() => setRenderPreviewData(true)}
          >
            Preview Data
          </Button>
        </div>
      </div>
      {appliedFilters.length > 0 && (
        <div className="display-none desktop:display-block">
          <div className="bg-base-lightest padding-left-3 padding-right-3 padding-bottom-2 font-sans-sm">
            <FilterTags
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
      {renderPreviewData && (
        <DataPreview
          handleUpdateInAppliedFilters={handleUpdateInAppliedFilters}
        />
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    dataType: state.customDataDownload.dataType,
    dataSubType: state.customDataDownload.dataSubType,
    appliedFilters: state.customDataDownload.appliedFilters,
    timePeriod: state.filterCriteria.timePeriod,
    filterCriteria: state.filterCriteria,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    resetDataPreviewDispacher: () => dispatch(resetDataPreview()),
    removeAppliedFiltersDispatcher: (removedFilter, removeAll, opHours) =>
      dispatch(removeAppliedFilter(removedFilter, removeAll, opHours)),
    resetFiltersDispatcher: (filterToReset, resetAll) =>
      dispatch(resetFilter(filterToReset, resetAll)),
    updateTimePeriodDispatcher: (timePeriod) =>
      dispatch(updateTimePeriod(timePeriod)),
    updateFilterCriteriaDispacher: (filterCriteria) => 
      dispatch(updateFilterCriteria(filterCriteria)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDataPreview);
