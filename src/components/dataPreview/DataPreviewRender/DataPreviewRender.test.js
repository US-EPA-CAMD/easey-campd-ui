import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';

import configureStore from '../../../store/configureStore.dev';
import initialState from '../../../store/reducers/initialState';
import DataPreviewRender from './DataPreviewRender';
import { getHourlyEmissionsTableRecords } from '../../../utils/selectors/emissions';

const columns = [
  {
    Header: 'State',
    accessor: 'col1',
  },
  {
    Header: 'Facility Name',
    accessor: 'col2',
  },
  {
    Header: 'Facility ID',
    accessor: 'col3',
  },
  {
    Header: 'Unit ID',
    accessor: 'col4',
  },
  {
    Header: 'Associated Stacks',
    accessor: 'col5',
  },
  {
    Header: 'Date',
    accessor: 'col6',
  },
  {
    Header: 'Hour',
    accessor: 'col7',
  },
  {
    Header: 'Operating Time',
    accessor: 'col8',
  },
  {
    Header: 'Gross Load (MW)',
    accessor: 'col9',
  },
  {
    Header: 'Steam Load (1000 lb/hr)',
    accessor: 'col10',
  },
  {
    Header: 'SO2 Mass (lbs)',
    accessor: 'col11',
  },
  {
    Header: 'SO2 Mass Measure Indicator',
    accessor: 'col12',
  },
  {
    Header: 'SO2 Rate (lbs/mmBtu)',
    accessor: 'col13',
  },
  {
    Header: 'SO2 Rate Measure Indicator',
    accessor: 'col14',
  },
  {
    Header: 'NOx Mass (lbs)',
    accessor: 'col15',
  },
  {
    Header: 'NOx Mass Measure Indicator',
    accessor: 'col16',
  },
  {
    Header: 'NOx Rate (lbs/mmBtu)',
    accessor: 'col17',
  },
  {
    Header: 'NOx Rate Measure Indicator',
    accessor: 'col18',
  },
  {
    Header: 'CO2 Mass (short tons)',
    accessor: 'col19',
  },
  {
    Header: 'CO2 Mass Measure Indicator',
    accessor: 'col20',
  },
  {
    Header: 'CO2 Rate (short tons/mmBtu)',
    accessor: 'col21',
  },
  {
    Header: 'CO2 Rate Measure Indicator ',
    accessor: 'col22',
  },
  {
    Header: 'Heat Input (mmBtu)',
    accessor: 'col23',
  },
  {
    Header: 'Primary Fuel Type',
    accessor: 'col24',
  },
  {
    Header: 'Secondary Fuel Type',
    accessor: 'col25',
  },
  {
    Header: 'Unit Type',
    accessor: 'col26',
  },
  {
    Header: 'SO2 Controls',
    accessor: 'col27',
  },
  {
    Header: 'PM Controls',
    accessor: 'col28',
  },
  {
    Header: 'NOx Controls',
    accessor: 'col29',
  },
  {
    Header: 'Hg Controls',
    accessor: 'col30',
  },
  {
    Header: 'Program',
    accessor: 'col31',
  },
];

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

describe('ManageDataPreview', () => {
  test('Check that the  component properly renders', () => {
    const { getByText } = render(
      <Provider store={store}>
        <DataPreviewRender
          loading={0}
          dataPreview={dataPreview}
          columns={columns}
          data={getHourlyEmissionsTableRecords(dataPreview)}
          totalCount={1}
        />
      </Provider>
    );
    const dataPreviewHeader = getByText('Data Preview');
    expect(dataPreviewHeader).toBeDefined();
  });
});
