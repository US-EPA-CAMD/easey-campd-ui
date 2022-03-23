import React, { useMemo, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import { ArrowDownwardSharp } from '@material-ui/icons';

import {
  ensure508,
  cleanUp508,
  setCheckboxToReferenceColumn,
} from '../../../utils/ensure-508/rdt-table';

const BulkDataFilesTable = ({
  dataTableRecords
}) => {
  useEffect(() => {
    const arrowBackSvg = document.getElementsByClassName("arrow-back-svg");
    if(arrowBackSvg.length>0){
      arrowBackSvg[0].setAttribute("viewBox","0 0 24 14")
    }
    setTimeout(() => {
      ensure508();
    }, 1000);
    setCheckboxToReferenceColumn(dataTableRecords, 'filename', 'file names')

    return () => {
      cleanUp508();
    };
  }, [dataTableRecords]);

  const columns = [
    {
      name: 'File Name',
      selector: row => row.filename,
      sortable: true,
    },
    {
      name: 'Date Updated',
      selector: row => row.lastUpdated,
      sortable: true,
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
  ];

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

  return (
    <div 
      className="data-display-table grid-col-fill" 
      table-aria-labelledby="data-table-title"
    >
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
        paginationRowsPerPageOptions={[10,25,50,100]}
        sortIcon={
          <ArrowDownwardSharp className="margin-left-2 text-primary" />
        }
      />
    </div>
  );
};

export default BulkDataFilesTable;
