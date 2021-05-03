import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Dropdown } from '@trussworks/react-uswds';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';

import * as constants from '../../../utils/constants/customDataDownload';


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
  const initcap = (str) => {
    return str.replace(/([^\W_]+[^\s-]*) */g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  };

  return (
    <>
      <div className="font-alt-xl text-bold padding-top-6 padding-bottom-3 padding-left-6">
        Data Type
        <FontAwesomeIcon
          icon={faQuestionCircle}
          className="text-primary font-body-md question-icon"
        />
      </div>
      <div className="subtype-container border-bottom-1px border-base-light clearfix padding-y-1 padding-x-6">
        <div>
          <span className="text-bold padding-top-1 font-body-md">
            {selectedDataSubtype !== '' &&
            selectedDataSubtype !== '-1' &&
            dataSubtypeApplied === true ? (
              <>
                <span>{initcap(selectedDataType)},</span>{' '}
                {getSelectedDataSubType(
                  constants.DATA_SUBTYPES_MAP[selectedDataType]
                )}
                <Button
                  outline="true"
                  className="float-right"
                  onClick={handleChangeButtonClick}
                >
                  Change
                </Button>
              </>
            ) : null}
          </span>
        </div>
        {dataTypeApplied === false && (
          <>
            <div className="padding-top-1 font-body-md">
              Data Type (Required)
            </div>
            <div className="padding-y-1">
              <Dropdown
                onChange={handleDataTypeDropdown}
                value={selectedDataType}
              >
                <option key= "" value="">- Select -</option>
                {constants.DATA_TYPES.map((el) => (
                  <option key ={el} value={el}>{initcap(el)}</option>
                ))}
              </Dropdown>
            </div>
          </>
        )}
        {dataSubtypeApplied === false && (
          <>
            <div className="padding-top-1 font-body-md">
              Data Subtype (Required)
            </div>
            <div className="padding-y-1">
              <Dropdown
                onChange={changeDataSubtype}
                value={selectedDataSubtype}
              >
                {constants.DATA_SUBTYPES_MAP[selectedDataType].map((el, i) => (
                  <option key={i} value={el.value}>
                    {el.label}
                  </option>
                ))}
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
              primary="true"
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
