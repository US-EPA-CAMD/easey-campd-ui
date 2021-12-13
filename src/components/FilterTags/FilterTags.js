import React from 'react';
import { Button } from '@trussworks/react-uswds';

import PillButton from '../PillButton/PillButton';

const FilterTags = (props) => {
  return (
    <div className="display-flex grid-row">
      <div className="text-bold margin-1 margin-right-2">Filters:</div>
      {props.items.map((item, i) => {
        let description = `${item.key}: ${item.values.join(', ')}`;
        let label =
          item.values.length > 1
            ? `${item.key} (${item.values.length})`
            : `${item.key}: ${item.values[0]}`;
        if ((item.key === 'Time Period' || item.key === 'Year') && props.dataType !== "COMPLIANCE") {
          if (item.values.length === 1) {
            label = `${item.values[0]}`;
          } else {
            label = `${item.key}`
            description = `${item.key}: ${item.values[0]}`
          }
        }

        return (
          <PillButton
            key={i}
            index={i}
            label={label}
            position="bottom"
            tooltip={description}
            //onClick={() => props.onClick(item.key)}
            onClick={(index, label, evtTarget) => props.onClick(item.key, evtTarget)}
            onRemove={() => props.onRemove(item.key, label)}
          />
        );
      })}
      <div className="margin-1 margin-left-2">
        <Button type="button" unstyled onClick={props.onClearAll}>
          Clear All
        </Button>
      </div>
    </div>
  );
};

export default FilterTags;
