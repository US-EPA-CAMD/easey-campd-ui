import React from 'react';
import { Button, Tooltip } from '@trussworks/react-uswds';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWindowClose } from '@fortawesome/free-solid-svg-icons';

const PillButton = (props) => {
  return (
    <div className="display-flex">
      {props.tooltip && props.tooltip.length > 0 ? (
        <Tooltip
          className="padding-y-2 padding-left-1 padding-right-0 margin-0 radius-0 radius-left-lg"
          label={props.tooltip}
          position={props.position}
          onClick={() => props.onClick(props.index, props.label)}
        >
          {props.label}
        </Tooltip>
      ) : (
        <Button
          type="button"
          className="padding-1 padding-right-0 margin-0 radius-0 radius-left-lg"
          onClick={() => props.onClick(props.index, props.label)}
        >
          {props.label}
        </Button>
      )}
      <Button
        type="button"
        className="padding-1 radius-0 radius-right-lg"
        onClick={() => props.onRemove(props.index, props.label)}
      >
        <FontAwesomeIcon icon={faWindowClose} />
      </Button>
    </div>
  );
};

export default PillButton;
