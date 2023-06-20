import React from "react";
import { cleanup, fireEvent, within } from "@testing-library/react";
import { cloneDeep } from "lodash";

import configureStore from "../../../store/configureStore.dev";
import initialState from "../../../store/reducers/initialState";
import AccountNameNumber from "./AccountNameNumber";
import userEvent from "@testing-library/user-event";
import {
  noValidAccountsMessage,
  showInvalidAccounts,
} from "../../../utils/constants/validationMessages";
import render from "../../../mocks/render";

const nameNumbers = [
  {
    accountNumber: "000000000001",
    accountName: "Auction Reserve",
  },
  {
    accountNumber: "000000000002",
    accountName: "Direct Sale Reserve",
  },
  {
    accountNumber: "000000000003",
    accountName: "Small Diesel Reserve",
  },
  {
    accountNumber: "000000000004",
    accountName: "Phase I Extension Reserve",
  },
  {
    accountNumber: "000000000005",
    accountName: "Conservation and Renewables Reserve",
  },
  {
    accountNumber: "000000000006",
    accountName: "Renewable Energy Reserve",
  },
  {
    accountNumber: "000000000007",
    accountName: "Repowering Reserve",
  },
  {
    accountNumber: "000000000008",
    accountName: "Reduced Utilization Reserve",
  },
  {
    accountNumber: "000000000009",
    accountName: "Initial Allocation Reserve",
  },
  {
    accountNumber: "000000000010",
    accountName: "Opt In Reserve",
  },
  {
    accountNumber: "000000000011",
    accountName: "Substitution Reserve",
  },
];
const initStateCopy = cloneDeep(initialState);
initStateCopy.filterCriteria.accountNameNumber = nameNumbers.map((ann) => ({
  id: ann.accountNumber,
  label: `${ann.accountName} (${ann.accountNumber})`,
  selected: false,
  enabled: true,
}));
const store = configureStore(initStateCopy);
let flyOutClosed = false;
let applyFilterLoading = false;

describe("Account Name/Number Component", () => {
  let query;
  beforeEach(() => {
    query = render(
      <AccountNameNumber
        updateAccountNameNumberSelectionDispatcher={jest.fn()}
        addAppliedFilterDispatcher={jest.fn()}
        removeAppliedFilterDispatcher={jest.fn()}
        closeFlyOutHandler={() => (flyOutClosed = true)}
        renderedHandler={jest.fn()}
        setApplyFilterLoading={() => (applyFilterLoading = true)}
        updateFilterCriteriaDispatcher={jest.fn()}
      />,
      store
    );
  });

  afterEach(cleanup);

  it("renders all elements properely", async () => {
    const { getByTestId, getByText } = query;
    expect(getByText("Account Name/Number")).toBeInTheDocument();
    const searchbox = getByTestId("input-search");
    expect(searchbox).toBeInTheDocument();
    searchbox.focus();
    await fireEvent.click(searchbox);
    const listBox = getByTestId("multi-select-listbox");
    expect(listBox).toBeInTheDocument();
    expect(within(listBox).getAllByTestId("multi-select-option").length).toBe(
      initStateCopy.filterCriteria.accountNameNumber.length
    );
  });

  it("handles click event of cancel button", async () => {
    const { getByText } = query;
    await fireEvent.click(getByText("Cancel"));
    expect(flyOutClosed).toBe(true);
  });

  test("It should search using input box for Account Name/Numbers in listboxt", async () => {
    const { getByTestId, getAllByTestId, getByRole, getByText } = query;
    const searchbox = getByTestId("input-search");
    searchbox.focus();
    await fireEvent.click(searchbox);
    await fireEvent.change(searchbox, { target: { value: "Auction Reserve" } });
    expect(searchbox.value).toBe("Auction Reserve");
    expect(
      within(getByTestId("multi-select-listbox")).getAllByTestId(
        "multi-select-option"
      ).length
    ).toBe(1);
    await fireEvent.keyDown(searchbox, { key: "Tab", code: 9 });
    await fireEvent.keyDown(searchbox, { key: "Enter", code: "Enter" });
    await fireEvent.click(getAllByTestId("multi-select-option")[0]);
    expect(
      getByRole("button", { name: "Auction Reserve (000000000001)" })
    ).toBeInTheDocument();
    expect(getAllByTestId("multi-select-option").length).toBe(
      nameNumbers.length
    );
    fireEvent.click(getByText("Apply Filter"));
    expect(flyOutClosed).toBe(true);
    expect(applyFilterLoading).toBe(true);
  });

  describe("pipe separated lists", () => {
    test("It should handle pipe separated lists", async () => {
      const { getByTestId, getByRole, getByText } = query;
      const searchbox = getByTestId("input-search");
      await userEvent.click(searchbox);
      await userEvent.type(
        searchbox,
        "000000000001|000000000002|000000000003|"
      );
      await fireEvent.keyDown(searchbox, { key: "Enter", code: "Enter" });
      expect(
        getByRole("button", { name: "Auction Reserve (000000000001)" })
      ).toBeInTheDocument();
      expect(
        getByRole("button", { name: "Direct Sale Reserve (000000000002)" })
      ).toBeInTheDocument();
      expect(
        getByRole("button", { name: "Small Diesel Reserve (000000000003)" })
      ).toBeInTheDocument();
      fireEvent.click(getByText("Apply Filter"));
      expect(applyFilterLoading).toBe(true);
    });
    test("It should show alert if no enteries are valid", async () => {
      const { findByTestId } = query;
      const searchbox = await findByTestId("input-search");
      await fireEvent.click(searchbox);
      await userEvent.type(searchbox, "sds|sdcs|dsc|");
      await fireEvent.keyDown(searchbox, { key: "Enter", code: "Enter" });
      const alert = await findByTestId("alert");
      expect(alert).toBeInTheDocument();
    });

    test("it should show which entries are invalid if some entries are valid", async () => {
      const { findByTestId, findByText } = query;
      const searchbox = await findByTestId("input-search");
      await fireEvent.click(searchbox);
      await userEvent.type(
        searchbox,
        "000000000001|000000000002|000000000003|invalid1|invalid2"
      );
      await fireEvent.keyDown(searchbox, { key: "Enter", code: "Enter" });
      const alertMessage = await findByText(
        showInvalidAccounts(`"invalid1", and "invalid2"`)
      );
      expect(alertMessage).toBeInTheDocument();
    });

    test("it should show no entries are valid if no entries are valid", async () => {
      const { getByTestId, findByText } = query;
      const searchbox = getByTestId("input-search");
      await fireEvent.click(searchbox);
      await userEvent.type(searchbox, "invalid1|invalid2|invalid3");
      await fireEvent.keyDown(searchbox, { key: "Enter", code: "Enter" });
      const alertMessage = await findByText(noValidAccountsMessage);
      expect(alertMessage).toBeInTheDocument();
    });

    test("pipe separated list should work with spaces", async () => {
      const { findByTestId, queryByTestId, findByRole } = query;
      const searchbox = await findByTestId("input-search");
      await fireEvent.click(searchbox);
      await userEvent.type(
        searchbox,
        "000000000001 | 000000000002 | 000000000003|"
      );
      await fireEvent.keyDown(searchbox, { key: "Enter", code: "Enter" });
      expect(
        await findByRole("button", { name: "Auction Reserve (000000000001)" })
      ).toBeInTheDocument();
      expect(
        await findByRole("button", {
          name: "Direct Sale Reserve (000000000002)",
        })
      ).toBeInTheDocument();
      expect(
        await findByRole("button", {
          name: "Small Diesel Reserve (000000000003)",
        })
      ).toBeInTheDocument();
      const alert = await queryByTestId("alert");
      expect(alert).not.toBeInTheDocument();
    });

    test("pipe separated list should be applied with the tab key", async () => {
      const { findByTestId, queryByTestId, findByRole } = query;
      const searchbox = await findByTestId("input-search");
      await fireEvent.click(searchbox);
      await userEvent.type(
        searchbox,
        "000000000001 | 000000000002 | 000000000003|"
      );
      await userEvent.tab();
      expect(
        await findByRole("button", { name: "Auction Reserve (000000000001)" })
      ).toBeInTheDocument();
      expect(
        await findByRole("button", {
          name: "Direct Sale Reserve (000000000002)",
        })
      ).toBeInTheDocument();
      expect(
        await findByRole("button", {
          name: "Small Diesel Reserve (000000000003)",
        })
      ).toBeInTheDocument();
      const alert = await queryByTestId("alert");
      expect(alert).not.toBeInTheDocument();
    });
  });
});
