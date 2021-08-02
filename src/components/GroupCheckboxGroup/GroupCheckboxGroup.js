import React from 'react';

import CheckboxGroup from '../CheckboxGroup/CheckboxGroup';

const GroupCheckboxGroup = (props) => {
  return (
    props.items.map((group,i) =>
    (props.showActiveRetired)?
      group.items.filter(item=>item.active===props.showActive).length>0 &&
      <CheckboxGroup
        getFocus={i===0? props.getFocus: false}
        key={group.name}
        name={group.name}
        description={group.description}
        items={group.items}
        enableSelectAll={props.enableSelectAll}
        showActiveRetired={props.showActiveRetired}
        showActive={props.showActive}
        onSelectAll={props.onSelectAll}
        onSelectItem={props.onSelectItem}
      />
    :
      <CheckboxGroup
      getFocus={i===0? props.getFocus: false}
      key={group.name}
      name={group.name}
      description={group.description}
      items={group.items}
      enableSelectAll={props.enableSelectAll}
      showActiveRetired={props.showActiveRetired}
      showActive={props.showActive}
      onSelectAll={props.onSelectAll}
      onSelectItem={props.onSelectItem}
    />
    )
  )
}

export default GroupCheckboxGroup;
