import React from 'react';
import { render, fireEvent, cleanup } from '@testing-library/react';
import { Provider } from 'react-redux';

import ControlTechnology from './ControlTechnology';
import { restructureControlTechnologies } from '../../../utils/selectors/filterCriteria';
import configureStore from '../../../store/configureStore.dev';
import initialState from '../../../store/reducers/initialState';

const controlTechnology = [
  {
    controlCode: 'APAC',
    controlDescription:
      'Additives to Enhance PAC and Existing Equipment Performance',
    controlEquipParamCode: 'HG',
    controlEquipParamDescription: 'Mercury',
  },
  {
    controlCode: 'B',
    controlDescription: 'Baghouse',
    controlEquipParamCode: 'PART',
    controlEquipParamDescription: 'Particulates (Opacity)',
  },
  {
    controlCode: 'C',
    controlDescription: 'Cyclone',
    controlEquipParamCode: 'PART',
    controlEquipParamDescription: 'Particulates (Opacity)',
  },
  {
    controlCode: 'CAT',
    controlDescription:
      'Catalyst (gold, palladium, or other) used to oxidize mercury',
    controlEquipParamCode: 'HG',
    controlEquipParamDescription: 'Mercury',
  },
  {
    controlCode: 'CM',
    controlDescription: 'Combustion Modification/Fuel Reburning',
    controlEquipParamCode: 'NOX',
    controlEquipParamDescription: 'Nitrogen Oxides',
  },
  {
    controlCode: 'DA',
    controlDescription: 'Dual Alkali',
    controlEquipParamCode: 'SO2',
    controlEquipParamDescription: 'Sulfur Dioxide',
  },
  {
    controlCode: 'DL',
    controlDescription: 'Dry Lime FGD',
    controlEquipParamCode: 'SO2',
    controlEquipParamDescription: 'Sulfur Dioxide',
  },
  {
    controlCode: 'DLNB',
    controlDescription: 'Dry Low NOx Burners',
    controlEquipParamCode: 'NOX',
    controlEquipParamDescription: 'Nitrogen Oxides',
  },
  {
    controlCode: 'DSI',
    controlDescription: 'Dry Sorbent Injection',
    controlEquipParamCode: null,
    controlEquipParamDescription: null,
  },
  {
    controlCode: 'ESP',
    controlDescription: 'Electrostatic Precipitator',
    controlEquipParamCode: 'PART',
    controlEquipParamDescription: 'Particulates (Opacity)',
  },
  {
    controlCode: 'FBL',
    controlDescription: 'Fluidized Bed Limestone Injection',
    controlEquipParamCode: 'SO2',
    controlEquipParamDescription: 'Sulfur Dioxide',
  },
  {
    controlCode: 'H2O',
    controlDescription: 'Water Injection',
    controlEquipParamCode: 'NOX',
    controlEquipParamDescription: 'Nitrogen Oxides',
  },
  {
    controlCode: 'HESP',
    controlDescription: 'Hybrid ESP',
    controlEquipParamCode: 'PART',
    controlEquipParamDescription: 'Particulates (Opacity)',
  },
  {
    controlCode: 'HPAC',
    controlDescription: 'Halogenated PAC Sorbent Injection',
    controlEquipParamCode: 'HG',
    controlEquipParamDescription: 'Mercury',
  },
  {
    controlCode: 'LNB',
    controlDescription: 'Low NOx Burner Technology (Dry Bottom only)',
    controlEquipParamCode: 'NOX',
    controlEquipParamDescription: 'Nitrogen Oxides',
  },
  {
    controlCode: 'LNBO',
    controlDescription: 'Low NOx Burner Technology w/ Overfire Air',
    controlEquipParamCode: 'NOX',
    controlEquipParamDescription: 'Nitrogen Oxides',
  },
  {
    controlCode: 'LNC1',
    controlDescription: 'Low NOx Burner Technology w/ Closed-coupled OFA',
    controlEquipParamCode: 'NOX',
    controlEquipParamDescription: 'Nitrogen Oxides',
  },
  {
    controlCode: 'LNC2',
    controlDescription: 'Low NOx Burner Technology w/ Separated OFA',
    controlEquipParamCode: 'NOX',
    controlEquipParamDescription: 'Nitrogen Oxides',
  },
  {
    controlCode: 'LNC3',
    controlDescription:
      'Low NOx Burner Technology w/ Closed-coupled/Separated OFA',
    controlEquipParamCode: 'NOX',
    controlEquipParamDescription: 'Nitrogen Oxides',
  },
  {
    controlCode: 'LNCB',
    controlDescription: 'Low NOx Cell Burner',
    controlEquipParamCode: 'NOX',
    controlEquipParamDescription: 'Nitrogen Oxides',
  },
  {
    controlCode: 'MO',
    controlDescription: 'Magnesium Oxide',
    controlEquipParamCode: 'SO2',
    controlEquipParamDescription: 'Sulfur Dioxide',
  },
  {
    controlCode: 'NH3',
    controlDescription: 'Ammonia Injection',
    controlEquipParamCode: 'NOX',
    controlEquipParamDescription: 'Nitrogen Oxides',
  },
  {
    controlCode: 'O',
    controlDescription: 'Other',
    controlEquipParamCode: null,
    controlEquipParamDescription: null,
  },
  {
    controlCode: 'OFA',
    controlDescription: 'Overfire Air',
    controlEquipParamCode: 'NOX',
    controlEquipParamDescription: 'Nitrogen Oxides',
  },
  {
    controlCode: 'REAC',
    controlDescription: 'Regenerative Activated Coke Technology',
    controlEquipParamCode: 'HG',
    controlEquipParamDescription: 'Mercury',
  },
  {
    controlCode: 'SB',
    controlDescription: 'Sodium Based',
    controlEquipParamCode: 'SO2',
    controlEquipParamDescription: 'Sulfur Dioxide',
  },
  {
    controlCode: 'SCR',
    controlDescription: 'Selective Catalytic Reduction',
    controlEquipParamCode: 'NOX',
    controlEquipParamDescription: 'Nitrogen Oxides',
  },
  {
    controlCode: 'SNCR',
    controlDescription: 'Selective Non-catalytic Reduction',
    controlEquipParamCode: 'NOX',
    controlEquipParamDescription: 'Nitrogen Oxides',
  },
  {
    controlCode: 'SORB',
    controlDescription: 'Other (Non PAC) Sorbent Injection',
    controlEquipParamCode: 'HG',
    controlEquipParamDescription: 'Mercury',
  },
  {
    controlCode: 'STM',
    controlDescription: 'Steam Injection',
    controlEquipParamCode: 'NOX',
    controlEquipParamDescription: 'Nitrogen Oxides',
  },
  {
    controlCode: 'UPAC',
    controlDescription: 'Untreated PAC Sorbent Injection',
    controlEquipParamCode: 'HG',
    controlEquipParamDescription: 'Mercury',
  },
  {
    controlCode: 'WESP',
    controlDescription: 'Wet ESP',
    controlEquipParamCode: 'PART',
    controlEquipParamDescription: 'Particulates (Opacity)',
  },
  {
    controlCode: 'WL',
    controlDescription: 'Wet Lime FGD',
    controlEquipParamCode: 'SO2',
    controlEquipParamDescription: 'Sulfur Dioxide',
  },
  {
    controlCode: 'WLS',
    controlDescription: 'Wet Limestone',
    controlEquipParamCode: 'SO2',
    controlEquipParamDescription: 'Sulfur Dioxide',
  },
  {
    controlCode: 'WS',
    controlDescription: 'Wet Scrubber',
    controlEquipParamCode: 'PART',
    controlEquipParamDescription: 'Particulates (Opacity)',
  },
];
const storeControlTechnology = restructureControlTechnologies(
  controlTechnology
);
initialState.filterCriteria.controlTechnology = storeControlTechnology;
const store = configureStore(initialState);

describe('Control technology', () => {
  let queries;
  beforeEach(() => {
    // setup a DOM element as a render target
    queries = render(
      <Provider store={store}>
        <ControlTechnology
          closeFlyOutHandler={jest.fn()}
          loadEmissionsProgramsDispatcher={jest.fn()}
          updateProgramSelectionDispatcher={jest.fn()}
          addAppliedFilterDispatcher={jest.fn()}
          removeAppliedFilterDispatcher={jest.fn()}
        />
      </Provider>
    );
  });

  afterEach(cleanup);

  it('Check that the component properly renders', () => {
    const { getByText, getAllByTestId, getAllByRole } = queries;
    expect(getByText('Mercury (HG)')).toBeInTheDocument();
    expect(getByText('Nitrogen Oxides (NOX)')).toBeInTheDocument();
    expect(getByText('Particulates (Opacity)')).toBeInTheDocument();
    expect(getByText('Sulfur Dioxide (SO2)')).toBeInTheDocument();
    expect(getByText('Other')).toBeInTheDocument();

    const selectAllCheckBoxes = getAllByTestId('select-all');
    expect(selectAllCheckBoxes).toHaveLength(5);

    const checkbox = getAllByRole('checkbox');
    expect(checkbox).toHaveLength(
      storeControlTechnology[0].items.length +
        storeControlTechnology[1].items.length +
        storeControlTechnology[2].items.length +
        storeControlTechnology[3].items.length +
        storeControlTechnology[4].items.length +
        selectAllCheckBoxes.length
    );
  });

  it('handles checkbox selection appropriately', () => {
    const { getByRole } = queries;
    const wlCheckbox = getByRole('checkbox', {
      name: 'Wet Limestone (WLS)',
    });
    fireEvent.click(wlCheckbox);
    expect(wlCheckbox.checked).toEqual(true);

    const selectAllNox = getByRole('checkbox', {
      name: 'Nitrogen Oxides (NOX)',
    });
    fireEvent.click(selectAllNox);
    expect(selectAllNox.checked).toEqual(true);

    const applyButton = getByRole('button', {
      name: 'Apply Filter',
    });
    fireEvent.click(applyButton);

    fireEvent.click(wlCheckbox);
    expect(wlCheckbox.checked).toEqual(false);

    fireEvent.click(applyButton);
  });
});
