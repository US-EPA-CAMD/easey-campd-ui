import React from 'react';
import { connect } from 'react-redux';

import { Help } from '@material-ui/icons';
import { Button } from '@trussworks/react-uswds';
import Tooltip from '../Tooltip/Tooltip';
import {
  resetDataPreview,
  removeAppliedFilter,
} from '../../store/actions/customDataDownload/customDataDownload';
import {
  resetFilter,
  updateTimePeriod,
  updateFilterCriteria,
} from '../../store/actions/customDataDownload/filterCriteria';

export const MobileMenu = ({
  dataSubtypeApplied,
  appliedFilters,
  resetFiltersDispatcher,
  removeAppliedFiltersDispatcher,
  resetDataPreviewDispatcher,
  handleBackButtonClick,
  handlePreviewDataButtonClick,
  hideFilterMenu
}) => {
  const clearAllFilters = () => {
    resetFiltersDispatcher(null, true);
    removeAppliedFiltersDispatcher(null, true);
    resetDataPreviewDispatcher();
  };
  const handleDisplayPreviewData = () => {
    handleBackButtonClick();
    handlePreviewDataButtonClick();
  };
  return (
    <>
      {dataSubtypeApplied === true && (
        <div className="mobile-lg:display-flex flex-justify border-top-1px border-base-light padding-x-2 padding-y-3 desktop:display-none">
          <Button
            className="float-left clearfix height-6"
            outline="true"
            onClick={handleBackButtonClick}
          >
            Back
          </Button>
          {!hideFilterMenu && <>
          <div className="mobile-lg:display-flex">
            <Tooltip
              content="Preview the first 100 rows of your query here."
              field="Preview Data"
            >
              <Help
                className="text-primary margin-bottom-2 margin-left-2 height-6"
                fontSize="small"
              />
            </Tooltip>
            <Button
              type="button"
              className="clearfix width-card height-6 font-sans-md"
              disabled={!appliedFilters.length}
              onClick={handleDisplayPreviewData}
            >
              Preview Data
            </Button>
          </div>
          <Button
            type="button"
            outline="true"
            className="float-left clearfix height-6"
            disabled={!appliedFilters.length}
            onClick={clearAllFilters}
          >
            Clear All
          </Button></>}
        </div>
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  dataType: state.customDataDownload.dataType,
  dataSubType: state.customDataDownload.dataSubType,
});

const mapDispatchToProps = (dispatch) => {
  return {
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
export default connect(mapStateToProps, mapDispatchToProps)(MobileMenu);
