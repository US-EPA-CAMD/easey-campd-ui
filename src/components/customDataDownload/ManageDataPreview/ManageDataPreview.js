import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Button } from '@trussworks/react-uswds';
import HourlyEmissionsDataPreview from '../../hourlyEmissions/DataPreview/DataPreview';
import {
  resetDataPreview,
  removeAppliedFilter,
} from '../../../store/actions/customDataDownload/customDataDownload';
import * as constants from '../../../utils/constants/customDataDownload';
// *** STYLES (individual component)
import './ManageDataPreview.scss';
import FilterTags from '../../FilterTags/FilterTags';
import { isAddedToFilters } from '../../../utils/selectors/hourlyEmissions';

const ManageDataPreview = ({
  dataType,
  dataSubType,
  appliedFilters,
  handleFilterButtonClick,
  resetDataPreviewDispacher,
  removeAppliedFiltersDispatcher,
}) => {
  const [requirementsMet, setRequirementsMet] = useState(false);
  const [renderPreviewData, setRenderPreviewData] = useState(false);

  useEffect(() => {
    if (
      dataType &&
      dataSubType &&
      contains(
        mapDataPreview[dataType][dataSubType].requiredFilters,
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
    const search = first.map((el) => isAddedToFilters(el, second));
    return search.indexOf(false) === -1;
  };

  const handleUpdateInAppliedFilters = () => {
    resetDataPreviewDispacher();
    setRenderPreviewData(false);
  };

  const onFilterTagRemovedHandler = (filterType) => {
    removeAppliedFiltersDispatcher(filterType, false);
  };

  const onFilterTagClearAllHandler = () => {
    removeAppliedFiltersDispatcher(null, true);
  };

  const mapDataPreview = {
    EMISSIONS: {
      'Hourly Emissions': {
        requiredFilters: constants.HOURLY_EMISSIONS_REQUIRED_FILTERS,
        component: (
          <HourlyEmissionsDataPreview
            handleUpdateInAppliedFilters={handleUpdateInAppliedFilters}
          />
        ),
      },
      'Daily Emissions': {
        requiredFilters: ['unknown'],
        component: null,
      },
      'Monthly Emissions': {
        requiredFilters: ['unknown'],
        component: null,
      },
      'Quarterly Emissions': {
        requiredFilters: ['unknown'],
        component: null,
      },
      'Ozone Season Emissions': {
        requiredFilters: ['unknown'],
        component: null,
      },
      'Annual Emission': {
        requiredFilters: ['unknown'],
        component: null,
      },
      'Facility/Unit Attributes': {
        requiredFilters: ['unknown'],
        component: null,
      },
    },
    ALLOWANCE: {},
    COMPLIANCE: {},
  };

  return (
    <div className="minh-tablet width-full manage-data-preview-wrapper">
      <div className="font-alt-2xl text-bold padding-1 margin-left-2 bg-base-lighter">
        Custom Data Download
        <Button
          type="button"
          className="float-right clearfix margin-left-5 margin-right-9"
          disabled={!requirementsMet}
          onClick={() => setRenderPreviewData(true)}
        >
          Preview Data
        </Button>
        {appliedFilters.length > 0 && (
          <div className="padding-top-1 font-alt-sm">
            <FilterTags
              items={appliedFilters}
              onClick={(filterType) => handleFilterButtonClick(filterType)}
              onRemove={(filterType) => onFilterTagRemovedHandler(filterType)}
              onClearAll={() => onFilterTagClearAllHandler()}
            />
          </div>
        )}
      </div>

      {renderPreviewData && mapDataPreview[dataType][dataSubType].component}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    dataType: state.customDataDownload.dataType,
    dataSubType: state.customDataDownload.dataSubType,
    appliedFilters: state.customDataDownload.appliedFilters,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    resetDataPreviewDispacher: () => dispatch(resetDataPreview()),
    removeAppliedFiltersDispatcher: (removedFilter, removeAll) =>
      dispatch(removeAppliedFilter(removedFilter, removeAll)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDataPreview);
