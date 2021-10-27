import React from 'react';
import {
  cleanup,
  fireEvent,
  render,
  within,
} from '@testing-library/react';

import Facility from './Facility';
import configureStore from "../../../store/configureStore.dev";
import { Provider } from "react-redux";
import initialState from "../../../store/reducers/initialState";
import { loadFacilities, updateFacilitySelection } from "../../../store/actions/customDataDownload/filterCriteria";
import { addAppliedFilter, removeAppliedFilter } from "../../../store/actions/customDataDownload/customDataDownload";

const facilities = [
  {
    "id": "1",
    "facilityId": "3",
    "facilityName": "Barry",
    "state": "AL",
    "links": [
      {
        "rel": "self",
        "href": "/api/facility-mgmt/facilities/1"
      },
      {
        "rel": "units",
        "href": "/api/facility-mgmt/facilities/1/units"
      },
      {
        "rel": "stacks",
        "href": "/api/facility-mgmt/facilities/1/stacks"
      },
      {
        "rel": "owners",
        "href": "/api/facility-mgmt/facilities/1/owners"
      },
      {
        "rel": "contacts",
        "href": "/api/facility-mgmt/facilities/1/contacts"
      }
    ]
  },
  {
    "id": "2",
    "facilityId": "5",
    "facilityName": "Chickasaw",
    "state": "AL",
    "links": [
      {
        "rel": "self",
        "href": "/api/facility-mgmt/facilities/2"
      },
      {
        "rel": "units",
        "href": "/api/facility-mgmt/facilities/2/units"
      },
      {
        "rel": "stacks",
        "href": "/api/facility-mgmt/facilities/2/stacks"
      },
      {
        "rel": "owners",
        "href": "/api/facility-mgmt/facilities/2/owners"
      },
      {
        "rel": "contacts",
        "href": "/api/facility-mgmt/facilities/2/contacts"
      }
    ]
  },
  {
    "id": "3",
    "facilityId": "7",
    "facilityName": "Gadsden",
    "state": "AL",
    "links": [
      {
        "rel": "self",
        "href": "/api/facility-mgmt/facilities/3"
      },
      {
        "rel": "units",
        "href": "/api/facility-mgmt/facilities/3/units"
      },
      {
        "rel": "stacks",
        "href": "/api/facility-mgmt/facilities/3/stacks"
      },
      {
        "rel": "owners",
        "href": "/api/facility-mgmt/facilities/3/owners"
      },
      {
        "rel": "contacts",
        "href": "/api/facility-mgmt/facilities/3/contacts"
      }
    ]
  },
  {
    "id": "4",
    "facilityId": "8",
    "facilityName": "Gorgas",
    "state": "AL",
    "links": [
      {
        "rel": "self",
        "href": "/api/facility-mgmt/facilities/4"
      },
      {
        "rel": "units",
        "href": "/api/facility-mgmt/facilities/4/units"
      },
      {
        "rel": "stacks",
        "href": "/api/facility-mgmt/facilities/4/stacks"
      },
      {
        "rel": "owners",
        "href": "/api/facility-mgmt/facilities/4/owners"
      },
      {
        "rel": "contacts",
        "href": "/api/facility-mgmt/facilities/4/contacts"
      }
    ]
  },
  {
    "id": "5",
    "facilityId": "10",
    "facilityName": "Greene County",
    "state": "AL",
    "links": [
      {
        "rel": "self",
        "href": "/api/facility-mgmt/facilities/5"
      },
      {
        "rel": "units",
        "href": "/api/facility-mgmt/facilities/5/units"
      },
      {
        "rel": "stacks",
        "href": "/api/facility-mgmt/facilities/5/stacks"
      },
      {
        "rel": "owners",
        "href": "/api/facility-mgmt/facilities/5/owners"
      },
      {
        "rel": "contacts",
        "href": "/api/facility-mgmt/facilities/5/contacts"
      }
    ]
  },
  {
    "id": "6",
    "facilityId": "26",
    "facilityName": "E C Gaston",
    "state": "AL",
    "links": [
      {
        "rel": "self",
        "href": "/api/facility-mgmt/facilities/6"
      },
      {
        "rel": "units",
        "href": "/api/facility-mgmt/facilities/6/units"
      },
      {
        "rel": "stacks",
        "href": "/api/facility-mgmt/facilities/6/stacks"
      },
      {
        "rel": "owners",
        "href": "/api/facility-mgmt/facilities/6/owners"
      },
      {
        "rel": "contacts",
        "href": "/api/facility-mgmt/facilities/6/contacts"
      }
    ]
  },
  {
    "id": "7",
    "facilityId": "47",
    "facilityName": "Colbert",
    "state": "AL",
    "links": [
      {
        "rel": "self",
        "href": "/api/facility-mgmt/facilities/7"
      },
      {
        "rel": "units",
        "href": "/api/facility-mgmt/facilities/7/units"
      },
      {
        "rel": "stacks",
        "href": "/api/facility-mgmt/facilities/7/stacks"
      },
      {
        "rel": "owners",
        "href": "/api/facility-mgmt/facilities/7/owners"
      },
      {
        "rel": "contacts",
        "href": "/api/facility-mgmt/facilities/7/contacts"
      }
    ]
  },
  {
    "id": "8",
    "facilityId": "50",
    "facilityName": "Widows Creek",
    "state": "AL",
    "links": [
      {
        "rel": "self",
        "href": "/api/facility-mgmt/facilities/8"
      },
      {
        "rel": "units",
        "href": "/api/facility-mgmt/facilities/8/units"
      },
      {
        "rel": "stacks",
        "href": "/api/facility-mgmt/facilities/8/stacks"
      },
      {
        "rel": "owners",
        "href": "/api/facility-mgmt/facilities/8/owners"
      },
      {
        "rel": "contacts",
        "href": "/api/facility-mgmt/facilities/8/contacts"
      }
    ]
  },
  {
    "id": "9",
    "facilityId": "51",
    "facilityName": "Dolet Hills Power Station",
    "state": "LA",
    "links": [
      {
        "rel": "self",
        "href": "/api/facility-mgmt/facilities/9"
      },
      {
        "rel": "units",
        "href": "/api/facility-mgmt/facilities/9/units"
      },
      {
        "rel": "stacks",
        "href": "/api/facility-mgmt/facilities/9/stacks"
      },
      {
        "rel": "owners",
        "href": "/api/facility-mgmt/facilities/9/owners"
      },
      {
        "rel": "contacts",
        "href": "/api/facility-mgmt/facilities/9/contacts"
      }
    ]
  },
  {
    "id": "10",
    "facilityId": "54",
    "facilityName": "Smith Generating Facility",
    "state": "KY",
    "links": [
      {
        "rel": "self",
        "href": "/api/facility-mgmt/facilities/10"
      },
      {
        "rel": "units",
        "href": "/api/facility-mgmt/facilities/10/units"
      },
      {
        "rel": "stacks",
        "href": "/api/facility-mgmt/facilities/10/stacks"
      },
      {
        "rel": "owners",
        "href": "/api/facility-mgmt/facilities/10/owners"
      },
      {
        "rel": "contacts",
        "href": "/api/facility-mgmt/facilities/10/contacts"
      }
    ]
  }
];
initialState.filterCriteria.facility = facilities.map(f=> ({id: f.facilityId, label:`${f.facilityName} (${f.facilityId})`, selected:false}));
const store = configureStore(initialState);
let flyOutClosed = false;
describe('Facility Component', () => {
  let query;
  beforeEach(() => {
    query = render(
      <Provider 
        store={store}>
        <Facility
          loadFacilitiesDispatcher ={loadFacilities}
          updateFacilitySelectionDispacher ={updateFacilitySelection}
          addAppliedFilterDispatcher ={addAppliedFilter}
          removeAppliedFilterDispatcher ={removeAppliedFilter}
          closeFlyOutHandler ={()=> flyOutClosed=true}
          renderedHandler ={jest.fn()}
        />
      </Provider>);
  });

  afterEach(cleanup);

  it('renders all elements properely', () => {
    const { getByTestId, getAllByTestId, getByText} = query;
    expect(getByText("Facility")).toBeInTheDocument();
    const searchbox = getByTestId("input-search");
    expect(searchbox).toBeInTheDocument();
    searchbox.focus();
    fireEvent.click(searchbox);
    const listBox = getByTestId("multi-select-listbox");
    expect(listBox).toBeInTheDocument();
    expect(within(listBox).getAllByTestId('multi-select-option').length).toBe(initialState.filterCriteria.facility.length);
  });

  it('handles click event of cancel button', () => {
    const { getByText} = query;
    fireEvent.click(getByText("Cancel"));
    expect(flyOutClosed).toBe(true);
  });

  test('It should search using input box for facilities in listboxt and add selection to apply filter', () => {
    const { getByTestId, getAllByTestId, getByRole, getByText} = query;
    const searchbox = getByTestId("input-search");
    searchbox.focus();
    fireEvent.click(searchbox);
    fireEvent.change(searchbox, { target: { value: 'Barry' } })
    expect(searchbox.value).toBe('Barry');
    expect(within(getByTestId("multi-select-listbox")).getAllByTestId('multi-select-option').length).toBe(1);
    fireEvent.keyDown(searchbox, {key: 'Tab', code: 9});
    fireEvent.keyDown(searchbox, {key: 'Enter', code: 'Enter'})
    expect(searchbox.value).toBe('Barry');
    expect(getAllByTestId("multi-select-option").length).toBe(1);
    fireEvent.click(getByTestId("multi-select-option"));
    expect(getByRole("button", {name: "Barry (3)"})).toBeDefined();
    expect(getAllByTestId("multi-select-option").length).toBe(facilities.length);
    fireEvent.click(getByText("Apply Filter"));
    expect(flyOutClosed).toBe(true);
  })
});
