import React from "react";
import * as constants from "../../../utils/constants/customDataDownload";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Dropdown } from "@trussworks/react-uswds";
import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons";

const DataTypeSelectorView = ({
  selectedDataType,
  getSelectedDataSubType,
  selectedDataSubtype,
  dataSubtypeApplied,
  handleChangeButtonClick,
  changeDataSubtype,
  handleApplyButtonClick,
}) => {
  const initcap = (str) => {
    return str.replace(/([^\W_]+[^\s-]*) */g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  };

  return (
    <>
      <div className="font-alt-xl text-bold padding-top-6 padding-bottom-3 padding-left-6 side-panel-header">
        Data Type
        <FontAwesomeIcon
          icon={faQuestionCircle}
          className="text-gray-30 font-body-md question-icon"
        />
      </div>
      <div className="subtype-container border-top-1px border-base-light clearfix padding-y-3 padding-x-6">
        <div>
          <span className="text-bold padding-top-1 font-body-md">
            {initcap(selectedDataType)}
          </span>
          <span className="text-bold padding-top-1 font-alt-md">
            {selectedDataSubtype !== "" &&
            selectedDataSubtype !== "-1" &&
            dataSubtypeApplied === true ? (
              <>
                <span>,</span>{" "}
                {getSelectedDataSubType(
                  constants.DATA_SUBTYPES_MAP[selectedDataType]
                )}
              </>
            ) : null}
          </span>
        </div>
        <Button
          outline="true"
          className="float-right clearfix"
          onClick={handleChangeButtonClick}
        >
          Change
        </Button>

        {dataSubtypeApplied === false && (
          <>
            <div className="padding-top-5 font-body-md">
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
            onClick={() => handleApplyButtonClick()}
          >
            Apply
          </Button>
        </div>
      )}
    </>
  );
};

export default DataTypeSelectorView;
