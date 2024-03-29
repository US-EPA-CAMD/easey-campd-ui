import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { cloneDeep } from 'lodash';

import configureStore from '../../../store/configureStore.dev';
import initialState from '../../../store/reducers/initialState';
import DataPreviewRender from './DataPreviewRender';

const {queryByLabelText, debug} = screen;
const fieldMappings = [{"label":"State","value":"stateCode"},{"label":"Facility Name","value":"facilityName"},{"label":"Facility ID","value":"facilityId"},
{"label":"Unit ID","value":"unitId"},{"label":"Associated Stacks","value":"assocStacks"},{"label":"Date","value":"opDate"},{"label":"Hour","value":"opHour"},
{"label":"Operating Time","value":"opTime"},{"label":"Gross Load (MW)","value":"gLoad"},{"label":"Steam Load (1000 lb/hr)","value":"sLoad"},
{"label":"SO2 Mass (lbs)","value":"so2Mass"},{"label":"SO2 Mass Measure Indicator","value":"so2MassMeasureFlg"},{"label":"SO2 Rate (lbs/mmBtu)","value":"so2Rate"},
{"label":"SO2 Rate Measure Indicator","value":"so2RateMeasureFlg"},{"label":"NOx Mass (lbs)","value":"noxMass"},{"label":"NOx Mass Measure Indicator","value":"noxMassMeasureFlg"},
{"label":"NOx Rate (lbs/mmBtu)","value":"noxRate"},{"label":"NOx Rate Measure Indicator","value":"noxRateMeasureFlg"},{"label":"CO2 Mass (short tons)","value":"co2Mass"},
{"label":"CO2 Mass Measure Indicator","value":"co2MassMeasureFlg"},{"label":"CO2 Rate (short tons/mmBtu)","value":"co2Rate"},{"label":"CO2 Rate Measure Indicator","value":"co2RateMeasureFlg"},
{"label":"Heat Input (mmBtu)","value":"heatInput"},{"label":"Primary Fuel Type","value":"primaryFuelInfo"},{"label":"Secondary Fuel Type","value":"secondaryFuelInfo"},
{"label":"Unit Type","value":"unitTypeInfo"},{"label":"SO2 Controls","value":"so2ControlInfo"},{"label":"PM Controls","value":"partControlInfo"},{"label":"NOx Controls","value":"noxControlInfo"},
{"label":"Hg Controls","value":"hgControlInfo"},{"label":"Program","value":"prgCodeInfo"}];
const initStateCopy = cloneDeep(initialState)

const dataPreview = [
  {
    stateCode: 'AL',
    facilityName: 'Barry',
    facilityId: '3',
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

initStateCopy.customDataDownload.dataType = 'EMISSIONS';
initStateCopy.customDataDownload.dataSubType = 'Hourly Emissions';
initStateCopy.filterCriteria = {
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
const store = configureStore(initStateCopy);
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
  const fullDataPreview = new Array(100001).fill(dataPreview[0])
  const fullData = (() =>
    fullDataPreview.map((d, i) => {
      d['id'] = i;
      return d;
    }))();
describe('ManageDataPreview', () => {
  test('Check that the  component properly renders', () => {
    const { getByRole, container } = render(
      <Provider 
        store={store}>
        <DataPreviewRender
          loading={1}
          dataPreview={dataPreview}
          columns={columns()}
          data={data()}
          totalCount={1}
          setSpinnerActive={jest.fn()}
          setApiError={jest.fn()}
          />
        </Provider>
    );

    const spinner = container.querySelector('#spinner');
    expect(spinner).toBeInTheDocument();
  });

  test('displays table when loading is complete and there is data to preview', () => {
    const { getByText } = render(
      <Provider 
        store={store}>
        <DataPreviewRender
          loading={0}
          dataPreview={dataPreview}
          columns={columns()}
          data={data()}
          totalCount={1}
          setSpinnerActive={jest.fn()}
          setApiError={jest.fn()}
          />
        </Provider>
    );
    const preview = getByText(/(Viewing the first 1 records of 1)/i)
    expect(preview).toBeInTheDocument()
  })

  test('displays no table if there is data to preview', () => {
    const { getByText } = render(
      <Provider 
        store={store}>
        <DataPreviewRender
          loading={0}
          dataPreview={[]}
          columns={columns()}
          data={[]}
          totalCount={1}
          setSpinnerActive={jest.fn()}
          setApiError={jest.fn()}
          />
        </Provider>
    );
    const noDataAlert = getByText(/No results match that search criteria. Please change the criteria and try again./i)
    expect(noDataAlert).toBeInTheDocument()
  })

  describe('ensure 508', () => {
    test('table should be labelled', () => {
      const { container } = render(
        <Provider 
          store={store}>
          <DataPreviewRender
            loading={0}
            dataPreview={dataPreview}
            columns={columns()}
            data={data()}
            totalCount={1}
            setSpinnerActive={jest.fn()}
            setApiError={jest.fn()}
            />
          </Provider>
      );
      // const table = container.querySelector('.rdt_Table')
      // const tableTitle = container.querySelector('.data-display-table')
      // console.log(table);
      // console.log(tableTitle);
      // debug()
      // const table2 = queryByLabelText('data-table-title')
    })
  })
});
