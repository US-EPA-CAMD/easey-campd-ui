import React from 'react';
import { Checkbox } from '@trussworks/react-uswds';

const CheckboxGroup = (props) => {
  const selectAllDisabled =
    props.items.filter((item) => item.enabled).length === 0;

  const evaluateSelectAll = () => {
    let result = true;
    if (props.showActiveRetired) {
      props.items.forEach((i) => {
        if (i.active === props.showActive && i.selected === false) {
          result = false;
        }
      });
    } else if (selectAllDisabled) {
      result = false;
    } else {
      props.items.forEach((i) => {
        if (i.enabled && i.selected === false) {
          result = false;
        }
      });
    }
    return result;
  };

  const showActiveInId = props.showActiveRetired ? `-${props.showActive}` : '';
  const containerSize = props.smallLabel
    ? 'margin-bottom-2'
    : 'margin-bottom-5 margin-x-2 margin-top-2';
  const labelSize = props.smallLabel ? '' : 'font-sans-lg text-semibold';

  return (
    <div className={`${containerSize} position-relative`}>
      <div
        className={`${labelSize} padding-bottom-1`}
        data-testid="program-group-name"
      >
        {props.enableSelectAll ? (
          <Checkbox
            id={`${props.name}${showActiveInId}`}
            label={props.description}
            name={props.name}
            checked={evaluateSelectAll()}
            onChange={props.onSelectAll}
            data-testid="select-all"
            aria-label={`All ${props.description}`}
            disabled={selectAllDisabled}
          />
        ) : (
          <h5 className="font-sans-md text-bold margin-0">
            {props.description}
          </h5>
        )}
      </div>
      {!props.showActiveRetired && (
        <div className="margin-0 height-2px bg-base-light" />
      )}
      {props.showActiveRetired
        ? props.items
            .filter((item) => item.active === props.showActive)
            .map((item, i) => (
              <div key={item.id} className="font-sans-sm line-height-sans-4">
                <Checkbox
                  id={item.id}
                  name={props.name}
                  label={item.label}
                  checked={item.selected}
                  onChange={props.onSelectItem}
                  disabled={
                    item.hasOwnProperty('enabled') ? !item.enabled : false
                  }
                />
              </div>
            ))
        : props.items.map((item, i) => (
            <div key={item.id} className="font-sans-sm line-height-sans-4">
              <Checkbox
                id={item.id}
                name={props.name}
                label={item.label}
                checked={item.selected}
                onChange={props.onSelectItem}
                disabled={
                  item.hasOwnProperty('enabled') ? !item.enabled : false
                }
              />
            </div>
          ))}
    </div>
  );
};

export default CheckboxGroup;
