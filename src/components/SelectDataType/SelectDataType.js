import React, { useEffect } from "react";
import SelectDataTypeInCards from "../SelectableCards/SelectableCards";
import {DATA_TYPES} from '../../utils/constants/customDataDownload';
import "./SelectDataType.scss";

const SelectDataType = () => {
  useEffect(() => {
    document.title = "CAMPD - Custom Data Download";
  }, []);

  return (
    <div className="grid-row">
      <div className="padding-4 desktop:grid-offset-2 desktop:padding-x-0 desktop:padding-y-4 desktop:width-tablet desktop-lg:grid-offset-3 sdt-wrapper">
        <h2 className="text-bold font-serif-xl tablet:font-serif-2xl margin-0">Custom Data Download</h2>
        <div className="display-flex flex-row flex-align-center">
          <div className="desktop:width-05 tablet:width-1 height-10 bg-accent-cool display-none tablet:display-flex" />
          <p
            data-testid="description-paragraph"
            className="line-height-alt-4 tablet:margin-left-105 desktop:width-mobile-lg">
            This tool allows users to create custom queries of emissions, allowance,
            compliance and/or facility information. By making selections, you
            further refine the query, thereby reducing its size.
          </p>
        </div>
        <div className="width-card height-05 bg-accent-cool margin-x-auto tablet:display-none" />
        <SelectDataTypeInCards cardContents={DATA_TYPES} />
      </div>
    </div>
  );
};

export default SelectDataType;
