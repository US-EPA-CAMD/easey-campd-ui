import React from "react";
import "./ToolTip.scss";

const ToolTip = (props) => {
  const [show, setShow] = React.useState(false);

  return (
    <div
      className=" display-inline-block position-relative"
      role="tooltip"
      aria-live="assertive"
      tabIndex="0"
      aria-label={props.content}
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
      onFocus={() => setShow(true)}
      onBlur={() => setShow(false)}
    >
      {props.children}
      {show && (
        <div className="Tooltip" aria-hidden="true">
          {props.content}{" "}
        </div>
      )}
    </div>
  );
};

export default ToolTip;
