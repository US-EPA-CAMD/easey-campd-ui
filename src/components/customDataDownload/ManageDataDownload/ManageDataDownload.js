// *** GLOBAL FUNCTIONAL IMPORTS
import React, { useState } from "react";
import { connect } from "react-redux";
import {updateSelectedDataSubType} from "../../../store/actions/customDataDownload/customDataDownload";
import DataTypeSelectorRender from "../DataTypeSelectorRender/DataTypeSelectorRender";
import FilterCriteriaRender from "../FilterCriteriaRender/FilterCriteriaRender";
import FlyOutPanel from "../FlyOutPanel/FlyOutPanel";
import ManageDataPreview from "../ManageDataPreview/ManageDataPreview";
import * as constants from "../../../utils/constants/customDataDownload";

// *** STYLES (individual component)
import "./ManageDataDownload.scss";


const ManageDataDownload = ({selectedDataType, updateSelectedDataSubTypeDispatcher, appliedFilters}) => {
  // *** HOOKS
  const [dataSubtypeApplied, setDataSubtypeApplied] = useState(false);
  const [selectedDataSubtype, setSelectedDataSubtype] = useState("");

  const [displayFilters, setDisplayFilters] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("");

  // *** EVENT HANDLERS
  const changeDataSubtype = (event) => {
    if (event) {
      setSelectedDataSubtype(event.target.value);
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

  const handleApplyButtonClick = () =>{
    if(selectedDataSubtype!==""){
      setDataSubtypeApplied(true)
      updateSelectedDataSubTypeDispatcher(getSelectedDataSubType(constants.DATA_SUBTYPES_MAP[selectedDataType]));
    }
  };

  const closeFlyOutHandler = () => {
    setSelectedFilter("");
    setDisplayFilters(false);
  };

  // *** UTILITY FUNCTION
  const getSelectedDataSubType = (options) =>{
    const entry = options.find((list) => list.value === parseFloat(selectedDataSubtype));
    return entry? entry.label:"";
  };

  return (
    <div className="manage-download-wrapper">
      <div
        className="side-panel bg-base-lighter margin-0"
        data-testid="ManageDataDownload">
        <DataTypeSelectorRender
          selectedDataType={selectedDataType}
          getSelectedDataSubType={getSelectedDataSubType}
          selectedDataSubtype={selectedDataSubtype}
          dataSubtypeApplied={dataSubtypeApplied}
          handleChangeButtonClick={handleChangeButtonClick}
          changeDataSubtype={changeDataSubtype}
          handleApplyButtonClick={handleApplyButtonClick}/>
        <FilterCriteriaRender
          dataSubtypeApplied={dataSubtypeApplied}
          selectedDataType={selectedDataType}
          getSelectedDataSubType={getSelectedDataSubType}
          handleFilterButtonClick={handleFilterButtonClick}
          appliedFilters={appliedFilters}/>
      </div>
      <FlyOutPanel
        show={displayFilters}
        selectedDataSubtype={getSelectedDataSubType(constants.DATA_SUBTYPES_MAP[selectedDataType])}
        selectedFilter={selectedFilter}
        closeFlyOutHandler={closeFlyOutHandler}
      />
      <ManageDataPreview/>
    </div>
  );
};


const mapStateToProps = (state) => {
  return {
    selectedDataType: state.customDataDownload.dataType,
    appliedFilters: state.customDataDownload.appliedFilters
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateSelectedDataSubTypeDispatcher: (dataSubType) => dispatch(updateSelectedDataSubType(dataSubType)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDataDownload);
