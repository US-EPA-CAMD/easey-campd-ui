import React, { useEffect, useMemo, useState } from 'react';
import { connect } from 'react-redux';
import { metaAdder } from '../../../utils/document/metaAdder';
import { loadBulkDataFiles, updateBulkDataFiles } from "../../../store/actions/bulkDataFilesActions";
import BulkDataFilesTable from "../BulkDataFilesTable/BulkDataFilesTable";
import getContent from '../../../utils/api/getContent';
import BulkDataFilesFilters from "../BulkDataFilesFilters/BulkDataFilesFilters";
import Markdown from '../../../components/Markdown/Markdown';
import { Button } from '@trussworks/react-uswds';
import "./BulkDataFiles.scss";
import RenderSpinner from '../../RenderSpinner/RenderSpinner';
import setApiError from '../../../store/actions/setApiErrorAction';

const BulkDataFiles = ({
  dataTable,
  loading,
  loadBulkDataFilesDispatcher,
  setApiErrorDispatcher,
  updateBulkDataFilesDispatcher,
}) => {
  const [helperText, setHelperText] = useState(null);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [previewDataApplied, setPreviewDataApplied] = useState(false);
  const [backButtonClicked, setBackButtonClicked] = useState(false);
  const [searchedItems, setSearchedItems] = useState([]);
  const [clearAllFiles, setClearAllFiles] = useState(false);
  useEffect(() => {
    document.title = 'Bulk Data Files | CAMPD | US EPA';
    getContent('/campd/data/bulk-data-files/helper-text.md', setApiErrorDispatcher).then(resp => setHelperText(resp?.data));
    if(dataTable === null){
      loadBulkDataFilesDispatcher();
    }
    return () => updateBulkDataFilesDispatcher(null);// eslint-disable-next-line
  }, []);

  const dataForDataTable = useMemo(() => {
    let result = [];
    if (dataTable) {
      result = dataTable.map((d, i)=>{
        let dCopy = {...d}
        dCopy.id = d.filename;
        dCopy.key=d.filename;
        return dCopy;
      });
      setSearchedItems(result);
    }
    return result;
  }, [dataTable]);

  useEffect(() => {
    if (clearAllFiles) {setClearAllFiles(false)}
  }, [clearAllFiles])

  useEffect(() => {
    if (backButtonClicked || previewDataApplied){
      const filterButton = document.querySelector('#filterButton');
      filterButton && filterButton.focus();
    }
  }, [backButtonClicked, previewDataApplied])

  metaAdder(
    'description',
    'The bulk data files page provides access to larger bulk downloads of apportioned and raw emissions, allowance, and compliance data'
  );
  metaAdder(
    'keywords',
    'EPA CAMD, FTP, prepackaged data download, static datasets, AMPD, emissions data, allowance, compliance, Clean air markets program data, emissions, analysis,  facility information, CAMPD, AMPD, CAMD'
  );

  return (
    <div className='container grid-row flex-wrap' id='bulk-data-files'>
      <RenderSpinner showSpinner={loading} />
      <div className={`grid-col-3 bg-base-lighter margin-0 display-${showMobileFilters? 'grid width-mobile-lg  minh-viewport': 'none  side-nav-height'} desktop:display-block`} id='filters'>
        <BulkDataFilesFilters
          dataTableRecords={dataTable}
          previewDataApplied={previewDataApplied}
          setPreviewDataApplied={setPreviewDataApplied}
          backButtonClicked={backButtonClicked}
          setBackButtonClicked={setBackButtonClicked}
          showMobileFilters={showMobileFilters}
          setShowMobileFilters={setShowMobileFilters}
          setClearAllFiles={setClearAllFiles}
          data={dataForDataTable}
        />
      </div>
      <div className={`grid-col-fill ${showMobileFilters ? 'display-none tablet:display-block' : ''}`} id='content'>
        <div className='bg-base-lightest padding-x-4 padding-top-4 padding-bottom-2'>
          <Markdown className="helper-text">{helperText}</Markdown>
          <Button
            className="desktop:display-none"
            id="filterButton"
            outline="true"
            onClick={()=>setShowMobileFilters(true)}
          >
            Filters
          </Button>
        </div>
        <div className='margin-1 grid-row'>
          <BulkDataFilesTable
            dataTableRecords ={JSON.parse(JSON.stringify(dataTable))}
            clearAllFiles={clearAllFiles}
            data={dataForDataTable}
            searchedItems={searchedItems}
            setSearchedItems={setSearchedItems}
          />
        </div>
      </div>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    dataTable: state.bulkDataFiles.dataTable,
    loading: state.apiCallsInProgress
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadBulkDataFilesDispatcher: () => dispatch(loadBulkDataFiles()),
    setApiErrorDispatcher: (api, state, errorMessage) => dispatch(setApiError(api, state, errorMessage)),
    updateBulkDataFilesDispatcher: (bulkDataFiles) => dispatch(updateBulkDataFiles(bulkDataFiles)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BulkDataFiles);
