import React from "react";
import UswdsTable from "../../UswdsTable/UswdsTable";
import "./DataPreviewRender.scss";

const DataPreviewRender = ({
  columns,
  data,
  loading,
  dataPreview,
  totalCount,
}) => {
  return (
    <div className="preview-content-wrapper padding-top-7 padding-left-5 padding-right-5">
      <div>
        <div className="font-alt-xl text-bold">Data Preview &nbsp;</div>
        <span className="font-alt-sm text-bold">
          {loading === 0 && dataPreview !== null
            ? dataPreview.length > 0
              ? `(Viewing the first ${dataPreview.length} records of ${totalCount})`
              : `No results match that search criteria. Please change the criteria and try again.`
            : "Loading..."}
        </span>
      </div>
      {loading === 0 && dataPreview !== null && dataPreview.length > 0 && (
        <UswdsTable columns={columns} data={data} bordered={false} />
      )}
    </div>
  );
};

export default DataPreviewRender;
