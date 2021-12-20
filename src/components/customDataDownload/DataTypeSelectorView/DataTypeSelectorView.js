import React from 'react';
import { Button, Dropdown, Label } from '@trussworks/react-uswds';
import { Help } from '@material-ui/icons';

import * as constants from '../../../utils/constants/customDataDownload';
import { initcap } from '../../../utils/selectors/general';
import Tooltip from '../../Tooltip/Tooltip';

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
}) => {
  return (
    <>
      <div className="panel-header padding-top-3 padding-bottom-3 padding-left-2">
        <h2>Data Type</h2>
        <Tooltip
          content="Data type and subtype can be changed at any time."
          field="Data Type"
        >
          <Help className=" text-primary margin-left-1" />
        </Tooltip>
      </div>
      <div className="border-bottom-1px border-base-light clearfix padding-y-1 padding-x-2">
        <div className="grid-row display-flex flex-align-center">
          {selectedDataSubtype !== '' &&
            selectedDataSubtype !== '-1' &&
            dataSubtypeApplied === true && (
              <>
                <span className="text-bold font-sans-xs desktop:grid-col-12 desktop:padding-bottom-1 desktop-lg:grid-col-8">
                  {initcap(selectedDataType)},{' '}
                  {getSelectedDataSubType(
                    constants.DATA_SUBTYPES_MAP[selectedDataType]
                  )}
                </span>
                <Button
                  outline="true"
                  className="margin-right-0 desktop:grid-col-4"
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
                    {initcap(el)}
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
                disabled={selectedDataType ? false : true}
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
        <div className="border-top-1px border-base-light padding-x-6 padding-y-3 minh-mobile-lg">
          <Button
            primary="true"
            className="float-right clearfix"
            disabled={!selectionChange}
            onClick={() => handleApplyButtonClick()}
          >
            Apply
          </Button>
          {displayCancel === true && (
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
  );
};

export default DataTypeSelectorView;
