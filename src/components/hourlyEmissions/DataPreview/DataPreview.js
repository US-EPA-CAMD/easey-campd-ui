import React, { useEffect, useMemo } from "react";
import { connect } from "react-redux";
import { loadHourlyEmissions } from "../../../store/actions/customDataDownload/hourlyEmissions/hourlyEmissions";
import * as hms from "../../../utils/selectors/hourlyEmissions";
import DataPreviewRender from "../../customDataDownload/DataPreviewRender/DataPreviewRender";

export const DataPreview = ({
  dataPreview,
  loadHourlyEmissionsDispacher,
  loading,
  hourlyEmissions,
  handleUpdateInAppliedFilters,
  totalCount
}) => {
  useEffect(() => {
    if(dataPreview !== null){
      handleUpdateInAppliedFilters();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hourlyEmissions]);

  useEffect(() =>{
    if(dataPreview === null){
      loadHourlyEmissionsDispacher(hourlyEmissions);
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
        Header: "Date",
        accessor: "col6",
      },
      {
        Header: "Hour",
        accessor: "col7",
      },
      {
        Header: "Operating Time",
        accessor: "col8",
      },
      {
        Header: "Gross Load (MW)",
        accessor: "col9",
      },
      {
        Header: "Steam Load (1000 lb/hr)",
        accessor: "col10",
      },
      {
        Header: "SO2 Mass (lbs)",
        accessor: "col11",
      },
      {
        Header: "SO2 Mass Measure Indicator",
        accessor: "col12",
      },
      {
        Header: "SO2 Rate (lbs/mmBtu)",
        accessor: "col13",
      },
      {
        Header: "SO2 Rate Measure Indicator",
        accessor: "col14",
      },
      {
        Header: "NOx Mass (lbs)",
        accessor: "col15",
      },
      {
        Header: "NOx Mass Measure Indicator",
        accessor: "col16",
      },
      {
        Header: "NOx Rate (lbs/mmBtu)",
        accessor: "col17",
      },
      {
        Header: "NOx Rate Measure Indicator",
        accessor: "col18",
      },
      {
        Header: "CO2 Mass (short tons)",
        accessor: "col19",
      },
      {
        Header: "CO2 Mass Measure Indicator",
        accessor: "col20",
      },
      {
        Header: "CO2 Rate (short tons/mmBtu)",
        accessor: "col21",
      },
      {
        Header: "CO2 Rate Measure Indicator ",
        accessor: "col22",
      },
      {
        Header: "Heat Input (mmBtu)",
        accessor: "col23",
      },
      {
        Header: "Primary Fuel Type",
        accessor: "col24",
      },
      {
        Header: "Secondary Fuel Type",
        accessor: "col25",
      },
      {
        Header: "Unit Type",
        accessor: "col26",
      },
      {
        Header: "SO2 Controls",
        accessor: "col27",
      },
      {
        Header: "PM Controls",
        accessor: "col28",
      },
      {
        Header: "NOx Controls",
        accessor: "col29",
      },
      {
        Header: "Hg Controls",
        accessor: "col30",
      },
      {
        Header: "Program",
        accessor: "col31",
      }
    ],
    []
  );

  const data = useMemo(() => {
    if (loading === 0 && dataPreview !== null) {
      return hms.getTableRecords(dataPreview);
    } else {
      return [{ col3: "Loading hourly emissions data preview..." }];
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
    loading: state.apiCallsInProgress,
    hourlyEmissions : state.hourlyEmissions
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadHourlyEmissionsDispacher: (filtersApplied) => dispatch(loadHourlyEmissions(filtersApplied))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DataPreview);
