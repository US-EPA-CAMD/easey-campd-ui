import React from 'react';

import DownloadFileType from '../../customDataDownload/DownloadFileType/DownloadFileType';
import UswdsTable from '../../UswdsTable/UswdsTable';
import './DataPreviewRender.scss';

const DataPreviewRender = ({
  columns,
  data,
  loading,
  dataPreview,
  totalCount,
}) => {
  return (
    <div className="preview-content-wrapper padding-top-4 padding-left-3 padding-bottom-2">
      <div className="display-flex flex-row flex-justify">
        <div className="flex-align-center">
          <div className="panel-header">Data Preview &nbsp;</div>
          <span className="font-alt-sm text-bold padding-top-1">
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
        <div className="table-wrapper margin-top-2">
          <UswdsTable columns={columns} data={data} bordered={false} />
        </div>
      )}
    </div>
  );
};

export default DataPreviewRender;