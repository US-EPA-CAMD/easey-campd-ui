import React from 'react';
import { Checkbox } from '@trussworks/react-uswds';

const CheckboxGroup = (props) => {
  const evaluateSelectAll = () =>{
    let result = true
    if(props.showActiveRetired){
      props.items.forEach(i=>{
        if(i.active === props.showActive && i.selected===false){
          result = false;
        }
      });
    }else{
      props.items.forEach(i=>{
        if(i.selected===false){
          result=false;
        }
      })
    }
    return result;
  };

  const showActiveInId = props.showActiveRetired ? `-${props.showActive}` : '';

  return (
    <div className="margin-x-2 margin-top-2 margin-bottom-5 position-relative">
      <div
        className="font-sans-lg text-semibold padding-bottom-1"
        data-testid="program-group-name"
      >
        {props.enableSelectAll ? (
          <Checkbox
            autoFocus={props.getFocus}
            id={`${props.name}${showActiveInId}`}
            label={props.description}
            name={props.name}
            checked={evaluateSelectAll()}
            onChange={props.onSelectAll}
            data-testid="select-all"
          />
        ) : (
          <h5 className="font-sans-md text-bold margin-0">{props.description}</h5>
        )}
      </div>
      {!props.showActiveRetired && (
        <div className="margin-0 height-2px bg-base-light" />
      )}
      {props.showActiveRetired
        ? props.items
            .filter((item) => item.active === props.showActive)
            .map((item, i) => (
              <div key={item.id} className="font-sans-sm">
                <Checkbox
                  autoFocus={props.getFocus && i===0?true:false}
                  id={item.id}
                  name={props.name}
                  label={item.label}
                  checked={item.selected}
                  onChange={props.onSelectItem}
                />
              </div>
            ))
        : props.items.map((item, i) => (
            <div key={item.id} className="font-sans-sm">
              <Checkbox
                //autoFocus={props.getFocus && i===0?true:false}
                id={item.id}
                name={props.name}
                label={item.label}
                checked={item.selected}
                onChange={props.onSelectItem}
              />
            </div>
          ))}
    </div>
  );
}

export default CheckboxGroup;
