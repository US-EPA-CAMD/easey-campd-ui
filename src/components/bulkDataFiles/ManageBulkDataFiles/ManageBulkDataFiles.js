import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { metaAdder } from '../../../utils/document/metaAdder';
import { loadBulkDataFiles } from "../../../store/actions/bulkDataFilesActions";
import BulkDataFilesTable from "../BulkDataFilesTable/BulkDataFilesTable";
import { Link } from '@trussworks/react-uswds';
import Tooltip from '../../Tooltip/Tooltip';
import { Help } from '@material-ui/icons';

const ManageBulkDataFiles = ({
  dataTable,
  loadBulkDataFilesDispatcher
}) => {

  useEffect(() => {
    document.title = 'Bulk Data Files | CAMPD | US EPA';
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
    <div className='grid-row flex-wrap'>
      <div className='grid-col-3 maxh-viewport bg-base-lighter margin-0'/>
      <div className='grid-col-fill'>
        <div className='bg-base-lightest padding-4'>
          <h1 className='margin-0 text-bold font-sans-2xl'>Bulk Data Files</h1>
          <ul>
            <li>Use the filters on the left to narrow down the files in the table by data type.</li>
            <li>The table search function may be used at any time to also filter the files.</li>
            <li>The total file size download limit is 50 GB. To download more, perform additional downloads</li>
            <li>To download files programmatically (I.e., thru a script)</li>
            <li>Looking for raw submission files (I.e., XMLs, EDRs)? Visit the &nbsp;
              <Link 
                target="_blank"
                rel="noopener noreferrer"
                href="https://gaftp.epa.gov/DMDnLoad/"
              >
                FTP site
              </Link> 
            </li>
            <li>Hover over the 
              <Tooltip
                  content=""
                >
                <Help
                  className="text-primary"
                  fontSize="small"
                />
              </Tooltip>
              marks to reveal helpful tips and info.
            </li>
          </ul>
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
            dataTableRecords ={dataTable}
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageBulkDataFiles);
