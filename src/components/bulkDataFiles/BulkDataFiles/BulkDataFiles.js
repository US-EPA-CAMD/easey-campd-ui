import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { metaAdder } from '../../../utils/document/metaAdder';
import { loadBulkDataFiles, updateBulkDataFiles } from "../../../store/actions/bulkDataFilesActions";
import BulkDataFilesTable from "../BulkDataFilesTable/BulkDataFilesTable";
import getContent from '../../../utils/api/getContent';
import BulkDataFilesFilters from "../BulkDataFilesFilters/BulkDataFilesFilters";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Link } from '@trussworks/react-uswds';
import Tooltip from '../../Tooltip/Tooltip';
import { Help } from '@material-ui/icons';
import "./BulkDataFiles.scss";

const BulkDataFiles = ({
  dataTable,
  loadBulkDataFilesDispatcher,
  updateBulkDataFilesDispacher
}) => {
  const [helperText, setHelperText] = useState(null);

  useEffect(() => {
    document.title = 'Bulk Data Files | CAMPD | US EPA';
    getContent('/campd/data/bulk-data-files/helper-text.md').then(resp => setHelperText(resp.data));
    if(dataTable === null){
      loadBulkDataFilesDispatcher();
    }// eslint-disable-next-line
  }, []);

  metaAdder(
    'description',
    'The bulk data files page provides access to larger bulk downloads of apportioned and raw emissions, allowance, and compliance data'
  );
  metaAdder(
    'keywords',
    'EPA CAMD, FTP, prepackaged data download, static datasets, AMPD, emissions data, allowance, compliance, Clean air markets program data, emissions, analysis,  facility information, CAMPD, AMPD, CAMD'
  );

  return (
    <div className='grid-row flex-wrap' id='bulk-data-files'>
      <div className='grid-col-3 height-viewport bg-base-lighter margin-0 display-none desktop:display-block'>
        <BulkDataFilesFilters
          dataTableRecords={dataTable}
          updateBulkDataFilesDispacher={updateBulkDataFilesDispacher}
        />
      </div>
      <div className='grid-col-fill'>
        <div className='bg-base-lightest padding-4'>
          <ReactMarkdown
            className='helper-text'
            children={helperText}
            remarkPlugins={[remarkGfm]}
            components={{
              h1: ({node, ...props}) => <h1 className="margin-0 text-bold font-sans-2xl">{props.children}</h1>,
              a: ({node, ...props}) => <Link {...props} target="_blank" rel="noopener noreferrer" />,
              // eslint-disable-next-line
              img: ({node, ...props}) => <img {...props} />
            }}
          />
        </div>
        <div className='margin-1 grid-row'>
          <div className="margin-top-4 grid-col-1 width-3">
            <Tooltip
                content='"Selecting all” will select only the files displayed in the table’s current view page.'
              >
              <Help
                className="text-primary"
                fontSize="small"
              />
            </Tooltip>
          </div>
          <BulkDataFilesTable
            dataTableRecords ={JSON.parse(JSON.stringify(dataTable))}
          />
        </div>
      </div>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    dataTable: state.bulkDataFiles.dataTable
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadBulkDataFilesDispatcher: () => dispatch(loadBulkDataFiles()),
    updateBulkDataFilesDispacher: (tableRecords) => dispatch(updateBulkDataFiles(tableRecords))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BulkDataFiles);
