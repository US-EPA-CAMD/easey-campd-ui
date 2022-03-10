import React, { useEffect, useState } from 'react';

import { Button, Dropdown, Label } from '@trussworks/react-uswds';
import { Help } from '@material-ui/icons';

import * as constants from '../../../utils/constants/customDataDownload';
import { initcap } from '../../../utils/selectors/general';
import { focusTrap } from "../../../utils/ensure-508/focus-trap";
import Tooltip from '../../Tooltip/Tooltip';
import MatsDataCaveat from '../MatsDataCaveat/MatsDataCaveat';


const DataTypeSelectorView = ({
  selectedDataType,
  getSelectedDataSubType,
  selectedDataSubtype,
  dataTypeApplied,
  dataSubtypeApplied,
  handleDataTypeDropdown,
  handleChangeButtonClick,
  changeDataSubtype,
  handleApplyButtonClick,
  handleCancelButtonClick,
  selectionChange,
  displayCancel,
  displayCancelMobile,
  hideDataTypeSelector,
  displayMobileDataType,
  renderPreviewData
}) => {

  const [firstFocusableEl, setFirstFocusableEl] = useState(null);
  useEffect(() => {
    if ( displayMobileDataType) {
      const tooltip = document.querySelector('#dataTypeTooltip')?.firstChild;
      tooltip && tooltip.focus()
    }
  }, [displayMobileDataType ])

  useEffect(() => {
    if(displayMobileDataType){
      const { firstComponentFocusableElement, handleKeyPress } = focusTrap(".side-nav");
      // set focus to first element only once
      if(firstFocusableEl === null && firstComponentFocusableElement){
        setFirstFocusableEl(firstComponentFocusableElement);
        firstComponentFocusableElement.focus();
      }
      // *** FOCUS TRAP
      document.addEventListener("keydown", handleKeyPress);
      // * clean up
      return () => {
        document.removeEventListener("keydown", handleKeyPress);
      };
    }
    if(!displayMobileDataType){
      setFirstFocusableEl(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [displayMobileDataType]);
  const showCancelButton = displayCancel || displayCancelMobile;

  return (
    <>{!hideDataTypeSelector &&
      <>
      <div className="panel-header padding-top-3 padding-bottom-3 padding-left-2">
        <h2>Data Type</h2>
        <span id='dataTypeTooltip'>
          <Tooltip
            content="Data type and subtype can be changed at any time."
            field="Data Type" 
          >
            <Help
              className="text-primary margin-left-1 margin-bottom-1"
              fontSize="small"
            />
          </Tooltip>
        </span>
      </div>
      {selectedDataType === 'MERCURY AND AIR TOXICS EMISSIONS' && !renderPreviewData && (
        <div className="margin-2 margin-top-0 maxw-mobile-lg">
          <MatsDataCaveat
          styling={'alert-wrapper usa-alert--slim font-sans-3xs desktop:line-height-sans-2'}
          />
        </div>
      )}
      <div className="border-y-1px border-base-light clearfix padding-y-2 padding-x-2 desktop:padding-y-1 desktop:border-top-0">
        <div className="display-flex desktop:grid-row flex-align-center">
          {selectedDataSubtype !== '' &&
            selectedDataSubtype !== '-1' &&
            dataSubtypeApplied === true && (
              <>
                <span className="text-bold font-sans-xs grid-col-12 desktop:padding-bottom-1 desktop-lg:grid-col-8">
                  {initcap(selectedDataType)},{' '}
                  {getSelectedDataSubType(
                    constants.DATA_SUBTYPES_MAP[selectedDataType]
                  )}
                </span>
                <Button
                  outline="true"
                  className="margin-right-0 grid-col-4"
                  onClick={handleChangeButtonClick}
                >
                  Change
                </Button>
              </>
            )}
        </div>
        {dataTypeApplied === false && (
          <>
            <Label
              className="padding-top-1 font-body-md margin-0"
              htmlFor="data-type"
            >
              Data Type (Required)
            </Label>
            <div className="padding-y-1">
              <Dropdown
                id="data-type"
                onChange={handleDataTypeDropdown}
                value={selectedDataType}
              >
                <option key="" value="">
                  - Select -
                </option>
                {constants.DATA_TYPES.map((el) => (
                  <option key={el} value={el}>
                    {el === 'MERCURY AND AIR TOXICS EMISSIONS'?  'Mercury and Air Toxics Emissions (MATS)' : initcap(el)}
                  </option>
                ))}
              </Dropdown>
            </div>
          </>
        )}
        {dataSubtypeApplied === false && (
          <>
            <Label
              className="padding-top-1 font-body-md margin-0"
              htmlFor="data-sub-type"
            >
              Data Subtype (Required)
            </Label>
            <div className="padding-y-1">
              <Dropdown
                id="data-sub-type"
                className={!selectedDataType ? 'bg-transparent' : ''}
                onChange={changeDataSubtype}
                value={selectedDataSubtype}
                disabled={selectedDataType ? constants.DATA_SUBTYPES_MAP[selectedDataType].length > 1? false : true : true}
              >
                {selectedDataType ? (
                  constants.DATA_SUBTYPES_MAP[selectedDataType].map((el, i) => (
                    <option key={i} value={el.value}>
                      {el.label}
                    </option>
                  ))
                ) : (
                  <option key="" value="">
                    - Select -
                  </option>
                )}
              </Dropdown>
            </div>
          </>
        )}
      </div>
      {dataSubtypeApplied === false && (
        <div className="border-top-1px border-base-light padding-x-2 desktop:padding-x-6 padding-y-3 height-mobile-lg">
          <Button
            primary="true"
            className="float-right clearfix"
            disabled={!selectionChange}
            onClick={() => handleApplyButtonClick()}
          >
            Apply
          </Button>
          {showCancelButton === true && (
            <Button
              outline="true"
              className="float-left clearfix"
              onClick={() => handleCancelButtonClick()}
            >
              Cancel
            </Button>
          )}
        </div>
      )}
      </>
      }
    </>
  );
};

export default DataTypeSelectorView;
