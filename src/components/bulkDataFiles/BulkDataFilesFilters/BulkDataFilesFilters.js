import React, { useEffect, useState } from 'react';
import getContent from '../../../utils/api/getContent';
import { filterBulkDataFiles } from "../../../utils/selectors/filterLogic";
import { Button, Dropdown, Label } from '@trussworks/react-uswds';

const BulkDataFilesFilters = ({
  dataTableRecords,
  updateBulkDataFilesDispacher
}) => {
  const [initialTableRecords, setInitialTableRecords] = useState(null);
  const [filtersContent, setFiltersContent] = useState(null);
  const [dataType, setDataType] = useState('');
  const [subType, setSubType] = useState('');
  const [grouping, setGrouping] = useState('');
  const [state, setState] = useState('');
  const selection = {
    dataType: dataType,
    subType: subType,
    grouping: grouping,
    state: state
  };

  useEffect(() => {
    if(filtersContent === null){
      getContent('/campd/data/bulk-data-files/filters-content.json').then(resp => setFiltersContent(resp.data));
    }
    if(dataTableRecords && initialTableRecords === null){
      setInitialTableRecords(dataTableRecords);
    }// eslint-disable-next-line
  }, [dataTableRecords]);

  useEffect(()=>{
    setSubType('');
    setGrouping('');
    setState('')
  },[dataType]);

  useEffect(()=>{
    setState('');
  },[grouping]);

  useEffect(()=>{
    if(initialTableRecords){
      const filteredRecords = filterBulkDataFiles(selection, initialTableRecords);
      updateBulkDataFilesDispacher(filteredRecords);
      //console.log(filteredRecords);
    }
    // eslint-disable-next-line
  },[dataType, subType, grouping, state]);

  const handleClearAll = () =>{
    setDataType('');
    setSubType('');
    setGrouping('');
    setState('');
  };

  return (
    <div className="padding-x-4">
      {filtersContent && 
        (
          <>
            <Label
              className="padding-top-2 font-body-lg margin-0 text-bold"
              htmlFor="data-type"
            >
              Data Type
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
        filtersContent && dataType === "Emissions" &&
        (
          <>
            <Label
              className="padding-top-2 font-body-lg margin-0 text-bold"
              htmlFor="sub-type"
            >
              Subtype
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
              Grouping
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
        filtersContent && ((dataType === "Emissions" && grouping === "State") || (dataType === "Mercury and Air Toxics Emissions (MATS)" && grouping === "State")) &&
        (
          <>
            <Label
              className="padding-top-2 font-body-lg margin-0 text-bold"
              htmlFor="states"
            >
              State
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
              {filtersContent.states.map((el) => (
                <option data-testid="state-select-option" key={el.stateCode} value={el.stateCode}>
                  {el.stateName}
                </option>
              ))}
            </Dropdown>
          </>
        )
      }
      <div className='padding-top-3'> 
        <Button
          className="float-right font-body-md margin-0"
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