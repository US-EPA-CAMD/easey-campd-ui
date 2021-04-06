import React from "react";
import { Form, Checkbox, Button, DateRangePicker} from '@trussworks/react-uswds';

const TimePeriodRender = ({
  applyFilterHandler,
  handleStartDateUpdate,
  handleEndDateUpdate,
  handleOptHrsOnlyUpdate,
  isApplyFilterDisabled}) =>{

  return(
    <Form style={{marginLeft:"30px"}} onSubmit={applyFilterHandler}>
      <DateRangePicker
        endDateHint="mm/dd/yyyy"
        endDateLabel="End Date"
        endDatePickerProps={{
          onChange: handleEndDateUpdate,
          disabled: undefined,
          id: 'event-date-end',
          name: 'endDate'
        }}
        startDateHint="mm/dd/yyyy"
        startDateLabel="Start Date"
        startDatePickerProps={{
          onChange: handleStartDateUpdate,
          disabled: undefined,
          id: 'event-date-start',
          name: 'startDate'
      }}/>
      <br/>
      <Checkbox id="opHrsonly" name="opHrsonly" label="Operating hours only" defaultChecked onChange={handleOptHrsOnlyUpdate} /> 
      <Button type="button">Cancel</Button>
      <Button type="submit" disabled={isApplyFilterDisabled()}>Apply Filter</Button>
    </Form>
    );

};

export default TimePeriodRender;

