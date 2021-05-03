import React from "react";
import * as constants from "../../../utils/constants/customDataDownload";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@trussworks/react-uswds";
import {
  faQuestionCircle,
  faSlidersH,
} from "@fortawesome/free-solid-svg-icons";

import "./FilterCriteriaRender.scss";

const FiltersView = ({
  dataSubtypeApplied,
  selectedDataType,
  getSelectedDataSubType,
  handleFilterButtonClick,
  appliedFilters,
}) => {
  return (
    <>
      {dataSubtypeApplied === true && (
        <>
          <div className="font-alt-xl text-bold padding-top-3 padding-bottom-3 padding-left-6">
            Filters
            <FontAwesomeIcon
              icon={faQuestionCircle}
              className="text-primary font-body-md question-icon"
            />
          </div>
          <div className="clearfix padding-y-3 padding-x-6">
            <div className="filter-container">
              {constants.FILTERS_MAP[selectedDataType][
                getSelectedDataSubType(
                  constants.DATA_SUBTYPES_MAP[selectedDataType]
                )
              ].map((el, i) => {
                return (
                  <p key={i} className="padding-y-0">
                    <Button
                      outline="true"
                      onClick={() => handleFilterButtonClick(el.value)}
                      className={
                        appliedFilters.includes(el.value)
                          ? "filter-button applied-filter"
                          : "filter-button bg-base-lightest"
                      }
                    >
                      {el.label}
                      <FontAwesomeIcon
                        icon={faSlidersH}
                        className="float-right clearfix"
                      />
                    </Button>
                  </p>
                );
              })}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default FiltersView;
