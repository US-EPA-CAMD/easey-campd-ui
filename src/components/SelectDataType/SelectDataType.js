import React from "react";
import SelectDataTypeInCards from "../SelectableCards/SelectableCards";

import "./SelectDataType.scss";

const SelectDataType = () => {
  const dataTypes = ["EMISSIONS", "ALLOWANCE", "COMPLIANCE"];
  return (
    <div className="selectDataTypeContent maxw-tablet">
      <h2 className="text-bold">Custom Data Download</h2>
      <p data-testid="description-paragraph" className="padding-top-2">
        <span className="vl" />
        This tool allows users to create custom queries of emissions, allowance,
        compliance and/or facility information. By making selections, you
        further refine the query, thereby reducing its size.
      </p>
      <SelectDataTypeInCards cardContents={dataTypes} />
    </div>
  );
};

export default SelectDataType;
