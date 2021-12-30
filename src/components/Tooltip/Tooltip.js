import React, { useEffect, useState } from "react";
import "./Tooltip.scss";

const Tooltip = (props) => {
  let timeout;
  const [show, setShow] = useState(false);
  const [stillMounted, setStillMounted ] = useState(true)
  const showTooltip = () => {
    timeout = setTimeout(() => {
      setShow(true);
    }, 500);
    if (!stillMounted) {
      clearInterval(timeout);
      return
    }
  };

  const hideTooltip = () => {
    clearInterval(timeout);
    setShow(false);
  };

  useEffect(
    () => () => setStillMounted(false), // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

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
