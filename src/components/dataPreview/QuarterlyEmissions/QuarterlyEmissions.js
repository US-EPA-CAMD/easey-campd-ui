import React, { useEffect, useMemo } from "react";
import { connect } from "react-redux";
import { loadQuarterlyEmissions } from "../../../store/actions/customDataDownload/customDataDownload";
import { getQuarterlyEmissionsTableRecords } from "../../../utils/selectors/emissions";
import DataPreviewRender from "../DataPreviewRender/DataPreviewRender";

export const QuarterlyEmissions = ({
  dataPreview,
  loadQuarterlyEmissionsDispacher,
  loading,
  filterCriteria,
  handleUpdateInAppliedFilters,
  appliedFilters,
  totalCount
}) => {
  useEffect(() => {
    if(dataPreview !== null){
      handleUpdateInAppliedFilters();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appliedFilters]);

  useEffect(() =>{
    if(dataPreview === null){
      loadQuarterlyEmissionsDispacher(filterCriteria);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

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
        Header: "Quarter",
        accessor: "col7",
      },
      {
        Header: "Sum of the Operating Time",
        accessor: "col8",
      },
      {
        Header: "Operating Time Count",
        accessor: "col9",
      },
      {
        Header: "Gross Load (MW)",
        accessor: "col10",
      },
      {
        Header: "Steam Load (1000 lb/hr)",
        accessor: "col11",
      },
      {
        Header: "SO2 Mass (lbs)",
        accessor: "col12",
      },
      {
        Header: "SO2 Rate (lbs/mmBtu)",
        accessor: "col13",
      },
      {
        Header: "NOx Mass (lbs)",
        accessor: "col14",
      },
      {
        Header: "NOx Rate (lbs/mmBtu)",
        accessor: "col15",
      },
      {
        Header: "CO2 Mass (short tons)",
        accessor: "col16",
      },
      {
        Header: "CO2 Rate (short tons/mmBtu)",
        accessor: "col17",
      },
      {
        Header: "Heat Input (mmBtu)",
        accessor: "col18",
      },
      {
        Header: "Primary Fuel Type",
        accessor: "col19",
      },
      {
        Header: "Secondary Fuel Type",
        accessor: "col20",
      },
      {
        Header: "Unit Type",
        accessor: "col21",
      },
      {
        Header: "SO2 Controls",
        accessor: "col22",
      },
      {
        Header: "PM Controls",
        accessor: "col23",
      },
      {
        Header: "NOx Controls",
        accessor: "col24",
      },
      {
        Header: "Hg Controls",
        accessor: "col25",
      },
      {
        Header: "Program",
        accessor: "col26",
      }
    ],
    []
  );

  const data = useMemo(() => {
    if (loading === 0 && dataPreview !== null) {
      return getQuarterlyEmissionsTableRecords(dataPreview);
    } else {
      return [{ col3: "Loading quarterly emissions data preview..." }];
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
    appliedFilters : state.customDataDownload.appliedFilters
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadQuarterlyEmissionsDispacher: (filters) => dispatch(loadQuarterlyEmissions(filters))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(QuarterlyEmissions);
