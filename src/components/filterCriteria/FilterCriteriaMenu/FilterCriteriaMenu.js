import * as React from "react";
import * as constants from "../../../utils/constants/customDataDownload";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@trussworks/react-uswds";
import { faSlidersH } from "@fortawesome/free-solid-svg-icons";
import { Help } from '@material-ui/icons';

import "./FilterCriteriaMenu.scss";
import { isAddedToFilters } from "../../../utils/selectors/general";
import Tooltip from '../../Tooltip/Tooltip';

const FilterCriteriaMenu = ({
    dataSubtypeApplied,
    selectedDataType,
    getSelectedDataSubType,
    handleFilterButtonClick,
    activeFilter,
    appliedFilters,
    filterCriteria
  }) => {
    const checkSelectableData = (listItem) => {
      let enabled = 0;
      for (const el of listItem) {
        if (enabled) {
          break;
        }
        if (el.items) {
          for (const filterItem of el.items) {
            if (filterItem.enabled) {
              enabled++;
              break;
            }
          }
        }
        if (el.enabled) {
          enabled++;
          break;
        }
      }
      return enabled === 0;
    };
    const validateInput = (list, item) => {
      if (!item || !list) {
        return false;
      }
      let listItem = list[item];

      if (item === 'comboBoxYear') {
        listItem = list.timePeriod.comboBoxYear;
      }
      if (!listItem) {
        return false;
      }
      return checkSelectableData(listItem);
    };

    const checkDisabled = (filter) => {
      if (selectedDataType === 'EMISSIONS' || getSelectedDataSubType(constants.DATA_SUBTYPES_MAP[selectedDataType]) === "Transactions") {
        if (filter.value === 'Time Period' || filter.value === "Transaction Date") {
          return false;
        } else if(getSelectedDataSubType(constants.DATA_SUBTYPES_MAP[selectedDataType]) === "Transactions") {
          return !isAddedToFilters('Transaction Date', appliedFilters);
        }else if (!isAddedToFilters('Time Period', appliedFilters)) {
          return true;
        }
      }
      return validateInput(filterCriteria, filter.stateVar);
    };

  return (
    <>
      {dataSubtypeApplied === true && (
        <>
          <div className="panel-header padding-top-3 padding-left-2">
            <h2>Filters</h2>
            <Tooltip
              content="Use the filters below to refine your query. Filter options will update based on previously applied filters. If no selections are made in a filter, all data related to that filter will be returned."
              field="Filters"
            >
              <Help
                className="text-primary margin-left-1 margin-bottom-1"
                fontSize="small"
              />
            </Tooltip>
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
                      onClick={(evt) =>
                        handleFilterButtonClick(el.value, evt.target)
                      }
                      aria-selected={
                        isAddedToFilters(el.value, appliedFilters) ||
                        activeFilter === el.value
                          ? true
                          : false
                      }
                      className={
                        isAddedToFilters(el.value, appliedFilters) ||
                        activeFilter === el.value
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
