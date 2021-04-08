import React from "react";
import TimePeriod from "../emissionsFilter/ByTimePeriod/TimePeriod";

const FlyOutPanel = ({show, selectedFilter, closeFlyOutHandler}) =>{

  const contentRenderer = () =>{
    switch (selectedFilter) {
      case 'time period':
        return <TimePeriod closeFlyOutHandler ={closeFlyOutHandler}/>
      case 'program':
        return;
      default:
        return;
    }
  };

  return (
    <>
      {show === true ? (
        <div className="side-panel bg-base-lightest margin-0">
          <div className="padding-top-6 padding-bottom-3 padding-left-6">
            {contentRenderer()}
          </div>
        </div>
      ) : null}
    </>
  )
};

export default FlyOutPanel;
