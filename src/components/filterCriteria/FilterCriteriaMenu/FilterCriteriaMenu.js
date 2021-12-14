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
    appliedFilters,
    filterCriteria
  }) => {
    const checkSelectableData = (list, item) => {
      if (!item || !list) {
        return false;
      }
      let enabled = 0,
        listItem = list[item];
      if (item === 'timePeriod' || !listItem) {
        return false;
      }
      if (item === 'comboBoxYear') {
        listItem = list.timePeriod.comboBoxYear;
      }
      listItem.forEach((el) => {
        if (el.items) {
          el.items.forEach((filterItem) => {
            if (filterItem.enabled) {
              enabled++;
            }
          });
        }
        if (el.enabled) {
          enabled++;
        }
      });
      return enabled === 0;
    };

    const checkDisabled = (filter) => {
      let noTimePeriodSelected = false;
      if (selectedDataType === 'EMISSIONS') {
        if (
          filter.value === 'Time Period' ||
          isAddedToFilters('Time Period', appliedFilters)
        ) {
          noTimePeriodSelected = false;
        } else {
          noTimePeriodSelected = true;
        }
      }
      if (noTimePeriodSelected) {
        return true;
      } else return checkSelectableData(filterCriteria, filter.stateVar);
    };
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
                      disabled={checkDisabled(el)}
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
