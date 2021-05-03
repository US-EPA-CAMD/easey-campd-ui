import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Button } from '@trussworks/react-uswds';
import HourlyEmissionsDataPreview from '../../hourlyEmissions/DataPreview/DataPreview';
import { resetDataPreview } from '../../../store/actions/customDataDownload/customDataDownload';
import * as constants from '../../../utils/constants/emissions';
// *** STYLES (individual component)
import './ManageDataPreview.scss';

const ManageDataPreview = ({
  dataType,
  dataSubType,
  appliedFilters,
  resetDataPreviewDispacher,
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
    const indexArray = first.map((el) => {
      return second.indexOf(el);
    });
    return indexArray.indexOf(-1) === -1;
  };

  const handleUpdateInAppliedFilters = () => {
    resetDataPreviewDispacher();
    setRenderPreviewData(false);
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
      'Annual Emissions': {
        requiredFilters: ['unknown'],
        component: null,
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
      'Holdings': {
        requiredFilters: ['unknown'],
        component: null,
      },
      'Transactions': {
        requiredFilters: ['unknown'],
        component: null,
      },
    },
    COMPLIANCE: {},
  };

  return (
    <div className="minh-tablet width-full manage-data-preview-wrapper">
      <div className="display-flex flex-row flex-justify bg-base-lightest padding-left-5 padding-right-7 minh-10 maxh-15">
        <div className="flex-align-self-center font-alt-2xl text-bold">Custom Data Download</div>
        <Button type="button" className="flex-align-self-center clearfix width-card height-6 font-sans-md"
          disabled={!requirementsMet} onClick={()=>setRenderPreviewData(true)}> Preview Data</Button>
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDataPreview);
