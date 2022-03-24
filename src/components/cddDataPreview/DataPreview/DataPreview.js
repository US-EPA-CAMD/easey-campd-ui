import React, { useEffect, useMemo } from "react";
import { connect } from "react-redux";
import { loadDataPreview } from "../../../store/actions/customDataDownload/customDataDownload";
import DataPreviewRender from "../DataPreviewRender/DataPreviewRender";
import { dataPreviewColumns } from "../../../utils/constants/dataPreviewCol";

export const DataPreview = ({
  dataType,
  dataSubType,
  dataPreview,
  loadDataPreviewDispacher,
  loading,
  filterCriteria,
  handleUpdateInAppliedFilters,
  appliedFilters,
  totalCount,
  fieldMappings,
}) => {
  useEffect(() => {
    if(dataPreview !== null){
      handleUpdateInAppliedFilters();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appliedFilters]);

  useEffect(() =>{
    if(dataPreview === null){
      loadDataPreviewDispacher(dataType, dataSubType, filterCriteria);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);
  const columns = useMemo(() =>
    fieldMappings.map(el => ({
      name: el.label,
      selector: el.value,
      sortable: true,
      width : dataPreviewColumns[dataSubType][el.label],
      wrap: true
    }))
    // eslint-disable-next-line
  ,[fieldMappings]);

  const data = useMemo(() => {
    let result = [];
    if (loading === 0 && dataPreview !== null) {
      result = dataPreview.map((d,i)=>{
        d['id'] = i;
        return d;
      });
    }
    return result;
  }, [loading, dataPreview]);

  return (
      <DataPreviewRender
        loading={loading}
        dataPreview={dataPreview}
        columns={columns}
        data={data}
        totalCount={totalCount}
        handleBackButton={handleUpdateInAppliedFilters}
      />
  );
};

const mapStateToProps = (state) => {
  return {
    dataType : state.customDataDownload.dataType,
    dataSubType: state.customDataDownload.dataSubType,
    dataPreview: state.customDataDownload.dataPreview,
    totalCount: state.customDataDownload.totalCount,
    fieldMappings: state.customDataDownload.fieldMappings,
    filterCriteria: state.filterCriteria,
    loading: state.apiCallsInProgress,
    appliedFilters : state.customDataDownload.appliedFilters
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadDataPreviewDispacher: (dataType, dataSubType, filterCriteria) => dispatch(loadDataPreview(dataType, dataSubType, filterCriteria))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DataPreview);
