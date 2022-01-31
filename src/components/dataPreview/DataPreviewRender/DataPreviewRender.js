import React, { useEffect } from 'react';
import { ArrowDownwardSharp } from '@material-ui/icons';
import { Button } from '@trussworks/react-uswds';
import LoadingModal from '../../LoadingModal/LoadingModal';
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
  spinnerActive,
  setSpinnerActive
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
      <div className="display-flex flex-row flex-justify flex-align-center">
        <div
          id="data-table-title"
          aria-live="polite"
          className="flex-align-center"
        >
          {loading === 0 && dataPreview !== null ? (
            <>
              <div className="mobile-lg:display-inline desktop:display-none">
                {loading === 0 && dataPreview !== null && (
                  <Button
                    outline="true"
                    onClick={async () => {
                      handleBackButton();
                      const filterButton = await document.querySelector('#previewDataButton');
                      filterButton.focus();
                    }}
                  >
                    Back
                  </Button>
                )}
              </div>
              <div className="panel-header display-inline mobile-lg:padding-left-05 desktop:padding-left-0">
                <h3>Data Preview &nbsp;</h3>
              </div>
              <span
                className="font-sans-sm text-bold mobile-lg:display-block desktop-lg:display-inline
              mobile-lg:padding-left-2 desktop:padding-left-0 mobile-lg:margin-left-9 desktop:margin-left-0"
              >
                {dataPreview.length > 0
                  ? `(Viewing the first ${dataPreview.length} records of ${totalCount})`
                  : `No results match that search criteria. Please change the criteria and try again.`}
              </span>
            </>
          ) : (
            <span className="spinner"><RenderSpinner loading={loading} spinnerActive={spinnerActive} setSpinnerActive={setSpinnerActive}/></span>
            )}
        </div>
        <div className="clearfix display-none desktop:display-block">
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
