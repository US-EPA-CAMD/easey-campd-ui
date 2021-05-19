import React from 'react';
import GroupCheckboxGroup from '../GroupCheckboxGroup/GroupCheckboxGroup';

const UnitTypeRenderer = ({
  items,
  enableSelectAll,
  onSelectAll,
  onSelectItem,
}) => {
  const renderer = () => {
    const result = [];
    result.push(
      <div key={1}>
        <div>
          <GroupCheckboxGroup
            showActiveRetired={false}
            items={items}
            enableSelectAll={enableSelectAll}
            onSelectAll={onSelectAll}
            onSelectItem={onSelectItem}
          />
        </div>
      </div>
    );

    return result.map((res) => res);
  };
  return renderer();
};

export default UnitTypeRenderer;
