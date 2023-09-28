import React, { useEffect, useRef, useState } from "react";
import "./Tooltip.scss";

const Tooltip = (props) => {
  const timeoutRef = useRef(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    return () => {
      clearTimeout(timeoutRef.current);
    };
  }, []);

  const showTooltip = () => {
    timeoutRef.current = setTimeout(() => {
      setShow(true);
    }, 500);
  };

  const hideTooltip = () => {
    clearTimeout(timeoutRef.current);
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
