import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { metaAdder } from '../../../utils/document/metaAdder';
import { loadBulkDataFiles } from "../../../store/actions/bulkDataFilesActions";
import BulkDataFilesTable from "../BulkDataFilesTable/BulkDataFilesTable";
import getContent from '../../../utils/api/getContent';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Alert, Button, Link } from '@trussworks/react-uswds';
import Tooltip from '../../Tooltip/Tooltip';
import { Help } from '@material-ui/icons';
import "./BulkDataFiles.scss";
import config from '../../../config';
import axios from 'axios';
import download from 'downloadjs';

const dataTable = [
  {
      "filename": "arp-initial-allocations.xls",
      "s3Path": "allowance/arp-initial-allocations.xls",
      "dataType": "allowance",
      "dataSubType": null,
      "grouping": null,
      "bytes": 63436800000,
      "kiloBytes": 619,
      "megaBytes": 0,
      "gigaBytes": 0,
      "lastUpdated": "2022-03-21T20:28:58Z",
      "description": "Acid Rain Program (ARP) Initial Allowance Allocations Data",
      "id": 0
  },
  {
      "filename": "transactions-arp.csv",
      "s3Path": "allowance/transactions-arp.csv",
      "dataType": "allowance",
      "dataSubType": null,
      "grouping": null,
      "bytes": 2502363,
      "kiloBytes": 2443,
      "megaBytes": 2,
      "gigaBytes": 0,
      "lastUpdated": "2022-03-21T20:28:58Z",
      "description": "Acid Rain Program Allowance Transactions Data",
      "id": 1
  },
  {
      "filename": "transactions-csnox.csv",
      "s3Path": "allowance/transactions-csnox.csv",
      "dataType": "allowance",
      "dataSubType": null,
      "grouping": null,
      "bytes": 1618277,
      "kiloBytes": 1580,
      "megaBytes": 1,
      "gigaBytes": 0,
      "lastUpdated": "2022-03-21T20:38:21Z",
      "description": "Cross-State Air Pollution Rule NOx Annual Program Allowance Transactions Data",
      "id": 2
  },
  {
      "filename": "transactions-csso2g1.csv",
      "s3Path": "allowance/transactions-csso2g1.csv",
      "dataType": "allowance",
      "dataSubType": null,
      "grouping": null,
      "bytes": 746992,
      "kiloBytes": 729,
      "megaBytes": 0,
      "gigaBytes": 0,
      "lastUpdated": "2022-03-21T21:01:29Z",
      "description": "Cross-State Air Pollution Rule SO2 Annual Program Group 1 Allowance Transactions Data",
      "id": 3
  },
  {
      "filename": "compliance-arp.csv",
      "s3Path": "compliance/compliance-arp.csv",
      "dataType": "compliance",
      "dataSubType": null,
      "grouping": null,
      "bytes": 7246342,
      "kiloBytes": 7076,
      "megaBytes": 6,
      "gigaBytes": 0,
      "lastUpdated": "2022-03-21T21:58:22Z",
      "description": "Acid Rain Program Annual Reconciliation Data",
      "id": 4
  },
  {
      "filename": "compliance-csnox.csv",
      "s3Path": "compliance/compliance-csnox.csv",
      "dataType": "compliance",
      "dataSubType": null,
      "grouping": null,
      "bytes": 916371,
      "kiloBytes": 894,
      "megaBytes": 0,
      "gigaBytes": 0,
      "lastUpdated": "2022-03-21T20:28:58Z",
      "description": "Cross-State Air Pollution Rule NOx Annual Program Annual Reconciliation Data",
      "id": 5
  },
  {
      "filename": "compliance-csso2g1.csv",
      "s3Path": "compliance/compliance-csso2g1.csv",
      "dataType": "compliance",
      "dataSubType": null,
      "grouping": null,
      "bytes": 691083,
      "kiloBytes": 674,
      "megaBytes": 0,
      "gigaBytes": 0,
      "lastUpdated": "2022-03-21T20:28:58Z",
      "description": "Cross-State Air Pollution Rule SO2 Annual Program Group 1 Annual Reconciliation Data",
      "id": 6
  },
  {
      "filename": "compliance-txso2.csv",
      "s3Path": "compliance/compliance-txso2.csv",
      "dataType": "compliance",
      "dataSubType": null,
      "grouping": null,
      "bytes": 6145,
      "kiloBytes": 6,
      "megaBytes": 0,
      "gigaBytes": 0,
      "lastUpdated": "2022-03-21T20:28:58Z",
      "description": "Texas SO2 Trading Program Annual Reconciliation Data",
      "id": 7
  },
  {
      "filename": "emissions-daily-2021-q1.csv",
      "s3Path": "emissions/daily/quarter/emissions-daily-2021-q1.csv",
      "dataType": "emissions",
      "dataSubType": "daily",
      "grouping": "quarter",
      "bytes": 71084971,
      "kiloBytes": 69418,
      "megaBytes": 67,
      "gigaBytes": 0,
      "lastUpdated": "2022-03-21T20:28:58Z",
      "description": "Unit-level daily Part 75 emissions data for all facilities/units for 2021 q1",
      "id": 8
  },
  {
      "filename": "emissions-daily-2021-q2.csv",
      "s3Path": "emissions/daily/quarter/emissions-daily-2021-q2.csv",
      "dataType": "emissions",
      "dataSubType": "daily",
      "grouping": "quarter",
      "bytes": 74858360,
      "kiloBytes": 73103,
      "megaBytes": 71,
      "gigaBytes": 0,
      "lastUpdated": "2022-03-21T20:28:58Z",
      "description": "Unit-level daily Part 75 emissions data for all facilities/units for 2021 q2",
      "id": 9
  },
  {
      "filename": "emissions-daily-2021-q3.csv",
      "s3Path": "emissions/daily/quarter/emissions-daily-2021-q3.csv",
      "dataType": "emissions",
      "dataSubType": "daily",
      "grouping": "quarter",
      "bytes": 77672657,
      "kiloBytes": 75852,
      "megaBytes": 74,
      "gigaBytes": 0,
      "lastUpdated": "2022-03-21T20:30:10Z",
      "description": "Unit-level daily Part 75 emissions data for all facilities/units for 2021 q3",
      "id": 10
  },
  {
      "filename": "emissions-daily-2021-q4.csv",
      "s3Path": "emissions/daily/quarter/emissions-daily-2021-q4.csv",
      "dataType": "emissions",
      "dataSubType": "daily",
      "grouping": "quarter",
      "bytes": 72548352,
      "kiloBytes": 70848,
      "megaBytes": 69,
      "gigaBytes": 0,
      "lastUpdated": "2022-03-21T20:31:00Z",
      "description": "Unit-level daily Part 75 emissions data for all facilities/units for 2021 q4",
      "id": 11
  },
  {
      "filename": "emissions-daily-2021-co.csv",
      "s3Path": "emissions/daily/state/emissions-daily-2021-co.csv",
      "dataType": "emissions",
      "dataSubType": "daily",
      "grouping": "state",
      "bytes": 4663680,
      "kiloBytes": 4554,
      "megaBytes": 4,
      "gigaBytes": 0,
      "lastUpdated": "2022-03-21T20:32:20Z",
      "description": "Unit-level daily Part 75 emissions data for all co facilities/units for 2021",
      "id": 12
  },
  {
      "filename": "emissions-daily-2021-fl.csv",
      "s3Path": "emissions/daily/state/emissions-daily-2021-fl.csv",
      "dataType": "emissions",
      "dataSubType": "daily",
      "grouping": "state",
      "bytes": 14954348,
      "kiloBytes": 14603,
      "megaBytes": 14,
      "gigaBytes": 0,
      "lastUpdated": "2022-03-21T20:32:20Z",
      "description": "Unit-level daily Part 75 emissions data for all fl facilities/units for 2021",
      "id": 13
  },
  {
      "filename": "emissions-hourly-2021-q1.csv",
      "s3Path": "emissions/hourly/quarter/emissions-hourly-2021-q1.csv",
      "dataType": "emissions",
      "dataSubType": "hourly",
      "grouping": "quarter",
      "bytes": 802953354,
      "kiloBytes": 784134,
      "megaBytes": 765,
      "gigaBytes": 0,
      "lastUpdated": "2022-03-21T20:32:39Z",
      "description": "Unit-level hourly Part 75 emissions data for all facilities/units for 2021 q1",
      "id": 14
  },
  {
      "filename": "emissions-hourly-2021-q2.csv",
      "s3Path": "emissions/hourly/quarter/emissions-hourly-2021-q2.csv",
      "dataType": "emissions",
      "dataSubType": "hourly",
      "grouping": "quarter",
      "bytes": 879364224,
      "kiloBytes": 858754,
      "megaBytes": 838,
      "gigaBytes": 0,
      "lastUpdated": "2022-03-21T20:32:59Z",
      "description": "Unit-level hourly Part 75 emissions data for all facilities/units for 2021 q2",
      "id": 15
  },
  {
      "filename": "emissions-hourly-2021-q3.csv",
      "s3Path": "emissions/hourly/quarter/emissions-hourly-2021-q3.csv",
      "dataType": "emissions",
      "dataSubType": "hourly",
      "grouping": "quarter",
      "bytes": 1138909005,
      "kiloBytes": 1112215,
      "megaBytes": 1086,
      "gigaBytes": 1,
      "lastUpdated": "2022-03-21T20:38:37Z",
      "description": "Unit-level hourly Part 75 emissions data for all facilities/units for 2021 q3",
      "id": 16
  },
  {
      "filename": "emissions-hourly-2021-q4.csv",
      "s3Path": "emissions/hourly/quarter/emissions-hourly-2021-q4.csv",
      "dataType": "emissions",
      "dataSubType": "hourly",
      "grouping": "quarter",
      "bytes": 812697970,
      "kiloBytes": 793650,
      "megaBytes": 775,
      "gigaBytes": 0,
      "lastUpdated": "2022-03-21T20:58:42Z",
      "description": "Unit-level hourly Part 75 emissions data for all facilities/units for 2021 q4",
      "id": 17
  },
  {
      "filename": "emissions-hourly-2021-al.csv",
      "s3Path": "emissions/hourly/state/emissions-hourly-2021-al.csv",
      "dataType": "emissions",
      "dataSubType": "hourly",
      "grouping": "state",
      "bytes": 107886779,
      "kiloBytes": 105358,
      "megaBytes": 102,
      "gigaBytes": 0,
      "lastUpdated": "2022-03-21T21:02:03Z",
      "description": "Unit-level hourly Part 75 emissions data for all al facilities/units for 2021",
      "id": 18
  },
  {
      "filename": "emissions-hourly-2021-tx.csv",
      "s3Path": "emissions/hourly/state/emissions-hourly-2021-tx.csv",
      "dataType": "emissions",
      "dataSubType": "hourly",
      "grouping": "state",
      "bytes": 420591366,
      "kiloBytes": 410733,
      "megaBytes": 401,
      "gigaBytes": 0,
      "lastUpdated": "2022-03-21T21:02:03Z",
      "description": "Unit-level hourly Part 75 emissions data for all tx facilities/units for 2021",
      "id": 19
  },
  {
      "filename": "facility-2017.csv",
      "s3Path": "facility/facility-2017.csv",
      "dataType": "facility",
      "dataSubType": null,
      "grouping": null,
      "bytes": 1595612,
      "kiloBytes": 1558,
      "megaBytes": 1,
      "gigaBytes": 0,
      "lastUpdated": "2022-03-21T21:07:45Z",
      "description": "Facility/Unit attributes data for 2017",
      "id": 20
  },
  {
      "filename": "facility-2018.csv",
      "s3Path": "facility/facility-2018.csv",
      "dataType": "facility",
      "dataSubType": null,
      "grouping": null,
      "bytes": 1619503,
      "kiloBytes": 1581,
      "megaBytes": 1,
      "gigaBytes": 0,
      "lastUpdated": "2022-03-21T21:07:57Z",
      "description": "Facility/Unit attributes data for 2018",
      "id": 21
  },
  {
      "filename": "facility-2019.csv",
      "s3Path": "facility/facility-2019.csv",
      "dataType": "facility",
      "dataSubType": null,
      "grouping": null,
      "bytes": 1574661,
      "kiloBytes": 1537,
      "megaBytes": 1,
      "gigaBytes": 0,
      "lastUpdated": "2022-03-21T21:08:18Z",
      "description": "Facility/Unit attributes data for 2019",
      "id": 22
  },
  {
      "filename": "facility-2020.csv",
      "s3Path": "facility/facility-2020.csv",
      "dataType": "facility",
      "dataSubType": null,
      "grouping": null,
      "bytes": 1554571,
      "kiloBytes": 1518,
      "megaBytes": 1,
      "gigaBytes": 0,
      "lastUpdated": "2022-03-21T21:08:39Z",
      "description": "Facility/Unit attributes data for 2020",
      "id": 23
  },
  {
      "filename": "facility-2021.csv",
      "s3Path": "facility/facility-2021.csv",
      "dataType": "facility",
      "dataSubType": null,
      "grouping": null,
      "bytes": 1525635,
      "kiloBytes": 1489,
      "megaBytes": 1,
      "gigaBytes": 0,
      "lastUpdated": "2022-03-21T21:08:51Z",
      "description": "Facility/Unit attributes data for 2021",
      "id": 24
  },
  {
      "filename": "mats-hourly-2021-q1.csv",
      "s3Path": "mats/hourly/quarter/mats-hourly-2021-q1.csv",
      "dataType": "mats",
      "dataSubType": "hourly",
      "grouping": "quarter",
      "bytes": 802953354,
      "kiloBytes": 784134,
      "megaBytes": 765,
      "gigaBytes": 0,
      "lastUpdated": "2022-03-21T21:09:24Z",
      "description": "Unit-level hourly Mercury and Air Toxics Standards (MATS) emissions data for all facilities/units for 2021 q1",
      "id": 25
  },
  {
      "filename": "mats-hourly-2021-q2.csv",
      "s3Path": "mats/hourly/quarter/mats-hourly-2021-q2.csv",
      "dataType": "mats",
      "dataSubType": "hourly",
      "grouping": "quarter",
      "bytes": 879364224,
      "kiloBytes": 858754,
      "megaBytes": 838,
      "gigaBytes": 0,
      "lastUpdated": "2022-03-21T21:22:18Z",
      "description": "Unit-level hourly Mercury and Air Toxics Standards (MATS) emissions data for all facilities/units for 2021 q2",
      "id": 26
  },
  {
      "filename": "mats-hourly-2021-q3.csv",
      "s3Path": "mats/hourly/quarter/mats-hourly-2021-q3.csv",
      "dataType": "mats",
      "dataSubType": "hourly",
      "grouping": "quarter",
      "bytes": 1138909005,
      "kiloBytes": 1112215,
      "megaBytes": 1086,
      "gigaBytes": 1,
      "lastUpdated": "2022-03-21T21:24:41Z",
      "description": "Unit-level hourly Mercury and Air Toxics Standards (MATS) emissions data for all facilities/units for 2021 q3",
      "id": 27
  },
  {
      "filename": "mats-hourly-2021-q4.csv",
      "s3Path": "mats/hourly/quarter/mats-hourly-2021-q4.csv",
      "dataType": "mats",
      "dataSubType": "hourly",
      "grouping": "quarter",
      "bytes": 812697970,
      "kiloBytes": 793650,
      "megaBytes": 775,
      "gigaBytes": 0,
      "lastUpdated": "2022-03-21T21:36:09Z",
      "description": "Unit-level hourly Mercury and Air Toxics Standards (MATS) emissions data for all facilities/units for 2021 q4",
      "id": 28
  },
  {
      "filename": "mats-hourly-2021-al.csv",
      "s3Path": "mats/hourly/state/mats-hourly-2021-al.csv",
      "dataType": "mats",
      "dataSubType": "hourly",
      "grouping": "state",
      "bytes": 107886779,
      "kiloBytes": 105358,
      "megaBytes": 102,
      "gigaBytes": 0,
      "lastUpdated": "2022-03-21T21:47:42Z",
      "description": "Unit-level hourly Mercury and Air Toxics Standards (MATS) emissions data for all al facilities/units for 2021",
      "id": 29
  },
  {
      "filename": "mats-hourly-2021-tx.csv",
      "s3Path": "mats/hourly/state/mats-hourly-2021-tx.csv",
      "dataType": "mats",
      "dataSubType": "hourly",
      "grouping": "state",
      "bytes": 420591366,
      "kiloBytes": 410733,
      "megaBytes": 401,
      "gigaBytes": 0,
      "lastUpdated": "2022-03-21T21:52:29Z",
      "description": "Unit-level hourly Mercury and Air Toxics Standards (MATS) emissions data for all tx facilities/units for 2021",
      "id": 30
  }
]

const formatFileSize = (bytes, decimalPoint) => {
  if (bytes === 0) return '0 Bytes';
  let k = 1000,
    dm = decimalPoint || 2,
    sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
    i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};

const downloadLimitReached = (size, limit) => {
  if (!size) {
    return false;
  }
  size = size.toLowerCase();
  const unit = size.slice(-2);
  if (unit === 'gb') {
    if (parseFloat(size) < parseFloat(limit)) {
      return false;
    } else {
      return true;
    }
  }
  const smallerUnits = { es: true, kb: true, mb: true };
  if (smallerUnits[unit]) {
    return false;
  } else return true;
};
const BulkDataFiles = ({
  loadBulkDataFilesDispatcher
}) => {
  const [helperText, setHelperText] = useState(null);
  const [files, setFiles] = useState({});
  const [fileSize, setFileSize] = useState(0);
  const [limitAlert, setLimitAlert] = useState(null);
  const [limitReached, setLimitReached] = useState(false);
  const { downloadLimit } = config.app;


  useEffect(() => {
    document.title = 'Bulk Data Files | CAMPD | US EPA';
    getContent('/campd/data/bulk-data-files/helper-text.md').then(resp => setHelperText(resp.data));
    getContent('/campd/data/bulk-data-files/download-limit-alert.md').then(
      (resp) => {
        let limitText = resp.data;
        if (limitText.includes('[limit-configuration]')) {
          limitText = limitText.replace('[limit-configuration]', downloadLimit);
        }
        setLimitAlert(limitText);
      }
    );
    if(dataTable === null){
      loadBulkDataFilesDispatcher();
    }// eslint-disable-next-line
  }, []);

  useEffect(() => {
    let currentSize = 0;
    if(files.selectedCount){
      files.selectedRows.forEach(file => currentSize += Number(file.bytes))
      currentSize = formatFileSize(currentSize)
      setFileSize(currentSize);
      setLimitReached(downloadLimitReached(currentSize, downloadLimit));
    } else {
      setFileSize(0)
      setLimitReached(false)
    }// eslint-disable-next-line
  }, [files])

  metaAdder(
    'description',
    'The bulk data files page provides access to larger bulk downloads of apportioned and raw emissions, allowance, and compliance data'
  );
  metaAdder(
    'keywords',
    'EPA CAMD, FTP, prepackaged data download, static datasets, AMPD, emissions data, allowance, compliance, Clean air markets program data, emissions, analysis,  facility filesrmation, CAMPD, AMPD, CAMD'
  );

  const onDownloadHandler = () => {
    files.selectedRows.forEach(file => {
      const {filename, s3Path} = file;
      const link = `${config.services.bulkDataFiles.uri}/${s3Path}`;
      const fileType = filename.split('.')[1]
      console.log(filename, fileType);
      console.log(file);
      console.log('link being downloaded', link);
      axios
      .get(link
      //    ,{
      //   headers: {
      //     Accept: fileType,
      //   },
      //   responseType: 'blob',
      // }
      )
      .then((response) => {
        console.log(response.data);
        // download(response.data, filename);  
      })
      .catch((error) => {
        console.log(error);
      });
    })    
  };

  return (
    <div className='grid-row flex-wrap' id='bulk-data-files'>
      <div className='grid-col-3 maxh-viewport bg-base-lighter margin-0'/>
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
        {limitReached? <div className='padding-x-2 padding-top-3 margin-x-2'>
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
        <div className='download-wrapper height-10 border-2px radius-lg bg-primary-lighter border-primary display-flex flex-row flex-align-center font-sans-sm margin-x-4 margin-top-2 padding-x-2'>
          <div className='grid-col flex-1'>Files selected: {files.selectedCount || ''}</div>
          <div className='grid-col flex-1'>Size: {fileSize || ''}</div>
          <Button
          type="button"
          className="flex-end margin-x-1"
          onClick={() => onDownloadHandler()}
          disabled={!files.selectedCount || limitReached}
          label="JSON"
        >
          Download
        </Button>
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
            setFiles={setFiles}
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

export default connect(mapStateToProps, mapDispatchToProps)(BulkDataFiles);
