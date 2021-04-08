// *** GLOBAL FUNCTIONAL IMPORTS
import React, { useState } from "react";

// *** GLOBAL LAYOUT IMPORTS
import { Button, ComboBox } from "@trussworks/react-uswds";

// ***  ICONS / DATA
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faQuestionCircle,
  faSlidersH,
} from "@fortawesome/free-solid-svg-icons";

// *** STYLES (individual component)
import "./ManageDataDownload.scss";

const ManageDataDownload = (props) => {
  // *** HOOKS
  const [dataSubtypeApplied, setDataSubtypeApplied] = useState(false);
  const [selectedDataSubtype, setSelectedDataSubtype] = useState("");

  const [displayFilters, setDisplayFilters] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("");

  const dataTypeOptions = [
    { value: 1, label: "Hourly Emissions" },
    { value: 2, label: "Daily Emissions" },
    { value: 3, label: "Monthly Emissions" },
    { value: 4, label: "Quarterly Emissions" },
    { value: 5, label: "Ozone Season Emissions" },
    { value: 6, label: "Facility/Unit Attributes" },
  ];

  const changeDataSubtype = (event) => {
    if (event) {
      setSelectedDataSubtype(event);
    }
    return true;
  };

  const handleChangeButtonClick = () => {
    setDataSubtypeApplied(false);
    setDisplayFilters(false);
  };

  const handleFilterButtonClick = (filterType) => {
    // *** if the same button as is currently selected is pressed again
    if (displayFilters === true && selectedFilter === filterType) {
      setSelectedFilter("");
      setDisplayFilters(false);
    } else {
      setSelectedFilter(filterType);
      setDisplayFilters(true);
    }
  };

  return (
    <div className="manage-download-wrapper">
      <div
        className="side-panel bg-base-lighter margin-0"
        data-testid="ManageDataDownload"
      >
        <div className="font-alt-2xl text-bold padding-top-6 padding-bottom-3 padding-left-6">
          Data Type
          <FontAwesomeIcon
            icon={faQuestionCircle}
            className="text-gray-30 font-body-md question-icon"
          />
        </div>
        <div className="subtype-container border-top-1px border-base-light clearfix padding-y-3 padding-x-6">
          <span className="text-bold padding-top-1 font-body-md">
            {props !== undefined &&
            props.location !== undefined &&
            props.location.state !== undefined
              ? props.location.state.selectedDataType
              : null}
          </span>
          <span className="text-bold padding-top-1 font-alt-md">
            {selectedDataSubtype !== "" &&
            selectedDataSubtype !== "-1" &&
            dataSubtypeApplied === true ? (
              <>
                <span>,</span>{" "}
                {
                  dataTypeOptions.find((list) => {
                    return list.value === parseFloat(selectedDataSubtype);
                  }).label
                }
              </>
            ) : null}
          </span>

          <Button
            outline="true"
            className="float-right clearfix"
            onClick={handleChangeButtonClick}
          >
            Change
          </Button>

          {dataSubtypeApplied === false ? (
            <>
              <div className="padding-top-5 font-body-lg">
                Data Subtype (Required)
              </div>
              <div className="padding-y-1">
                <ComboBox
                  options={dataTypeOptions}
                  onChange={changeDataSubtype}
                />
              </div>
            </>
          ) : null}
        </div>

        {dataSubtypeApplied === false ? (
          <div className="border-top-1px border-base-light padding-x-6 padding-y-3">
            <Button
              primary="true"
              className="float-right clearfix"
              onClick={() => setDataSubtypeApplied(true)}
            >
              Apply
            </Button>
          </div>
        ) : null}

        {dataSubtypeApplied === true ? (
          <>
            <div className="font-alt-2xl text-bold padding-top-6 padding-bottom-3 padding-left-6">
              Filters
              <FontAwesomeIcon
                icon={faQuestionCircle}
                className="text-gray-30 font-body-md question-icon"
              />
            </div>
            <div className="border-top-1px border-base-light clearfix padding-y-3 padding-x-6">
              <p className="padding-y-1">
                <Button
                  outline="true"
                  onClick={() => handleFilterButtonClick(`time period`)}
                  className="filter-button"
                >
                  TIME PERIOD (Required)
                  <FontAwesomeIcon
                    icon={faSlidersH}
                    className="float-right clearfix"
                  />
                </Button>
              </p>
              <p className="padding-y-1">
                <Button
                  outline="true"
                  onClick={() => handleFilterButtonClick(`program`)}
                  className="filter-button"
                >
                  PROGRAM (Required)
                  <FontAwesomeIcon
                    icon={faSlidersH}
                    className="float-right clearfix"
                  />
                </Button>
              </p>
              <p className="padding-y-1">
                <Button
                  outline="true"
                  onClick={() => handleFilterButtonClick(`state territory`)}
                  className="filter-button"
                >
                  STATE TERRITORY (Required)
                  <FontAwesomeIcon
                    icon={faSlidersH}
                    className="float-right clearfix"
                  />
                </Button>
              </p>
              <p className="padding-y-1">
                <Button
                  onClick={() => handleFilterButtonClick(`facility`)}
                  outline="true"
                  className="filter-button"
                >
                  FACILITY (Required)
                  <FontAwesomeIcon
                    icon={faSlidersH}
                    className="float-right clearfix"
                  />
                </Button>
              </p>
              <p className="padding-y-1">
                <Button
                  onClick={() => handleFilterButtonClick(`unit type`)}
                  outline="true"
                  className="filter-button"
                >
                  UNIT TYPE (Required)
                  <FontAwesomeIcon
                    icon={faSlidersH}
                    className="float-right clearfix"
                  />
                </Button>
              </p>
              <p className="padding-y-1">
                <Button
                  onClick={() => handleFilterButtonClick(`unit fuel type`)}
                  outline="true"
                  className="filter-button"
                >
                  UNIT FUEL TYPE (Required)
                  <FontAwesomeIcon
                    icon={faSlidersH}
                    className="float-right clearfix"
                  />
                </Button>
              </p>
              <p className="padding-y-1">
                <Button
                  onClick={() => handleFilterButtonClick(`control technology`)}
                  outline="true"
                  className="filter-button"
                >
                  CONTROL TECHNOLOGY (Required)
                  <FontAwesomeIcon
                    icon={faSlidersH}
                    T
                    className="float-right clearfix"
                  />
                </Button>
              </p>
            </div>
          </>
        ) : null}
      </div>

      {displayFilters === true ? (
        <div className="side-panel bg-base-lightest margin-0">
          <div className="font-alt-2xl text-bold padding-top-6 padding-bottom-3 padding-left-6"></div>
        </div>
      ) : null}
    </div>
  );
};

export default ManageDataDownload;
