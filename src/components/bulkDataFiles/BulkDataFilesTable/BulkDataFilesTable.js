import React, { useMemo, useEffect, useCallback, useState } from 'react';
import DataTable from 'react-data-table-component';
import { ArrowDownwardSharp, Help } from '@material-ui/icons';
import { formatDateToYYMMDD, convertToBytes, downloadLimitReached, formatFileSize } from '../../../utils/selectors/general';
import BulkDataFilesDownload from '../BulkDataFilesDownload/BulkDataFilesDownload';
import config from '../../../config';
import usePrevious from "../../../utils/hooks/usePrevious";
import "./BulkDataFilesTable.scss";

import {
  ensure508,
  cleanUp508,
  setCheckboxToReferenceColumn,
} from '../../../utils/ensure-508/rdt-table';
import remarkGfm from 'remark-gfm';
import getContent from '../../../utils/api/getContent';
import ReactMarkdown from 'react-markdown';
import { Alert, Search} from '@trussworks/react-uswds';
import Tooltip from '../../Tooltip/Tooltip';
import setApiError from '../../../store/actions/setApiErrorAction';
import { connect } from 'react-redux';
const BulkDataFilesTable = ({
  clearAllFiles,
  dataTableRecords,
  setApiErrorDispatcher,
  data, searchedItems, setSearchedItems
}) => {
  const tableMsg = (<span aria-live="assertive">There are no records to display</span>)
  const [searchText, setSearchText] = useState('');
  const prevSearchText = usePrevious(searchText);
  const [noDataMsg, setNoDataMsg] = useState(tableMsg);
  const [selectedFiles, setSelectedFiles] = useState({});
  const [fileSize, setFileSize] = useState(0);
  const [limitAlert, setLimitAlert] = useState(null);
  const [limitReached, setLimitReached] = useState(false);
  const [focusBox, setFocusBox] = useState(false);
  const { downloadLimit } = config.app;
  useEffect(() => {
    const arrowBackSvg = document.getElementsByClassName("arrow-back-svg");
    if(arrowBackSvg.length>0){
      arrowBackSvg[0].setAttribute("viewBox","0 0 24 14")
    }
    setTimeout(() => {
      ensure508();
      const table = document.querySelector('[role="table"]')
      if (table){
        table.setAttribute("aria-label", 'Bulk Data File selection table')}
    }, 1000);
    setCheckboxToReferenceColumn(dataTableRecords, 'filename', 'file names')
    setNoDataMsg(tableMsg);
    if(dataTableRecords !== null && dataTableRecords.length >0 && !focusBox){
      //to show focus highlight box on header checkbox
      const headerCheckbox = document.getElementsByClassName("rdt_TableCol")[0];
      headerCheckbox.setAttribute("class", "sc-hKwDye sc-egiyK dnUdft fHkgxZ");
      headerCheckbox.firstChild.setAttribute("class", "rdt_TableCol");
      setFocusBox(true);
    }
    return () => {
      cleanUp508();
    };// eslint-disable-next-line
  }, [dataTableRecords]);
  const columns = useMemo(() => [
    {
      name: 'File Name',
      selector: row => row.filename,
      sortable: true,
      minWidth: "250px"
    },
    {
      name: 'Date Updated',
      selector: row => formatDateToYYMMDD(row.lastUpdated),
      sortable: true,
      maxWidth: "250px"
    },
    {
      name: 'Description',
      selector: row => row.metadata?.description,
      sortable: true,
      wrap: true
    },
    {
      name: 'File Size',
      selector: row => row.gigaBytes >= 1 ? `${row.gigaBytes} GB` : row.megaBytes >= 1 ? `${row.megaBytes} MB`: row.kiloBytes >= 1 ? `${row.kiloBytes} KB`: `${row.bytes} Bytes`,
      sortable: true,
    }
  ], []);

  useEffect(() => {
    getContent('/campd/data/bulk-data-files/download-limit-alert.md', setApiErrorDispatcher).then(
      (resp) => {
        if (resp){
          let limitText = resp.data;
          if (limitText.includes('[limit-configuration]')) {
            limitText = limitText.replace('[limit-configuration]', downloadLimit);
          }
          setLimitAlert(limitText);
        }
      }
    );//eslint-disable-next-line
  }, []);

  useEffect(() => {
    let currentSize = 0;
    if(selectedFiles.selectedCount > 0){
      selectedFiles.selectedRows.forEach(file => {
        const maxUnit =  file.gigaBytes >= 1 ? `${file.gigaBytes} GB` : file.megaBytes >= 1 ? `${file.megaBytes} MB`: file.kiloBytes >= 1 ? `${file.kiloBytes} KB`: `${file.bytes} Bytes`;
        const bytes = convertToBytes(maxUnit);
        currentSize += parseFloat(bytes);
      })
      currentSize = formatFileSize(currentSize)
      setFileSize(currentSize);
      if (downloadLimitReached(currentSize, downloadLimit)) {
        setLimitReached(true);
      }
    }
    else {
      setFileSize(0)
      setLimitReached(false)
    }// eslint-disable-next-line
  }, [selectedFiles])

  const handleSelectedFiles = useCallback((files) => setSelectedFiles( files), [])

  const subHeaderComponentMemo = useMemo(() => {
    if(prevSearchText && searchText === ""){
      setSearchedItems(data);
    }
    const handleSearch = (e) =>{
      e.preventDefault();
      const filteredItems = data.filter(
        item => item.metadata.description? item.filename.toLowerCase().includes(searchText.toLowerCase()) || item.metadata.description.toLowerCase().includes(searchText.toLowerCase())
        : item.filename.toLowerCase().includes(searchText.toLowerCase()) 
      );
      setSearchedItems(filteredItems);
      if(filteredItems.length === 0){
        setNoDataMsg(<span aria-live="assertive">No results match that search criteria. Please change the criteria and try again.</span>);
      }
    }
		return (
      <span className="display-block">
        <Search
          inputId="bulk-data-files-table-search"
          label="Search Bulk Data Files Table"
          placeholder="Keyword"
          onSubmit={handleSearch}
          onChange={e => setSearchText(e.target.value)}
        />
        <div className="table-tooltip">
          <Tooltip content='"Selecting All" will select all files in all pages of the table.'>
            <Help className="text-primary" fontSize="small" />
          </Tooltip>
        </div>
      </span>
		);// eslint-disable-next-line
	}, [searchText]);

  return (
    <div className="data-display-table grid-col-fill margin-x-2">
      {limitReached ? (
        <div className="padding-top-3">
          <Alert type="warning" aria-live="assertive">
            <ReactMarkdown
              children={limitAlert}
              remarkPlugins={[remarkGfm]}
              components={{
                p: 'span',
              }}
            />
          </Alert>
        </div>
      ) : null}
      <BulkDataFilesDownload
        fileSize={fileSize}
        limitReached={limitReached}
        selectedFiles={selectedFiles}
      />
      <hr className='margin-y-3'/>
      <div className='display-flex'>
        <div className='width-full'>
          <DataTable
            clearSelectedRows={clearAllFiles}
            columns={columns}
            data={searchedItems}
            noHeader={true}
            highlightOnHover={true}
            selectableRows={true}
            responsive={false}
            striped={true}
            persistTableHead={false}
            defaultSortField="filename"
            subHeader
            subHeaderComponent={subHeaderComponentMemo}
            noDataComponent={noDataMsg}
            pagination
            paginationRowsPerPageOptions={[10, 25, 50, 100]}
            sortIcon={<ArrowDownwardSharp className="margin-left-2 text-primary" />}
            onSelectedRowsChange={handleSelectedFiles}
          />
        </div>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    setApiErrorDispatcher: (api, state, errorMessage) => dispatch(setApiError(api, state, errorMessage)),
  };
};

export default connect(null, mapDispatchToProps)(BulkDataFilesTable);
