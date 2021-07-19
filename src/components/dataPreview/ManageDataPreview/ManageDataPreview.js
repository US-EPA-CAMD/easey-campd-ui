import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Button } from '@trussworks/react-uswds';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faQuestionCircle,
} from "@fortawesome/free-solid-svg-icons";

import HourlyEmissions from '../HourlyEmissions/HourlyEmissions';
import DailyEmissions from '../DailyEmissions/DailyEmissions';
import MonthlyEmissions from '../MonthlyEmissions/MonthlyEmissions';
import QuarterlyEmissions from '../QuarterlyEmissions/QuarterlyEmissions';
import AnnualEmissions from '../AnnualEmissions/AnnualEmissions';
import FilterTags from '../../FilterTags/FilterTags';
import { isAddedToFilters } from '../../../utils/selectors/general';
import {
  resetDataPreview,
  removeAppliedFilter,
} from '../../../store/actions/customDataDownload/customDataDownload';
import {
  resetFilter,
  updateTimePeriod,
} from '../../../store/actions/customDataDownload/filterCriteria';
import * as emissionsConstants from '../../../utils/constants/emissions';

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
}) => {
  const [requirementsMet, setRequirementsMet] = useState(false);
  const [renderPreviewData, setRenderPreviewData] = useState(false);

  useEffect(() => {
    if (
      dataType &&
      dataSubType &&
      dataSubType !== '' &&
      contains(
        mapDataPreview[dataType][dataSubType]?.requiredFilters || null,
        appliedFilters
      )
    ) {
      setRequirementsMet(true);
    } else {
      setRequirementsMet(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataType, dataSubType, appliedFilters]);

  const contains = (first, second) => {
    if (first === null) {
      return false;
    }
    const search = first.map((el) => isAddedToFilters(el, second));
    return search.indexOf(false) === -1;
  };

  const handleUpdateInAppliedFilters = () => {
    resetDataPreviewDispacher();
    setRenderPreviewData(false);
  };

  const onFilterTagRemovedHandler = (filterType, label) => {
    if (filterType === 'Time Period' && label === 'Operating Hours Only') {
      updateTimePeriodDispatcher({
        startDate: timePeriod.startDate,
        endDate: timePeriod.endDate,
        opHrsOnly: false,
      });
      removeAppliedFiltersDispatcher(filterType, false, true);
    } else {
      resetFiltersDispatcher(filterType)
      removeAppliedFiltersDispatcher(filterType);
    }
    handleUpdateInAppliedFilters();
  };

  const onFilterTagClearAllHandler = () => {
    resetFiltersDispatcher(null, true);
    removeAppliedFiltersDispatcher(null, true);
    handleUpdateInAppliedFilters();
  };

  const mapDataPreview = {
    EMISSIONS: {
      'Hourly Emissions': {
        requiredFilters: emissionsConstants.EMISSIONS_REQUIRED_FILTERS,
        component: (
          <HourlyEmissions
            handleUpdateInAppliedFilters={handleUpdateInAppliedFilters}
          />
        ),
      },
      'Daily Emissions': {
        requiredFilters: emissionsConstants.EMISSIONS_REQUIRED_FILTERS,
        component: (
          <DailyEmissions
            handleUpdateInAppliedFilters={handleUpdateInAppliedFilters}
          />
        ),
      },
      'Monthly Emissions': {
        requiredFilters: emissionsConstants.EMISSIONS_REQUIRED_FILTERS,
        component: (
          <MonthlyEmissions
            handleUpdateInAppliedFilters={handleUpdateInAppliedFilters}
          />
        ),
      },
      'Quarterly Emissions': {
        requiredFilters: emissionsConstants.EMISSIONS_REQUIRED_FILTERS,
        component: (
          <QuarterlyEmissions
            handleUpdateInAppliedFilters={handleUpdateInAppliedFilters}
          />
        ),
      },
      'Ozone Season Emissions': {
        requiredFilters: emissionsConstants.EMISSIONS_REQUIRED_FILTERS,
        component: (
          <AnnualEmissions
            handleUpdateInAppliedFilters={handleUpdateInAppliedFilters}
            ozone={true}
          />
        ),
      },
      'Annual Emissions': {
        requiredFilters: emissionsConstants.EMISSIONS_REQUIRED_FILTERS,
        component: (
          <AnnualEmissions
            handleUpdateInAppliedFilters={handleUpdateInAppliedFilters}
          />
        ),
      },
      'Facility/Unit Attributes': {
        requiredFilters: ['unknown'],
        component: null,
      },
    },
    ALLOWANCE: {
      'Account Information': {
        requiredFilters: ['unknown'],
        component: null,
      },
      Holdings: {
        requiredFilters: ['unknown'],
        component: null,
      },
      Transactions: {
        requiredFilters: ['unknown'],
        component: null,
      },
    },
    COMPLIANCE: {
      'Allowance Based': {
        requiredFilters: ['unknown'],
        component: null,
      },
      'Emissions Based': {
        requiredFilters: ['unknown'],
        component: null,
      },
    },
  };
  return (
    <div className="width-full">
      <div className="display-flex flex-row flex-justify bg-base-lightest padding-left-3 padding-right-3 minh-10">
        <h2 className="flex-align-self-center font-alt-xl text-bold margin-0">
          Custom Data Download
        </h2>
        <div className="flex-align-self-center">
          <FontAwesomeIcon
            icon={faQuestionCircle}
            className="text-primary font-body-md question-icon"
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
          <div className="bg-base-lightest padding-left-3 padding-right-3 padding-bottom-2 font-alt-sm">
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
      {renderPreviewData && mapDataPreview[dataType][dataSubType].component}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    dataSubType: state.customDataDownload.dataSubType,
    appliedFilters: state.customDataDownload.appliedFilters,
    timePeriod: state.filterCriteria.timePeriod,
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDataPreview);
