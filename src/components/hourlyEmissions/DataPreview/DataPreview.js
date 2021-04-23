import React, { useEffect, useMemo } from "react";
import { connect } from "react-redux";
import { loadHourlyEmissions } from "../../../store/actions/customDataDownload/hourlyEmissions/hourlyEmissions";
import * as hms from "../../../utils/selectors/hourlyEmissions";
import DataPreviewRender from "../../ManageDataDownload/DataPreviewRender/DataPreviewRender";

export const DataPreview = ({
  dataPreview,
  loadHourlyEmissionsDispacher,
  loading,
  appliedFilters,
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
      const filterValues = appliedFilters.map(filter=>hourlyEmissions[filter]);
      loadHourlyEmissionsDispacher(filterValues);
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
        Header: "Steam Load(1000lb/hr)",
        accessor: "col10",
      },
      {
        Header: "SO2(pounds)",
        accessor: "col11",
      },
      {
        Header: "NOx(pounds)",
        accessor: "col12",
      },
      {
        Header: "Avg.NOx Rate(lb/MMBtu)",
        accessor: "col13",
      },
      {
        Header: "CO2(short tons)",
        accessor: "col14",
      },
      {
        Header: "Heat Input(MMBtu)",
        accessor: "col15",
      },
      {
        Header: "Fuel Type(Primary)",
        accessor: "col16",
      },
      {
        Header: "Fuel Type(Secondary)",
        accessor: "col17",
      },
      {
        Header: "Unit Type",
        accessor: "col18",
      },
      {
        Header: "SO2 Control(s)",
        accessor: "col19",
      },
      {
        Header: "NOx Control(s)",
        accessor: "col20",
      },
      {
        Header: "PM Control(s)",
        accessor: "col21",
      },
      {
        Header: "Hg Control(s)",
        accessor: "col22",
      },
      {
        Header: "Program(s)",
        accessor: "col23",
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
    appliedFilters: state.customDataDownload.appliedFilters,
    hourlyEmissions : state.hourlyEmissions
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadHourlyEmissionsDispacher: (filtersApplied) => dispatch(loadHourlyEmissions(filtersApplied))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DataPreview);
