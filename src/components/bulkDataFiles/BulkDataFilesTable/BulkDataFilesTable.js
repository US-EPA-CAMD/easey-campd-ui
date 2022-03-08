import React, { useMemo } from 'react';
import DataTable from 'react-data-table-component';
import { ArrowDownwardSharp } from '@material-ui/icons';

const BulkDataFilesTable = ({
  dataTableRecords
}) => {

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
    <div className="data-display-table grid-col-fill">
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
        sortIcon={
          <ArrowDownwardSharp className="margin-left-2 text-primary" />
        }
      />
    </div>
  );
};

export default BulkDataFilesTable;
