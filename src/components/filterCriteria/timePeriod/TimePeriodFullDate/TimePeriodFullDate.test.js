import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TimePeriodFullDate from "./TimePeriodFullDate";

describe("TimePeriodFullDate", () => {
  const formState = {
    startDate: "01/01/2022",
    endDate: "12/31/2022",
    opHrsOnly: true,
  };

  const handleStartDateUpdate = jest.fn();
  const handleEndDateUpdate = jest.fn();
  const handleOptHrsOnlyUpdate = jest.fn();
  const onInvalidHandler = jest.fn();
  const isFormValid = jest.fn(() => true);
  const isAllowance = false;
  const dataType = "MERCURY AND AIR TOXICS EMISSIONS";

  it("should render all the required elements", () => {
    render(
      <TimePeriodFullDate
        formState={formState}
        handleStartDateUpdate={handleStartDateUpdate}
        handleEndDateUpdate={handleEndDateUpdate}
        handleOptHrsOnlyUpdate={handleOptHrsOnlyUpdate}
        showOpHrsOnly={true}
        onInvalidHandler={onInvalidHandler}
        validations={{}}
        isFormValid={isFormValid}
        isAllowance={true}
        dataType={dataType}
      />
    );

    expect(screen.getByLabelText("Start Date (Required)")).toBeInTheDocument();
    expect(screen.getByLabelText("End Date (Required)")).toBeInTheDocument();
    expect(screen.getByLabelText("Operating hours only")).toBeInTheDocument();
    expect(
      screen.getByRole("checkbox", { name: "Operating hours only" })
    ).toBeChecked();
  });

  it("should call the update handlers on date and checkbox changes", async () => {
    render(
      <TimePeriodFullDate
        formState={{
          startDate: "",
          endDate: "",
          opHrsOnly: true,
        }}
        handleStartDateUpdate={handleStartDateUpdate}
        handleEndDateUpdate={handleEndDateUpdate}
        handleOptHrsOnlyUpdate={handleOptHrsOnlyUpdate}
        showOpHrsOnly={true}
        onInvalidHandler={onInvalidHandler}
        validations={{}}
        isFormValid={isFormValid}
        isAllowance={isAllowance}
        dataType={dataType}
      />
    );

    const startDateInput = screen.getByLabelText("Start Date (Required)");
    const endDateInput = screen.getByLabelText("End Date (Required)");
    const opHrsOnlyCheckbox = screen.getByRole("checkbox", {
      name: "Operating hours only",
    });

    await userEvent.type(startDateInput, "01/01/2023");
    expect(handleStartDateUpdate).toHaveBeenCalledWith("01/01/2023");

    await userEvent.type(endDateInput, "12/31/2023");
    expect(handleEndDateUpdate).toHaveBeenCalledWith("12/31/2023");

    await userEvent.click(opHrsOnlyCheckbox);
    expect(handleOptHrsOnlyUpdate).toHaveBeenCalled();
  });

  it("should display validation checklist when form is invalid", () => {
    render(
      <TimePeriodFullDate
        formState={formState}
        handleStartDateUpdate={handleStartDateUpdate}
        handleEndDateUpdate={handleEndDateUpdate}
        handleOptHrsOnlyUpdate={handleOptHrsOnlyUpdate}
        showOpHrsOnly={true}
        onInvalidHandler={onInvalidHandler}
        validations={{
          startDateFormat: false,
          endDateFormat: true,
          dateRange: true,
          validReportingQuarter: false,
          validRangeLimit: false,
        }}
        isFormValid={() => false}
        isAllowance={isAllowance}
        dataType={"EMISSIONS"}
      />
    );

    expect(screen.getByRole("alert")).toBeInTheDocument();
    expect(
      screen.getByText("Enter the Start Date in the MM/DD/YYYY format")
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "Enter an end date that is greater than or equal to the begin date"
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "The date range should be limited to a 2 year time period"
      )
    ).toBeInTheDocument();
  });
});
