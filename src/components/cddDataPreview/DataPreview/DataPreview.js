import React, { useEffect, useMemo, useState } from "react";
import { connect } from "react-redux";
import { loadDataPreview } from "../../../store/actions/customDataDownload/customDataDownload";
import DataPreviewRender from "../DataPreviewRender/DataPreviewRender";
import { dataPreviewColumns } from "../../../utils/constants/dataPreviewCol";
import TableMenu from "../TableMenu/TableMenu";
import { resetFilterCriteriaItems, updateFilterCriteria } from "../../../store/actions/customDataDownload/filterCriteria";
import { formatTableNumbers } from "../../../utils/selectors/general";

export const DataPreview = ({
  aggregation,
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
  excludableColumns,
  resetFilterCriteriaItemsDispatcher,
  updateFilterCriteriaDispatcher,
  createBookmarkHandler,
  setApiError
}) => {
  const [unsort, setUnsort] = useState(null);
  const [sortAsc, setSortAsc] = useState(null);
  const [sortDesc, setSortDesc] = useState(null);
  const [sortValue, setSortValue] = useState(null);
  const [waitForFieldMappings, setWaitForFieldMappings] = useState(false);
  const [selectedColumns, setSelectedColumns] = useState(null);
  const [focusAfterApply, setFocusAfterApply] = useState(null);
  useEffect(() => {
    if(dataPreview !== null){
      handleUpdateInAppliedFilters();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appliedFilters]);

//removing excluded columns on the data preview from the bookmark data
  useEffect(() => {
    if (filterCriteria.excludeParams){
      setWaitForFieldMappings(true)
      setSelectedColumns([...fieldMappings].filter(el => !filterCriteria.excludeParams.includes(el.value)));
    }//eslint-disable-next-line
  }, [fieldMappings])

  useEffect(() =>{
    if(dataPreview === null){
      loadDataPreviewDispacher(dataType, dataSubType, filterCriteria, aggregation);
    }
    //cleanup reset all state related to column selection
    return () => resetFilterCriteriaItemsDispatcher(['excludeParams', 'selectedColumns', 'columnState'])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  const columns = useMemo(() =>{
    if (waitForFieldMappings){
      if(selectedColumns.length) {setWaitForFieldMappings(false)}
      return selectedColumns?.map(el => ({
      name: (
        <TableMenu
          topic={el}
          setSortAsc={setSortAsc}
          setSortDesc={setSortDesc}
          setUnsort={setUnsort}
          setSortValue={setSortValue}
          setSelectedColumns={setSelectedColumns}
          selectedColumns={selectedColumns}
          excludableColumns={excludableColumns}
          focusAfterApply={focusAfterApply}
          setFocusAfterApply={setFocusAfterApply}
        />
      ),
      selector: el.value,
      width: dataPreviewColumns[dataSubType][el.label] || '90 px',
      wrap: true,
    }))
  } else {
    return selectedColumns? selectedColumns.map(el => ({
      name: (
        <TableMenu
          topic={el}
          setSortAsc={setSortAsc}
          setSortDesc={setSortDesc}
          setUnsort={setUnsort}
          setSortValue={setSortValue}
          setSelectedColumns={setSelectedColumns}
          selectedColumns={selectedColumns}
          excludableColumns={excludableColumns}
          focusAfterApply={focusAfterApply}
          setFocusAfterApply={setFocusAfterApply}
        />
      ),
      selector: el.value,
      width: dataPreviewColumns[dataSubType][el.label] || '90 px',
      wrap: true,
    })): fieldMappings.map(el => ({
        name: (
          <TableMenu
            topic={el}
            setSortAsc={setSortAsc}
            setSortDesc={setSortDesc}
            setUnsort={setUnsort}
            setSortValue={setSortValue}
            setSelectedColumns={setSelectedColumns}
            selectedColumns={selectedColumns}
            excludableColumns={excludableColumns}
            focusAfterApply={focusAfterApply}
            setFocusAfterApply={setFocusAfterApply}
          />
        ),
        selector: el.value,
        width: dataPreviewColumns[dataSubType][el.label],
        wrap: true,
      }))}}
    // eslint-disable-next-line
  ,[fieldMappings, selectedColumns]);

  const data = useMemo(() => {
    let result = [];
    const unFormattedResult = [];
    const exceptions = {id: true, year: true, 'startblock': true, 'endblock': true, 'number': true};
    if (loading === 0 && dataPreview !== null) {
      result = dataPreview.map((d,i)=>{
        d['id'] = i;
        unFormattedResult.push({...d});
        const dCopy = {...d}
        formatTableNumbers(dCopy, exceptions)
        return dCopy;
      });
    }
    if (unsort) {
      return result;
    } else if (sortAsc) {
      result = [...unFormattedResult];
      result.sort((a, b) => (a[sortValue] > b[sortValue] ? 1 : -1)).forEach(el => formatTableNumbers(el, exceptions));
      return result;
    } else if (sortDesc) {
      result = [...unFormattedResult];
      result.sort((a, b) => (a[sortValue] < b[sortValue] ? 1 : -1)).forEach(el => formatTableNumbers(el, exceptions));
      return result;
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
        createBookmarkHandler={createBookmarkHandler}
        setApiError={setApiError}
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
    excludableColumns: state.customDataDownload.excludableColumns,
    aggregation: state.customDataDownload.aggregation,
    filterCriteria: state.filterCriteria,
    loading: state.apiCallsInProgress,
    appliedFilters : state.customDataDownload.appliedFilters
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadDataPreviewDispacher: (dataType, dataSubType, filterCriteria, aggregation) => dispatch(loadDataPreview(dataType, dataSubType, filterCriteria, aggregation)),
    resetFilterCriteriaItemsDispatcher: (itemsToReset) => dispatch(resetFilterCriteriaItems(itemsToReset)),
    updateFilterCriteriaDispatcher: (filterCriteria) => dispatch(updateFilterCriteria(filterCriteria)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DataPreview);
