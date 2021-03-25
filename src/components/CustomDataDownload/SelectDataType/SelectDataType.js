import React from "react";
import"./SelectDataType.css";
import {SelectDataTypeInCards} from "../SelectDataType/SelectableCards/SelectableCards";

const SelectDataType = () => {
  const dataTypes = ["EMISSIONS", "ALLOWANCE", "COMPLIANCE"];
  return (
    <div className="selectDataTypeContent">
      <h2>Custom Data Download</h2>
      <p data-testid="description-paragraph">
        <span className="vl"/>
        This tool allows users to create custom queries of emmisions,
        allowance, compliance and/orfacility information. By making
        selections, you further refine the query, thereby reducing its size.
      </p>
      <SelectDataTypeInCards cardContents={dataTypes}/>
    </div>
  );
};

export default SelectDataType;
