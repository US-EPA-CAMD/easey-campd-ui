import React, { useMemo, useEffect, useCallback, useState } from 'react';
import DataTable from 'react-data-table-component';
import { ArrowDownwardSharp } from '@material-ui/icons';
import { formatDateToYYMMDD } from '../../../utils/selectors/general';
import BulkDataFilesDownload from '../BulkDataFilesDownload/BulkDataFilesDownload';
import { convertToBytes, downloadLimitReached, formatFileSize } from '../../../utils/selectors/general';
import config from '../../../config';

import {
  ensure508,
  cleanUp508,
  setCheckboxToReferenceColumn,
} from '../../../utils/ensure-508/rdt-table';
import remarkGfm from 'remark-gfm';
import getContent from '../../../utils/api/getContent';
import ReactMarkdown from 'react-markdown';
import { Alert } from '@trussworks/react-uswds';

const BulkDataFilesTable = ({
  dataTableRecords
}) => {
  const [selectedFiles, setSelectedFiles] = useState({});
  const [fileSize, setFileSize] = useState(0);
  const [limitAlert, setLimitAlert] = useState(null);
  const [limitReached, setLimitReached] = useState(false);
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

    return () => {
      cleanUp508();
    };
  }, [dataTableRecords]);
  const columns = useMemo(() => [
    {
      name: 'File Name',
      selector: row => row.filename,
      sortable: true,
    },
    {
      name: 'Date Updated',
      selector: row => formatDateToYYMMDD(row.lastUpdated),
      sortable: true,
      maxWidth: "250px"
    },
    {
      name: 'Description',
      selector: row => row.description,
      sortable: true,
      wrap: true
    },
    {
      name: 'File Size',
      selector: row => row.gigaBytes > 0 ? `${row.gigaBytes} GB` : row.megaBytes > 0 ? `${row.megaBytes} MB`: `${row.kiloBytes} KB`,
      sortable: true,
    }
  ], []);

  const data = useMemo(() => {
    let result = [];
    if (dataTableRecords) {
      result = dataTableRecords.map((d,i)=>{
        d['id'] = i;
        return d;
      });
    }
    return result;
  }, [dataTableRecords]);
  useEffect(() => {
    getContent('/campd/data/bulk-data-files/download-limit-alert.md').then(
      (resp) => {
        let limitText = resp.data;
        if (limitText.includes('[limit-configuration]')) {
          limitText = limitText.replace('[limit-configuration]', downloadLimit);
        }
        setLimitAlert(limitText);
      }
    );//eslint-disable-next-line
  }, []);

  useEffect(() => {
    let currentSize = 0;
    if(selectedFiles.selectedCount > 0){
      selectedFiles.selectedRows.forEach(file => {
        const maxUnit =  file.gigaBytes > 0 ? `${file.gigaBytes} GB` : file.megaBytes > 0 ? `${file.megaBytes} MB`: file.kiloBytes? `${file.kiloBytes} KB`: file.bytes;
        const bytes = convertToBytes(maxUnit);
        currentSize += parseFloat(bytes);
      })
      currentSize = formatFileSize(currentSize)
      setFileSize(currentSize);
      if (downloadLimitReached(currentSize, downloadLimit))setLimitReached(true);
    } 
    else {
      setFileSize(0)
      setLimitReached(false)
    }// eslint-disable-next-line
  }, [selectedFiles])
  
  const handleSelectedFiles = useCallback((files) => setSelectedFiles( files), [])

  return (
    <div className="data-display-table grid-col-fill margin-x-2">
      {limitReached? <div className='padding-top-3'>
          <Alert type="warning" aria-live="assertive">
            <ReactMarkdown
              children={limitAlert}
              remarkPlugins={[remarkGfm]}
              components={{
                p: "span"
              }}
            />
          </Alert>
        </div>: null}
      <BulkDataFilesDownload fileSize={fileSize} limitReached={limitReached} selectedFiles={selectedFiles}/>
      <DataTable
        columns={columns}
        data={data}
        noHeader={true}
        highlightOnHover={true}
        selectableRows={true}
        selectableRowsVisibleOnly
        responsive={false}
        striped={true}
        persistTableHead={false}
        defaultSortField="filename"
        pagination
        paginationRowsPerPageOptions={[10, 25, 50, 100]}
        sortIcon={<ArrowDownwardSharp className="margin-left-2 text-primary" />}
        onSelectedRowsChange={handleSelectedFiles}
      />
    </div>
  );
};

export default BulkDataFilesTable;
