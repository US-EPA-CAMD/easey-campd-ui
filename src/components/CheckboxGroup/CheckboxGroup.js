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
    <div className="margin-x-2 margin-top-2 margin-bottom-5">
      <div className="display-flex flex-row flex-justify padding-bottom-1">
        <div className="flex-align-self-center">
          <div
            className={props.showActiveRetired ? 'font-sans-md text-bold' : 'font-sans-lg text-semibold'}
            data-testid="program-group-name"
          >
            {props.description}
          </div>
        </div>
        {props.enableSelectAll ? (
          <div className="flex-align-self-center clearfix font-sans-sm text-italic">
            <Checkbox
              id={`${props.name}${showActiveInId}`}
              label={`All ${props.description}`}
              name={props.name}
              checked={evaluateSelectAll()}
              onChange={props.onSelectAll}
              data-testid="select-all"
            />
          </div>
        ) : null}
      </div>
      {!props.showActiveRetired && (
        <div className="margin-0 height-2px bg-base-light" />
      )}
      {props.showActiveRetired
        ? props.items
            .filter((item) => item.active === props.showActive)
            .map((item) => (
              <div key={item.id} className="font-sans-sm">
                <Checkbox
                  id={item.id}
                  name={props.name}
                  label={item.label}
                  checked={item.selected}
                  onChange={props.onSelectItem}
                />
              </div>
            ))
        : props.items.map((item) => (
            <div key={item.id} className="font-sans-sm">
              <Checkbox
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
