import React from "react";
import { Button, Radio, Label } from "@trussworks/react-uswds";

const DownloadFileType = (props) => {
  return (
    <div
      className="height-10 border-2px radius-lg bg-primary-lighter"
      style={{ borderColor: "#005EA2" }}
    >
      <div className="display-flex flex-row flex-justify flex-align-self-center font-sans-sm">
        <Radio id="csv" name="input-radio" color="bg-primary" defaultChecked />
        <Label htmlFor="csv" className="text-bold position-relative top-neg-1">
          CSV
        </Label>
        <Radio id="json" name="input-radio" />
        <Label htmlFor="json" className="text-bold position-relative top-neg-1">
          JSON
        </Label>
        <Button type="button" className="margin-x-3" onClick={props.onClick}>
          Download
        </Button>
      </div>
    </div>
  );
};

export default DownloadFileType;
