import React, { useEffect, useState } from 'react';
import getContent from '../../../utils/api/getContent';
import { filterBulkDataFiles } from "../../../utils/selectors/filterLogic";
import { Button, Dropdown, Label } from '@trussworks/react-uswds';
import MobileMenu from '../MobileMenu/MobileMenu';
import Tooltip from '../../Tooltip/Tooltip';
import { Help } from '@material-ui/icons';
import useCheckWidth from '../../../utils/hooks/useCheckWidth'

const BulkDataFilesFilters = ({
  dataTableRecords,
  updateBulkDataFilesDispacher,
  setShowMobileFilters
}) => {
  const [initialTableRecords, setInitialTableRecords] = useState(null);
  const [filtersContent, setFiltersContent] = useState({
    "labels": ["Data Type", "Subtype", "Grouping", "State", "Year", "Quarter"],
    "dataTypes": ["Allowance", "Compliance", "EDR", "Emissions", "Facility", "Mercury and Air Toxics Emissions (MATS)", "XML"],
    "subTypes" : {
      "Emissions" : ["Hourly", "Daily"],
      "XML":["Emissions", "Monitoring Plan", "QA"]
    },
    "groupings" : {
      "Emissions" : ["Quarterly", "State"],
      "Mercury and Air Toxics Emissions (MATS)": ["Quarterly", "State"]
    },
    "year": {
      "EDR": [1995,1996,1997,1998,1999,2000,2001,2002,2003,2004,2005,2006,2007,2008],
      "XML": {
        "Emissions": [2006,2007,2008,2009,2010,2011,2012,2013,2014,2015,2016,2017,2018,2019,2020,2021,2022],
        "QA": [2008,2009,2010,2011,2012,2013,2014,2015,2016,2017,2018,2019,2020,2021,2022]
      }
    },
    "quarter":{
      "EDR":["1st Quarter", "2nd Quarter", "3rd Quarter", "4th Quarter"],
      "XML": {
        "Emissions": ["1st Quarter", "2nd Quarter", "3rd Quarter", "4th Quarter"],
        "QA": ["1st Quarter", "2nd Quarter", "3rd Quarter", "4th Quarter"]
      }
    },
    "states" : [
      {"stateCode": "AK", "stateName": "Alaska", "epaRegion": 10},
      {"stateCode": "AL", "stateName": "Alabama", "epaRegion": 4},
      {"stateCode": "AR", "stateName": "Arkansas", "epaRegion": 6},
      {"stateCode": "AZ", "stateName": "Arizona", "epaRegion": 9},
      {"stateCode": "CA", "stateName": "California", "epaRegion": 9},
      {"stateCode": "CO", "stateName": "Colorado", "epaRegion": 8},
      {"stateCode": "CT", "stateName": "Connecticut", "epaRegion": 1},
      {"stateCode": "DC", "stateName": "District Of Columbia", "epaRegion": 3},
      {"stateCode": "DE", "stateName": "Delaware", "epaRegion": 3},
      {"stateCode": "FL", "stateName": "Florida", "epaRegion": 4},
      {"stateCode": "GA", "stateName": "Georgia", "epaRegion": 4},
      {"stateCode": "HI", "stateName": "Hawaii", "epaRegion": 9},
      {"stateCode": "IA", "stateName": "Iowa", "epaRegion": 7},
      {"stateCode": "ID", "stateName": "Idaho", "epaRegion": 10},
      {"stateCode": "IL", "stateName": "Illinois", "epaRegion": 5},
      {"stateCode": "IN", "stateName": "Indiana", "epaRegion": 5},
      {"stateCode": "KS", "stateName": "Kansas", "epaRegion": 7},
      {"stateCode": "KY", "stateName": "Kentucky", "epaRegion": 4},
      {"stateCode": "LA", "stateName": "Louisiana", "epaRegion": 6},
      {"stateCode": "MA", "stateName": "Massachusetts", "epaRegion": 1},
      {"stateCode": "MD", "stateName": "Maryland", "epaRegion": 3},
      {"stateCode": "ME", "stateName": "Maine", "epaRegion": 1},
      {"stateCode": "MI", "stateName": "Michigan", "epaRegion": 5},
      {"stateCode": "MN", "stateName": "Minnesota", "epaRegion": 5},
      {"stateCode": "MO", "stateName": "Missouri", "epaRegion": 7},
      {"stateCode": "MS", "stateName": "Mississippi", "epaRegion": 4},
      {"stateCode": "MT", "stateName": "Montana", "epaRegion": 8},
      {"stateCode": "NC", "stateName": "North Carolina", "epaRegion": 4},
      {"stateCode": "ND", "stateName": "North Dakota", "epaRegion": 8},
      {"stateCode": "NE", "stateName": "Nebraska", "epaRegion": 7},
      {"stateCode": "NH", "stateName": "New Hampshire", "epaRegion": 1},
      {"stateCode": "NJ", "stateName": "New Jersey", "epaRegion": 2},
      {"stateCode": "NM", "stateName": "New Mexico", "epaRegion": 6},
      {"stateCode": "NV", "stateName": "Nevada", "epaRegion": 9},
      {"stateCode": "NY", "stateName": "New York", "epaRegion": 2},
      {"stateCode": "OH", "stateName": "Ohio", "epaRegion": 5},
      {"stateCode": "OK", "stateName": "Oklahoma", "epaRegion": 6},
      {"stateCode": "OR", "stateName": "Oregon", "epaRegion": 10},
      {"stateCode": "PA", "stateName": "Pennsylvania", "epaRegion": 3},
      {"stateCode": "PR", "stateName": "Puerto Rico", "epaRegion": 2},
      {"stateCode": "RI", "stateName": "Rhode Island", "epaRegion": 1},
      {"stateCode": "SC", "stateName": "South Carolina", "epaRegion": 4},
      {"stateCode": "SD", "stateName": "South Dakota", "epaRegion": 8},
      {"stateCode": "TN", "stateName": "Tennessee", "epaRegion": 4},
      {"stateCode": "TX", "stateName": "Texas", "epaRegion": 6},
      {"stateCode": "UT", "stateName": "Utah", "epaRegion": 8},
      {"stateCode": "VA", "stateName": "Virginia", "epaRegion": 3},
      {"stateCode": "VT", "stateName": "Vermont", "epaRegion": 1},
      {"stateCode": "WA", "stateName": "Washington", "epaRegion": 10},
      {"stateCode": "WI", "stateName": "Wisconsin", "epaRegion": 5},
      {"stateCode": "WV", "stateName": "West Virginia", "epaRegion": 3},
      {"stateCode": "WY", "stateName": "Wyoming", "epaRegion": 8}
    ]
  });
  const [dataType, setDataType] = useState('');
  const [subType, setSubType] = useState('');
  const [grouping, setGrouping] = useState('');
  const [state, setState] = useState('');
  const [statesFiltered, setStatesFiltered]= useState([]);
  const [year, setYear] = useState('');
  const [quarter, setQuarter] = useState('');
  const [previewDataApplied, setPreviewDataApplied] = useState(false);
  const [backButtonClicked, setBackButtonClicked] = useState(false)
  const [appliedFilterSelection, setAppliedFilterSelection] = useState({
    dataType: '',
    subType: '',
    grouping: '',
    state: '',
    year: '',
    quarter: ''
  })
  const updateAppliedFilterSelection = () => 
    setAppliedFilterSelection({
    dataType: dataType,
    subType: subType,
    grouping: grouping,
    state: state,
    year: year,
    quarter: quarter
  });
  const selection = {
    dataType: dataType,
    subType: subType,
    grouping: grouping,
    state: state,
    year: year,
    quarter: quarter
  };

  const isMobileOrTablet = useCheckWidth([0, 1024]);
  const changeFromAppliedFilters = isMobileOrTablet && dataType !== appliedFilterSelection.dataType;
  useEffect(() => {
    if(filtersContent === null){
      getContent('/campd/data/bulk-data-files/filters-content.json').then(resp => setFiltersContent(resp.data));
    }
    if(dataTableRecords && initialTableRecords === null){
      setInitialTableRecords(dataTableRecords);
    }// eslint-disable-next-line
  }, [dataTableRecords]);

  useEffect(() => {
    if (changeFromAppliedFilters || !isMobileOrTablet) {
        setSubType('');
        setGrouping('');
        setState('');
    }// eslint-disable-next-line
  }, [dataType, isMobileOrTablet]);

  useEffect(() => {
    if (changeFromAppliedFilters || !isMobileOrTablet) {
        setState('');
    }// eslint-disable-next-line
  }, [grouping, isMobileOrTablet]);

  useEffect(()=>{
    if(isMobileOrTablet){
      if (previewDataApplied && initialTableRecords){
        const filteredRecords = filterBulkDataFiles(selection, initialTableRecords);
        updateBulkDataFilesDispacher(filteredRecords);
        updateAppliedFilterSelection()
        setPreviewDataApplied(false)
      } else if (backButtonClicked){
        setDataType(appliedFilterSelection.dataType)
        setSubType(appliedFilterSelection.subType)
        setGrouping(appliedFilterSelection.grouping)
        setState(appliedFilterSelection.state)
        setYear(appliedFilterSelection.year)
        setQuarter(appliedFilterSelection.quarter)
        setBackButtonClicked(false)
      }
    } else if(initialTableRecords){
      const filteredRecords = filterBulkDataFiles(selection, initialTableRecords);
      updateBulkDataFilesDispacher(filteredRecords);
      updateAppliedFilterSelection()
      //console.log(filteredRecords);
    }
    // eslint-disable-next-line
  },[dataType, subType, grouping, state, year, quarter, previewDataApplied, isMobileOrTablet, backButtonClicked]);

  const handleClearAll = () =>{
    setDataType('');
    setSubType('');
    setGrouping('');
    setState('');
    setYear('');
    setQuarter('');
    if (isMobileOrTablet) {
      setPreviewDataApplied(true);
    }
    const dataTypeSelector = document.querySelector('#data-type');
    dataTypeSelector.focus();
  };

  useEffect(()=>{
    function onlyUnique(value, index, self) {
      return self.indexOf(value) === index;
    }
    let res = [];
    if(filtersContent){
      if((dataType === "EDR" || (dataType === filtersContent.dataTypes[filtersContent.dataTypes.length-1] && subType !=="Monitoring Plan")) && year !== ''){
      initialTableRecords.forEach(r=>{// eslint-disable-next-line
          if(year == r.metadata?.year){
            res.push(filtersContent.states.find(s=> s.stateCode === r.metadata?.statecode));
          }
        })
      }else{
        res = filtersContent.states;
      }console.log("res",res);
      setStatesFiltered(res.filter(onlyUnique));
    }// eslint-disable-next-line
  },[filtersContent, dataType, year]);

  return (
    <div className="padding-x-4">
      {filtersContent && 
        (
          <>
            <Label
              className="padding-top-2 font-body-lg margin-0 text-bold"
              htmlFor="data-type"
            >
              {filtersContent.labels[0]}
              <Tooltip
                content="Certain filters selections will cause other filters to display."
                field="Data Type" 
              >
                <Help
                  className="text-primary margin-left-1"
                  fontSize="small"
                />
              </Tooltip>
            </Label>
            <Dropdown
              id="data-type"
              onChange={(evt)=>setDataType(evt.target.value)}
              value={dataType}
              data-testid="dataType-select"
            >
              <option  data-testid="dataType-select-option" key="" value="">
                Select (optional)
              </option>
              {filtersContent.dataTypes.sort().map((el) => (
                <option data-testid="dataType-select-option" key={el} value={el}>
                  {el}
                </option>
              ))}
            </Dropdown>
          </>
        )
      }
      {
        filtersContent && (dataType === "Emissions"|| dataType === filtersContent.dataTypes[filtersContent.dataTypes.length -1] ) &&
        (
          <>
            <Label
              className="padding-top-2 font-body-lg margin-0 text-bold"
              htmlFor="sub-type"
            >
              {filtersContent.labels[1]}
            </Label>
            <Dropdown
              id="sub-type"
              onChange={(evt)=>setSubType(evt.target.value)}
              value={subType}
              data-testid="subtype-select"
            >
              <option data-testid="subtype-select-option" key="" value="">
                Select (optional)
              </option>
              {filtersContent.subTypes[dataType].map((el) => (
                <option data-testid="subtype-select-option" key={el} value={el}>
                  {el}
                </option>
              ))}
            </Dropdown>
          </>
        )
      }
      {
        filtersContent && (dataType === "Emissions" || dataType === "Mercury and Air Toxics Emissions (MATS)") &&
        (
          <>
            <Label
              className="padding-top-2 font-body-lg margin-0 text-bold"
              htmlFor="grouping"
            >
              {filtersContent.labels[2]}
            </Label>
            <Dropdown
              id="grouping"
              onChange={(evt)=>setGrouping(evt.target.value)}
              value={grouping}
              data-testid="grouping-select"
            >
              <option data-testid="grouping-select-option" key="" value="">
                Select (optional)
              </option>
              {filtersContent.groupings[dataType].map((el) => (
                <option data-testid="grouping-select-option" key={el} value={el}>
                  {el}
                </option>
              ))}
            </Dropdown>
          </>
        )
      }
      {
        filtersContent && ((dataType === "EDR" || subType === "Emissions" || subType === "QA")) &&
        (
          <>
            <Label
              className="padding-top-2 font-body-lg margin-0 text-bold"
              htmlFor="years"
            >
              {filtersContent.labels[4]}
            </Label>
            <Dropdown
              id="years"
              onChange={(evt)=>setYear(evt.target.value)}
              value={year}
              data-testid="year-select"
            >
              <option data-testid="year-select-option" key="" value="">
                Select (optional)
              </option>
              { dataType ==="EDR" ?
                filtersContent.year[dataType].map((el,i) => (
                  <option data-testid="year-select-option" key={i} value={el}>
                    {el}
                  </option>
                )) 
                :
                filtersContent.year[dataType][subType].map((el,i) => (
                  <option data-testid="year-select-option" key={i} value={el}>
                    {el}
                  </option>
                )) 
              }
            </Dropdown>
          </>
        )
      }
      {
        filtersContent && ((dataType === "EDR" || subType === "Emissions" || subType === "QA")) &&
        (
          <>
            <Label
              className="padding-top-2 font-body-lg margin-0 text-bold"
              htmlFor="quarters"
            >
              {filtersContent.labels[5]}
            </Label>
            <Dropdown
              id="quarters"
              onChange={(evt)=>setQuarter(evt.target.value)}
              value={quarter}
              data-testid="quarter-select"
            >
              <option data-testid="quarter-select-option" key="" value="">
                Select (optional)
              </option>
              { dataType ==="EDR" ?
                filtersContent.quarter[dataType].map((el, i) => (
                  <option data-testid="quarter-select-option" key={i} value={el.substring(0,1)}>
                    {el}
                  </option>
                )) 
                :
                filtersContent.quarter[dataType][subType].map((el,i) => (
                  <option data-testid="quarter-select-option" key={i} value={el.substring(0,1)}>
                    {el}
                  </option>
                )) 
              }
            </Dropdown>
          </>
        )
      }
      { // eslint-disable-next-line
        filtersContent && (dataType === "Emissions" && grouping === "State") || 
        (dataType === "Mercury and Air Toxics Emissions (MATS)" && grouping === "State") ||
        (dataType === "EDR") ||
        (dataType === filtersContent.dataTypes[filtersContent.dataTypes.length -1] && filtersContent.subTypes[dataType].includes(subType)) ?
        (
          <>
            <Label
              className="padding-top-2 font-body-lg margin-0 text-bold"
              htmlFor="states"
            >
              {filtersContent.labels[3]}
            </Label>
            <Dropdown
              id="states"
              onChange={(evt)=>setState(evt.target.value)}
              value={state}
              data-testid="state-select"
            >
              <option data-testid="state-select-option" key="" value="">
                Select (optional)
              </option>
              {statesFiltered.map((el) => (
                <option data-testid="state-select-option" key={el.stateCode} value={el.stateCode}>
                  {el.stateName}
                </option>
              ))}
            </Dropdown>
          </>
        ) : null
      }
      
      <div className='padding-top-3'> 
        <MobileMenu
          setShowMobileFilters={setShowMobileFilters}
          handleClearAll={handleClearAll}
          setPreviewDataApplied={setPreviewDataApplied}
          dataType={dataType}
          setBackButtonClicked={setBackButtonClicked}
          />
        <Button
          className="float-right font-body-md margin-0 display-none desktop:display-block"
          outline="true"
          disabled={dataType === ''}
          onClick={handleClearAll}
        >
          Clear all
        </Button>
      </div>
  </div>
  );
};

export default BulkDataFilesFilters;
