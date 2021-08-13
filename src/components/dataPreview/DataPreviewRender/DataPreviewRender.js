import React, {useEffect} from 'react';
import DataTable from "react-data-table-component";
import DownloadFileType from '../../customDataDownload/DownloadFileType/DownloadFileType';
import { ensure508, cleanUp508 } from '../../../utils/ensure-508/rdt-table';
import { ArrowDownwardSharp } from "@material-ui/icons";

import './DataPreviewRender.scss';

const DataPreviewRender = ({
  columns,
  data,
  loading,
  dataPreview,
  totalCount
}) => {

  useEffect(() => {
    setTimeout(() => {
      ensure508();
    }, 1000);

    return () => {
      cleanUp508();
    };
  }, [dataPreview]);

  return (
    <div className="preview-content-wrapper padding-x-3 padding-y-3">
      <div className="display-flex flex-row flex-justify flex-align-center">
        <div id="data-table-title" className="flex-align-center" aria-live="polite">
          <div className="panel-header display-inline "><h3 className="margin-y-0">Data Preview &nbsp;</h3></div>
          <span className="font-alt-sm text-bold desktop:display-block desktop-lg:display-inline">
            {loading === 0 && dataPreview !== null
              ? dataPreview.length > 0
                ? `(Viewing the first ${dataPreview.length} records of ${totalCount})`
                : `No results match that search criteria. Please change the criteria and try again.`
              : 'Loading...'}
          </span>
        </div>
        <div className="clearfix">
          {loading === 0 && dataPreview !== null && dataPreview.length > 0 && (
            <DownloadFileType />
          )}
        </div>
      </div>
      {loading === 0 && dataPreview !== null && dataPreview.length > 0 && (
        <div className="data-display-table" table-aria-labelledby="data-table-title">
          <DataTable
            columns={columns}
            data={data}
            noHeader={true}
            highlightOnHover={true}
            selectableRows={false}
            responsive={false}
            striped={true}
            persistTableHead={false}
            sortIcon={
              <ArrowDownwardSharp className="margin-left-2 text-primary" />
            }
          />
        </div>
      )}
    </div>
  );
};

export default DataPreviewRender;
