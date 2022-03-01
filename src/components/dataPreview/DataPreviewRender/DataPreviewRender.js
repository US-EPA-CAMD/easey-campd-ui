import React, { useEffect } from 'react';
import { ArrowDownwardSharp } from '@material-ui/icons';
import { Button } from '@trussworks/react-uswds';
import DataTable from 'react-data-table-component';
import DownloadFileType from '../../customDataDownload/DownloadFileType/DownloadFileType';
import RenderSpinner from '../../RenderSpinner/RenderSpinner'
import { ensure508, cleanUp508 } from '../../../utils/ensure-508/rdt-table';

import './DataPreviewRender.scss';

const DataPreviewRender = ({
  columns,
  data,
  loading,
  dataPreview,
  totalCount,
  handleBackButton,
}) => {
  useEffect(() => {
    const arrowBackSvg = document.getElementsByClassName("arrow-back-svg");
    if(arrowBackSvg.length>0){
      arrowBackSvg[0].setAttribute("viewBox","0 0 24 14")
    }
    setTimeout(() => {
      ensure508();
    }, 1000);

    return () => {
      cleanUp508();
    };
  }, [dataPreview]);

  return (
    <div className="preview-content-wrapper padding-x-3 padding-y-3">
      <div className="grid-row">
        <div
          id="data-table-title"
          aria-live="polite"
          className="grid-col-12 desktop:grid-col-6 widescreen:grid-col-8"
        >
          {loading === 0 && dataPreview !== null ? (
            <div className="display-flex">
            <div className="display-inline desktop:display-none">
            {loading === 0 && dataPreview !== null && (
              <Button
                outline="true"
                onClick={async () => {
                  handleBackButton();
                  const filterButton = await document.querySelector('#previewDataButton');
                  filterButton.focus();
                }}
                aria-label="Back - Select to modify filter selections."
              >
                Back
              </Button>
            )}
          </div>
            <div className='data-preview-header tablet:margin-x-auto desktop:margin-x-0'>
              <div className="panel-header display-inline padding-left-05 tablet:padding-left-0 tablet:margin-left-neg-9 desktop:padding-left-0 desktop:margin-left-0">
                <h3>Data Preview &nbsp;</h3>
              </div>
              <span
                className="font-sans-sm text-bold display-block widescreen:display-inline
                desktop:padding-left-0 tablet:margin-left-neg-9 desktop:margin-left-0"
              >
                {dataPreview.length > 0
                  ? `(Viewing the first ${dataPreview.length} records of ${totalCount})`
                  : `No results match that search criteria. Please change the criteria and try again.`}
              </span>
              </div>
            </div>
          ) : (
            <RenderSpinner showSpinner={loading} />
            )}
        </div>
        <div className="grid-col-12 desktop:grid-col-6 widescreen:grid-col-4">
          {loading === 0 && dataPreview !== null && dataPreview.length > 0 && (
            <DownloadFileType loading={loading} />
          )}
        </div>
      </div>
      {loading === 0 && dataPreview !== null && dataPreview.length > 0 && (
        <div
          className="data-display-table"
          table-aria-labelledby="data-table-title"
        >
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
