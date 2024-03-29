import React from 'react';
import GroupCheckboxGroup from '../GroupCheckboxGroup/GroupCheckboxGroup';

const CheckboxGroupRenderer = ({
  showActiveRetired,
  showActive,
  showRetired,
  items,
  enableSelectAll,
  onSelectAll,
  onSelectItem
}) => {
  const renderer = () =>{
    const result = [];
    if(showActiveRetired){
      if(showActive){
        result.push(
          <div key={1}>
            <div className="margin-x-2">
              <h4 className="font-sans-lg text-normal margin-top-2 margin-bottom-1" data-testid="checkbox-group-active-header">Active Programs</h4>
              <div className="margin-0 height-2px bg-base-light" />
            </div>
            <div>
              <GroupCheckboxGroup
                showActiveRetired={true}
                showActive={true}
                items={items}
                enableSelectAll={enableSelectAll}
                onSelectAll={onSelectAll}
                onSelectItem={onSelectItem}
              />
            </div>
          </div>
        )
      }
      if(showRetired){
        result.push(
          <div key={2}>
            <div className="margin-x-2">
              <h4 className="font-sans-lg text-normal margin-top-2 margin-bottom-1"data-testid="checkbox-group-retired-header">Retired Programs</h4>
              <div className="margin-0 height-2px bg-base-light" />
            </div>
            <div>
              <GroupCheckboxGroup
                showActiveRetired={true}
                showActive={false}
                items={items}
                enableSelectAll={enableSelectAll}
                onSelectAll={onSelectAll}
                onSelectItem={onSelectItem}
              />
            </div>
          </div>
        )
      }
    }else{
      result.push(
        <div key={1}>
          <GroupCheckboxGroup
            showActiveRetired={false}
            items={items}
            enableSelectAll={enableSelectAll}
            onSelectAll={onSelectAll}
            onSelectItem={onSelectItem}
          />
        </div>
      )
    }
    return result.map(res => res);
  }

  return (renderer());
}

export default CheckboxGroupRenderer;
