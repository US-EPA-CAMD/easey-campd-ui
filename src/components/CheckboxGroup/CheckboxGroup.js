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

  return (
    <div className="margin-x-2 margin-top-2 margin-bottom-5">
      <div className="display-flex flex-row flex-justify">
        <div className="flex-align-self-center">
          <h4>{props.description}</h4>
        </div>
        { props.enableSelectAll ?
            <div className="flex-align-self-center clearfix">
              <Checkbox
                id={`${props.name}-${props.showActive}`}
                label="Select All"
                name= {props.name}
                checked={evaluateSelectAll()}
                onChange={props.onSelectAll}
              />
            </div>
          : null
        }
      </div>
      <hr className="margin-0" />
      {
        props.showActiveRetired ?
          props.items
            .filter(item => item.active === props.showActive)
            .map(item =>
              <div key={item.id}>
                <Checkbox
                  id={item.id}
                  name={props.name}
                  label={item.description}
                  checked={item.selected}
                  onChange={props.onSelectItem}
                />
              </div>)
          :
          props.items.map(item =>
            <div key={item.id}>
              <Checkbox
                id={item.id}
                name={props.name}
                label={item.description}
                checked={item.selected}
                onChange={props.onSelectItem}
              />
            </div>)
      }
    </div>
  );
}

export default CheckboxGroup;
