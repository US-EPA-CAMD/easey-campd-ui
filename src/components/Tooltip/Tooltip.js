import React from "react";
import "./Tooltip.scss";

const Tooltip = (props) => {
  let timeout;
  const [show, setShow] = React.useState(false);

  const showTooltip = () => {
    timeout = setTimeout(() => {
      setShow(true);
    }, 500);
  };

  const hideTooltip = () => {
    clearInterval(timeout);
    setShow(false);
  };

  return (
    <div
      className=" display-inline-block position-relative"
      role="img"
      tabIndex="0"
      aria-label={
        props.field
          ? `Tooltip for ${props.field}: ${props.content}`
          : `Tooltip: ${props.content}`
      }
      onMouseEnter={showTooltip}
      onMouseLeave={hideTooltip}
      onFocus={showTooltip}
      onBlur={hideTooltip}
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

export default Tooltip;
