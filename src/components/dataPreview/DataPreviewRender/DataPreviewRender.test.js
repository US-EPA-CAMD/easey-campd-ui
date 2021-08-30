import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';

import configureStore from '../../../store/configureStore.dev';
import initialState from '../../../store/reducers/initialState';
import DataPreviewRender from './DataPreviewRender';

const fieldMappings = [{"label":"State","value":"state"},{"label":"Facility Name","value":"facilityName"},{"label":"Facility ID","value":"orisCode"},
{"label":"Unit ID","value":"unitId"},{"label":"Associated Stacks","value":"assocStacks"},{"label":"Date","value":"opDate"},{"label":"Hour","value":"opHour"},
{"label":"Operating Time","value":"opTime"},{"label":"Gross Load (MW)","value":"gLoad"},{"label":"Steam Load (1000 lb/hr)","value":"sLoad"},
{"label":"SO2 Mass (lbs)","value":"so2Mass"},{"label":"SO2 Mass Measure Indicator","value":"so2MassMeasureFlg"},{"label":"SO2 Rate (lbs/mmBtu)","value":"so2Rate"},
{"label":"SO2 Rate Measure Indicator","value":"so2RateMeasureFlg"},{"label":"NOx Mass (lbs)","value":"noxMass"},{"label":"NOx Mass Measure Indicator","value":"noxMassMeasureFlg"},
{"label":"NOx Rate (lbs/mmBtu)","value":"noxRate"},{"label":"NOx Rate Measure Indicator","value":"noxRateMeasureFlg"},{"label":"CO2 Mass (short tons)","value":"co2Mass"},
{"label":"CO2 Mass Measure Indicator","value":"co2MassMeasureFlg"},{"label":"CO2 Rate (short tons/mmBtu)","value":"co2Rate"},{"label":"CO2 Rate Measure Indicator","value":"co2RateMeasureFlg"},
{"label":"Heat Input (mmBtu)","value":"heatInput"},{"label":"Primary Fuel Type","value":"primaryFuelInfo"},{"label":"Secondary Fuel Type","value":"secondaryFuelInfo"},
{"label":"Unit Type","value":"unitTypeInfo"},{"label":"SO2 Controls","value":"so2ControlInfo"},{"label":"PM Controls","value":"partControlInfo"},{"label":"NOx Controls","value":"noxControlInfo"},
{"label":"Hg Controls","value":"hgControlInfo"},{"label":"Program","value":"prgCodeInfo"}];

const dataPreview = [
  {
    state: 'AL',
    facilityName: 'Barry',
    orisCode: '3',
    unitId: '4',
    gLoad: '150.00',
    sLoad: null,
    so2Mass: '1617.200',
    so2Rate: '0.983',
    noxMass: '481.800',
    noxRate: '0.293',
    co2Mass: '168.700',
    co2Rate: '0.103',
    heatInput: '1644.500',
    primaryFuelInfo: 'Coal',
    secondaryFuelInfo: 'Pipeline Natural Gas',
    unitTypeInfo: 'Tangentially-fired',
    so2ControlInfo: null,
    partControlInfo: 'Electrostatic Precipitator',
    noxControlInfo:
      'Low NOx Burner Technology w/ Separated OFA,Selective Non-catalytic Reduction',
    hgControlInfo: 'Halogenated PAC Sorbent Injection',
    prgCodeInfo: 'ARP, CSNOX, CSOSG2, CSSO2G2, MATS',
    assocStacks: null,
    opDate: '2019-01-01',
    opHour: '0',
    opTime: '1.00',
    so2MassMeasureFlg: 'Measured',
    so2RateMeasureFlg: 'Calculated',
    noxMassMeasureFlg: 'Measured',
    noxRateMeasureFlg: 'Measured',
    co2MassMeasureFlg: 'Measured',
    co2RateMeasureFlg: 'Calculated',
  },
];

initialState.customDataDownload.dataType = 'EMISSIONS';
initialState.customDataDownload.dataSubType = 'Hourly Emissions';
initialState.filterCriteria = {
  timePeriod: {
    startDate: '2019-01-01',
    endDate: '2019-01-01',
    opHrsOnly: true,
  },
  program: [],
  facility: [],
  unitType: [],
  fuelType: [],
  stateTerritory: [],
  controlTechnology: [],
};
const store = configureStore(initialState);
const columns = () =>
    fieldMappings.map(el => ({
      name: el.label,
      selector: el.value,
      sortable: true
    }));

  const data = () => {
    let result = [];
    if (dataPreview !== null) {
      result = dataPreview.map((d,i)=>{
        d['id'] = i;
        return d;
      });
    }
    return result;
  };

describe('ManageDataPreview', () => {
  test('Check that the  component properly renders', () => {
    const { getByText } = render(
      <DataPreviewRender
        loading={1}
        dataPreview={dataPreview}
        columns={columns}
        data={data}
        totalCount={1}
        />
    );
    const dataPreviewHeader = getByText('Data Preview');
    expect(dataPreviewHeader).toBeDefined();
  });
});
