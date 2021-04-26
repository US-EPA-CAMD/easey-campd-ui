import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Button } from "@trussworks/react-uswds";
import HourlyEmissionsDataPreview from "../../hourlyEmissions/DataPreview/DataPreview";
import { resetDataPreview } from "../../../store/actions/customDataDownload/customDataDownload";
import * as constants from "../../../utils/constants/customDataDownload";
// *** STYLES (individual component)
import "./ManageDataPreview.scss";

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
      "Hourly Emissions": {
        requiredFilters: constants.HOURLY_EMISSIONS_REQUIRED_FILTERS,
        component: (
          <HourlyEmissionsDataPreview
            handleUpdateInAppliedFilters={handleUpdateInAppliedFilters}
          />
        ),
      },
      "Daily Emissions": {
        requiredFilters: ["unknown"],
        component: null,
      },
      "Monthly Emissions": {
        requiredFilters: ["unknown"],
        component: null,
      },
      "Quarterly Emissions": {
        requiredFilters: ["unknown"],
        component: null,
      },
      "Ozone Season Emissions": {
        requiredFilters: ["unknown"],
        component: null,
      },
      "Annual Emission": {
        requiredFilters: ["unknown"],
        component: null,
      },
      "Facility/Unit Attributes": {
        requiredFilters: ["unknown"],
        component: null,
      },
    },
    ALLOWANCE: {},
    COMPLIANCE: {},
  };

  return (
    <div className="minh-tablet width-full manage-data-preview-wrapper">
      <div className="font-alt-2xl text-bold padding-1">
        Custom Data Download
        <Button
          type="button"
          className="float-right clearfix margin-left-5"
          disabled={!requirementsMet}
          onClick={() => setRenderPreviewData(true)}
        >
          Preview Data
        </Button>
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
