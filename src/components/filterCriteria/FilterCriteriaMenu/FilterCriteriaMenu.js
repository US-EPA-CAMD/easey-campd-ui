import * as React from "react";
import * as constants from "../../../utils/constants/customDataDownload";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@trussworks/react-uswds";
import {
  faQuestionCircle,
  faSlidersH,
} from "@fortawesome/free-solid-svg-icons";

import "./FilterCriteriaMenu.scss";
import { isAddedToFilters } from "../../../utils/selectors/general";

const FilterCriteriaMenu = ({
    dataSubtypeApplied,
    selectedDataType,
    getSelectedDataSubType,
    handleFilterButtonClick,
    activeFilter,
    appliedFilters
  }) => {
  return (
    <>
      {dataSubtypeApplied === true && (
        <>
          <div className="panel-header padding-top-3 padding-left-2">
            <h2>Filters</h2>
            <FontAwesomeIcon
              icon={faQuestionCircle}
              className="text-primary font-body-md question-icon"
              title="Use the filters below to refine your query. The filter criteria will not update based on other criteria selections. If no selections are made in a filter, all data related to that filter will be returned."
            />
          </div>
          <div className="clearfix padding-y-1 padding-x-2">
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
                      onClick={(evt) => handleFilterButtonClick(el.value, evt.target)}
                      aria-selected={
                        isAddedToFilters(el.value, appliedFilters) || activeFilter===el.value
                          ? true : false
                      }
                      className={
                        isAddedToFilters(el.value, appliedFilters) || activeFilter===el.value
                          ? "filter-button applied-filter"
                          : "filter-button"
                      }
                      disabled={selectedDataType === "EMISSIONS" ? el.value === "Time Period"? false : !isAddedToFilters("Time Period", appliedFilters) : false}
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

export default FilterCriteriaMenu;
