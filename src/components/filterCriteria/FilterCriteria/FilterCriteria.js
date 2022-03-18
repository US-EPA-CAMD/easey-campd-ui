import React, { useEffect, useState } from "react";
import { connect } from "react-redux"
import * as constants from "../../../utils/constants/customDataDownload";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWindowClose } from '@fortawesome/free-solid-svg-icons';
import { Button } from "@trussworks/react-uswds";
import { Help, Tune } from '@material-ui/icons';

import "./FilterCriteria.scss";
import { isAddedToFilters } from "../../../utils/selectors/general";
import { focusTrap } from "../../../utils/ensure-508/focus-trap";
import Tooltip from '../../Tooltip/Tooltip';

import {
  resetDataPreview,
  removeAppliedFilter,
} from '../../../store/actions/customDataDownload/customDataDownload';
import {
  resetFilter,
  updateTimePeriod,
  updateFilterCriteria,
} from '../../../store/actions/customDataDownload/filterCriteria';
import MatsDataCaveat from "../../customDataDownload/MatsDataCaveat/MatsDataCaveat";

const FilterCriteria = ({
    dataSubtypeApplied,
    selectedDataType,
    getSelectedDataSubType,
    handleFilterButtonClick,
    activeFilter,
    appliedFilters,
    filterCriteria,
    resetFiltersDispatcher,
    removeAppliedFiltersDispatcher,
    resetDataPreviewDispatcher,
    isMobileOrTablet,
    hideFilterMenu,
    setRemovedAppliedFilter,
    renderPreviewData
  }) => { 
    const [firstFocusableEl, setFirstFocusableEl] = useState(null);

    useEffect(() => {
      if (isMobileOrTablet && !hideFilterMenu) {
        const filtersTooltip = document.querySelector('#filtersTooltip')?.firstChild
        filtersTooltip && filtersTooltip.focus();
      }
    }, [isMobileOrTablet, hideFilterMenu]);
    useEffect(() => {
      if(isMobileOrTablet && !hideFilterMenu){
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
      if(!isMobileOrTablet || !hideFilterMenu){
        setFirstFocusableEl(null);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isMobileOrTablet && !hideFilterMenu]);
    const removeFilter = (filterType) => {
      resetFiltersDispatcher(filterType);
      removeAppliedFiltersDispatcher(filterType);
      setRemovedAppliedFilter(filterType);
      resetDataPreviewDispatcher();
    };
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
      if (selectedDataType === 'EMISSIONS' || selectedDataType === 'FACILITY' || selectedDataType === 'MERCURY AND AIR TOXICS EMISSIONS' ||
        getSelectedDataSubType(constants.DATA_SUBTYPES_MAP[selectedDataType]) === "Transactions") {
        if (filter.value === 'Time Period' || filter.value === "Transaction Date") {
          return false;
        } else if(getSelectedDataSubType(constants.DATA_SUBTYPES_MAP[selectedDataType]) === "Transactions") {
          if (!isAddedToFilters('Transaction Date', appliedFilters)) return true;
        }else if (!isAddedToFilters('Time Period', appliedFilters)) {
          return true;
        }
      }
      return validateInput(filterCriteria, filter.stateVar);
    };
    const showMenu = isMobileOrTablet ? !hideFilterMenu && dataSubtypeApplied : dataSubtypeApplied;
  return (
    <>
      {showMenu === true && (
        <>
          <div className="panel-header padding-top-3 padding-left-2">
            <h2>Filters</h2>
            <span id='filtersTooltip'>
              <Tooltip
                content="Use the filters below to refine your query. Filter options will update based on previously applied filters. If no selections are made in a filter, all data related to that filter will be returned."
                field="Filters"
              >
                <Help
                  className="text-primary margin-left-1 margin-bottom-1"
                  fontSize="small"
                />
              </Tooltip>
            </span>
          </div>
          {isMobileOrTablet && selectedDataType === 'MERCURY AND AIR TOXICS EMISSIONS' && !renderPreviewData && (
            <div className="margin-2 margin-bottom-0">
              <MatsDataCaveat />
            </div>
          )}
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
                        isAddedToFilters(el.value, appliedFilters) ||
                        activeFilter === el.value
                          ? true
                          : false
                      }
                      className={`display-flex flex-row flex-align-center flex-justify ${
                        isAddedToFilters(el.value, appliedFilters) ||
                        activeFilter === el.value
                          ? 'filter-button applied-filter'
                          : 'filter-button'
                      }`}
                      disabled={checkDisabled(el)}
                      id={`filter${i}`}
                      aria-label={el.label}
                    >
                      {el.label}
                      {isMobileOrTablet &&
                      isAddedToFilters(el.value, appliedFilters) ? (
                        <FontAwesomeIcon
                          icon={faWindowClose}
                          id='mobileClearFilter'
                          tabIndex={0}
                          focusable={true}
                          role="button"
                          aria-hidden={false}
                          aria-label={`remove ${el.value} filters`}
                          className="float-right clearfix"
                          onClick={(evt)=>{
                              evt.stopPropagation();
                              removeFilter(el.value);
                            }
                          }
                          onKeyDown={(evt)=>{
                            if (evt.keyCode === 13){
                              evt.stopPropagation();
                              removeFilter(el.value);
                            } else {
                              return; 
                            }
                          }}
                        />
                      ) : (
                        <Tune fontSize="small" />
                      )}
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
const mapDispatchToProps = (dispatch) => {
  return {
    resetDataPreviewDispatcher: () => dispatch(resetDataPreview()),
    removeAppliedFiltersDispatcher: (removedFilter, removeAll, opHours) =>
      dispatch(removeAppliedFilter(removedFilter, removeAll, opHours)),
    resetFiltersDispatcher: (filterToReset, resetAll) =>
      dispatch(resetFilter(filterToReset, resetAll)),
    updateTimePeriodDispatcher: (timePeriod) =>
      dispatch(updateTimePeriod(timePeriod)),
    updateFilterCriteriaDispatcher: (filterCriteria) =>
      dispatch(updateFilterCriteria(filterCriteria)),
  };
};

export default connect(null, mapDispatchToProps)(FilterCriteria);
