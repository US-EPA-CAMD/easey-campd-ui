import React from "react";
import SelectDataTypeInCards from "../SelectableCards/SelectableCards";
import {DATA_TYPES} from '../../utils/constants/customDataDownload'

import "./SelectDataType.scss";

const SelectDataType = () => {
  return (
    <div className="selectDataTypeContent maxw-tablet">
      <h2 className="text-bold font-alt-xl margin-top-0 margin-bottom-1">Custom Data Download</h2>
      <p data-testid="description-paragraph" className="padding-top-2 padding-bottom-2 margin-top-0 line-height-alt-4">
        <span className="vl" />
        This tool allows users to create custom queries of emissions, allowance,
        compliance and/or facility information. By making selections, you
        further refine the query, thereby reducing its size.
      </p>
      <SelectDataTypeInCards cardContents={DATA_TYPES} />
    </div>
  );
};

export default SelectDataType;
