import React from "react";
import { useHistory } from "react-router-dom";
import TimePeriod from "../emissionsFilter/ByTimePeriod/TimePeriod";

const ManageDataDownload = (props) => {
  const history = useHistory();
  if (props.location.state === undefined) {
    history.push("/");
    return null;
  }
  return (
    <div className="react-transition fade-in">
      <TimePeriod/>
    </div>
  );
};

export default ManageDataDownload;
