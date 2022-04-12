import React, { useEffect, useMemo, useState } from "react";
import { connect } from "react-redux";
import { loadDataPreview } from "../../../store/actions/customDataDownload/customDataDownload";
import DataPreviewRender from "../DataPreviewRender/DataPreviewRender";
import { dataPreviewColumns } from "../../../utils/constants/dataPreviewCol";
import TableMenu from "../DataPreviewRender/TableMenu/TableMenu";

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
  const [unsort, setUnsort] = useState(null);
  const [sortAsc, setSortAsc] = useState(null);
  const [sortDesc, setSortDesc] = useState(null);
  const [sortValue, setSortValue] = useState(null);
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
  const columns = useMemo(() =>{
    return fieldMappings.map(el =>{
      return {
        name: (
          <TableMenu
            topic={el}
            fieldMappings={fieldMappings}
            setSortAsc={setSortAsc}
            setSortDesc={setSortDesc}
            setUnsort={setUnsort}
            setSortValue={setSortValue}
          />
        ),
        selector: el.value,
        width: dataPreviewColumns[dataSubType][el.label],
        wrap: true,
      };})}
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
    if (unsort) {
      return result;
    } else if (sortAsc) {
      return result.sort((a, b) => (a[sortValue] > b[sortValue] ? 1 : -1));
    } else if (sortDesc) {
      return result.sort((a, b) => (a[sortValue] < b[sortValue] ? 1 : -1));
    } else {
      return result;
    };
  }, [loading, dataPreview, sortAsc, sortDesc, unsort, sortValue]);

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
