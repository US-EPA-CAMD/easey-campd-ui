import React from 'react';
import { Button } from '@trussworks/react-uswds';

import PillButton from '../PillButton/PillButton';

const FilterTags = (props) => {
  return (
    <div className="display-flex">
      <div className="font-weight-bold margin-1 margin-right-2">Filters:</div>
      {props.items.map((item, i) => {
        const label =
          item.values.length > 1
            ? `${item.key} (${item.values.length})`
            : item.values[0];
        const description = `${item.key}: ${item.values.join(', ')}`;

        return (
          <PillButton
            key={i}
            index={i}
            label={label}
            position="bottom"
            tooltip={description}
            onClick={() => props.onClick(item.key)}
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
