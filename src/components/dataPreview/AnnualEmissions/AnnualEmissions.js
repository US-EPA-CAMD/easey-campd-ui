import React, { useEffect, useMemo } from "react";
import { connect } from "react-redux";
import {
  loadAnnualEmissions,
  loadOzoneEmissions,
} from "../../../store/actions/customDataDownload/customDataDownload";
import { getAnnualEmissionsTableRecords } from "../../../utils/selectors/emissions";
import DataPreviewRender from "../DataPreviewRender/DataPreviewRender";

export const AnnualEmissions = ({
  dataPreview,
  loadOzoneEmissionsDispacher,
  loadAnnualEmissionsDispacher,
  loading,
  filterCriteria,
  handleUpdateInAppliedFilters,
  appliedFilters,
  totalCount,
  ozone = false,
}) => {
  useEffect(() => {
    if (dataPreview !== null) {
      handleUpdateInAppliedFilters();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appliedFilters]);

  useEffect(() => {
    if (dataPreview === null) {
      if (ozone) {
        loadOzoneEmissionsDispacher(filterCriteria);
      } else {
        loadAnnualEmissionsDispacher(filterCriteria);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const columns = useMemo(
    () => [
      {
        Header: "State",
        accessor: "col1",
      },
      {
        Header: "Facility Name",
        accessor: "col2",
      },
      {
        Header: "Facility ID",
        accessor: "col3",
      },
      {
        Header: "Unit ID",
        accessor: "col4",
      },
      {
        Header: "Associated Stacks",
        accessor: "col5",
      },
      {
        Header: "Year",
        accessor: "col6",
      },
      {
        Header: "Sum of the Operating Time",
        accessor: "col7",
      },
      {
        Header: "Operating Time Count",
        accessor: "col8",
      },
      {
        Header: "Gross Load (MWh)",
        accessor: "col9",
      },
      {
        Header: "Steam Load (1000 lb)",
        accessor: "col10",
      },
      {
        Header: "SO2 Mass (short tons)",
        accessor: "col11",
      },
      {
        Header: "SO2 Rate (lbs/mmBtu)",
        accessor: "col12",
      },
      {
        Header: "NOx Mass (short tons)",
        accessor: "col13",
      },
      {
        Header: "NOx Rate (lbs/mmBtu)",
        accessor: "col14",
      },
      {
        Header: "CO2 Mass (short tons)",
        accessor: "col15",
      },
      {
        Header: "CO2 Rate (short tons/mmBtu)",
        accessor: "col16",
      },
      {
        Header: "Heat Input (mmBtu)",
        accessor: "col17",
      },
      {
        Header: "Primary Fuel Type",
        accessor: "col18",
      },
      {
        Header: "Secondary Fuel Type",
        accessor: "col19",
      },
      {
        Header: "Unit Type",
        accessor: "col20",
      },
      {
        Header: "SO2 Controls",
        accessor: "col21",
      },
      {
        Header: "PM Controls",
        accessor: "col22",
      },
      {
        Header: "NOx Controls",
        accessor: "col23",
      },
      {
        Header: "Hg Controls",
        accessor: "col24",
      },
      {
        Header: "Program",
        accessor: "col25",
      },
    ],
    []
  );

  const data = useMemo(() => {
    if (loading === 0 && dataPreview !== null) {
      return getAnnualEmissionsTableRecords(dataPreview);
    } else {
      const message = ozone ? "ozone" : "annual";
      return [{ col3: `Loading ${message} emissions data preview...` }];
    }
  }, [loading, dataPreview]);

  return (
    <DataPreviewRender
      loading={loading}
      dataPreview={dataPreview}
      columns={columns}
      data={data}
      totalCount={totalCount}
    />
  );
};

const mapStateToProps = (state) => {
  return {
    dataPreview: state.customDataDownload.dataPreview,
    totalCount: state.customDataDownload.totalCount,
    filterCriteria: state.filterCriteria,
    loading: state.apiCallsInProgress,
    appliedFilters: state.customDataDownload.appliedFilters,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadOzoneEmissionsDispacher: (filters) =>
      dispatch(loadOzoneEmissions(filters)),
    loadAnnualEmissionsDispacher: (filters) =>
      dispatch(loadAnnualEmissions(filters)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(AnnualEmissions);
