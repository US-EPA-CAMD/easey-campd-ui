import React from 'react';
import { Button } from '@trussworks/react-uswds';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWindowClose } from '@fortawesome/free-solid-svg-icons';

const PillButton = (props) => {
  return (
    <div className="display-flex">
      <Button
        className="padding-y-2 padding-left-1 padding-right-0 margin-0 radius-0 radius-left-lg"
        title={props.tooltip}
        onClick={() => props.onClick(props.index, props.label)}
      >
        {props.label}
      </Button>
      <Button
        type="button"
        className="padding-1 radius-0 radius-right-lg"
        data-testid="remove"
        onClick={() => props.onRemove(props.index, props.label)}
      >
        <FontAwesomeIcon icon={faWindowClose} />
      </Button>
    </div>
  );
};

export default PillButton;
