import React from 'react';
import GroupCheckboxGroup from '../GroupCheckboxGroup/GroupCheckboxGroup';

const ProgramRenderer = ({
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
              <div className="font-sans-lg text-semibold">Active Programs</div>
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
              <div className="font-sans-lg text-semibold">Retired Programs</div>
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

export default ProgramRenderer;
