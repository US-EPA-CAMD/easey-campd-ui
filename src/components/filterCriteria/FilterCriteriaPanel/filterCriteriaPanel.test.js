import React from "react";
import FilterCriteriaPanel from "./FilterCriteriaPanel";
import configureStore from "../../../store/configureStore.dev";
import initialState from "../../../store/reducers/initialState";
import { cloneDeep } from "lodash";
import { FILTERS_MAP } from "../../../utils/constants/customDataDownload";
import render from "../../../mocks/render";

const initStateCopy = cloneDeep(initialState);
initStateCopy.customDataDownload.dataType = "EMISSIONS";
const store = configureStore(initStateCopy);
const emissionsSubTypes = Object.keys(FILTERS_MAP.EMISSIONS);
const allowanceSubTypes = Object.keys(FILTERS_MAP.ALLOWANCE);
const complianceSubTypes = Object.keys(FILTERS_MAP.COMPLIANCE);
const facilitySubTypes = Object.keys(FILTERS_MAP.FACILITY);
const matsSubTypes = Object.keys(
  FILTERS_MAP["MERCURY AND AIR TOXICS EMISSIONS"]
);
describe("filterCriteriaPanel Component", () => {
  it("renders time period child component without errors", () => {
    const { getByTestId, getAllByTestId, getByRole } = render(
      <FilterCriteriaPanel
        show={true}
        selectedDataSubtype="Hourly Emissions"
        selectedFilter="timePeriod"
        closeFlyOutHandler={jest.fn()}
        applyFilterLoading={false}
        setApplyFilterLoading={jest.fn()}
      />,
      store
    );

    const dateRangePicker = getByTestId("date-range-picker");
    expect(dateRangePicker).toBeInTheDocument();
    expect(dateRangePicker).toHaveClass("usa-date-range-picker");

    const datePickers = getAllByTestId("date-picker");
    expect(datePickers).toHaveLength(2);

    const checkbox = getByRole("checkbox", { checked: true });
    expect(checkbox).toBeInTheDocument();
    const buttons = getAllByTestId("button");
    expect(buttons).toHaveLength(2);
  });

  it("renders time period child component without errors", () => {
    render(
      <FilterCriteriaPanel
        show={false}
        selectedDataSubtype="Hourly Emissions"
        selectedFilter="timePeriod"
        closeFlyOutHandler={jest.fn()}
        applyFilterLoading={false}
        setApplyFilterLoading={jest.fn()}
      />,
      store
    );
  });

  test.each(emissionsSubTypes)("tests each emission subtype", (dataSubType) => {
    const { getByRole } = render(
      <FilterCriteriaPanel
        show={true}
        selectedDataSubtype={dataSubType}
        selectedFilter="timePeriod"
        closeFlyOutHandler={jest.fn()}
        applyFilterLoading={false}
        setApplyFilterLoading={jest.fn()}
      />,
      store
    );
    const timePeriod = getByRole("heading", { name: "Time Period" });
    expect(timePeriod).toBeInTheDocument();
  });

  test.each(matsSubTypes)("tests each mats subtype", (dataSubType) => {
    const { getByRole } = render(
      <FilterCriteriaPanel
        show={true}
        selectedDataSubtype={dataSubType}
        selectedFilter="timePeriod"
        closeFlyOutHandler={jest.fn()}
        applyFilterLoading={false}
        setApplyFilterLoading={jest.fn()}
      />,
      store
    );
    const timePeriod = getByRole("heading", { name: "Time Period" });
    expect(timePeriod).toBeInTheDocument();
  });

  test.each(allowanceSubTypes)("tests each emission subtype", (dataSubType) => {
    const { getByRole } = render(
      <FilterCriteriaPanel
        show={true}
        selectedDataSubtype={dataSubType}
        selectedFilter="stateTerritory"
        closeFlyOutHandler={jest.fn()}
        applyFilterLoading={false}
        setApplyFilterLoading={jest.fn()}
      />,
      store
    );
    const stateTerritory = getByRole("heading", { name: "State/Territory" });
    expect(stateTerritory).toBeInTheDocument();
  });

  test.each(complianceSubTypes)(
    "tests each emission subtype",
    (dataSubType) => {
      const { getByRole } = render(
        <FilterCriteriaPanel
          show={true}
          selectedDataSubtype={dataSubType}
          selectedFilter="stateTerritory"
          closeFlyOutHandler={jest.fn()}
          applyFilterLoading={false}
          setApplyFilterLoading={jest.fn()}
        />,
        store
      );
      const stateTerritory = getByRole("heading", { name: "State/Territory" });
      expect(stateTerritory).toBeInTheDocument();
    }
  );

  test.each(facilitySubTypes)("tests each emission subtype", (dataSubType) => {
    const { getByRole } = render(
      <FilterCriteriaPanel
        show={true}
        selectedDataSubtype={dataSubType}
        selectedFilter="stateTerritory"
        closeFlyOutHandler={jest.fn()}
        applyFilterLoading={false}
        setApplyFilterLoading={jest.fn()}
      />,
      store
    );
    const stateTerritory = getByRole("heading", { name: "State/Territory" });
    expect(stateTerritory).toBeInTheDocument();
  });
});
