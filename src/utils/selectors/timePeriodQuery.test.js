import { constructTimePeriodQuery } from './timePeriodQuery';

let emissionsFilterCriteria = {
  timePeriod: {
    startDate: '2019-01-01',
    endDate: '2019-01-01',
    opHrsOnly: true,
    year: {
      yearArray: [1995, 2000],
      yearString: '1995|2000',
    },
    month: [
      { id: '1', label: '1', selected: true },
      { id: '2', label: '2', selected: true },
    ],
    quarter: [
      { id: '1', label: '1', selected: true },
      { id: '2', label: '2', selected: true },
    ],
  },
};

let accountComplianceFilterCriteria = {
  timePeriod: {
    startDate: '2019-01-01',
    endDate: '2019-01-01',
    comboBoxYear: [
      { id: '1995', label: '1995', selected: true, enabled: true },
      { id: '2000', label: '2000', selected: true, enabled: true },
    ],
  },
};

describe('constructTimePeriodQuery()', () => {
  it('should construct the proper query for hourly emissions', () => {
    const query = constructTimePeriodQuery(
      'hourly emissions',
      emissionsFilterCriteria
    );
    expect(query).toEqual(
      '&beginDate=2019-01-01&endDate=2019-01-01&operatingHoursOnly=true'
    );
  });

  it('should construct the proper query for daily emissions', () => {
    const query = constructTimePeriodQuery(
      'daily emissions',
      emissionsFilterCriteria
    );
    expect(query).toEqual('&beginDate=2019-01-01&endDate=2019-01-01');
  });

  it('should construct the proper query for monthly emissions', () => {
    const query = constructTimePeriodQuery(
      'monthly emissions',
      emissionsFilterCriteria
    );
    expect(query).toEqual('&year=1995|2000&month=1|2');
  });

  it('should construct the proper query for quarterly emissions', () => {
    const query = constructTimePeriodQuery(
      'quarterly emissions',
      emissionsFilterCriteria
    );
    expect(query).toEqual('&year=1995|2000&quarter=1|2');
  });

  it('should construct the proper query for ozone emissions', () => {
    const query = constructTimePeriodQuery(
      'ozone season emissions',
      emissionsFilterCriteria
    );
    expect(query).toEqual('&year=1995|2000');
  });

  it('should construct the proper query for annual emissions', () => {
    const query = constructTimePeriodQuery(
      'annual emissions',
      emissionsFilterCriteria
    );
    expect(query).toEqual('&year=1995|2000');
  });

  it('should construct the proper query for facility/unit attributes', () => {
    const query = constructTimePeriodQuery(
      'facility/unit attributes',
      emissionsFilterCriteria
    );
    expect(query).toEqual('&year=1995|2000');
  });

  it('should construct the proper query for holdings', () => {
    const query = constructTimePeriodQuery(
      'holdings',
      accountComplianceFilterCriteria
    );
    expect(query).toEqual('&vintageYear=1995|2000');
  });

  it('should construct the proper query for transactions', () => {
    const query = constructTimePeriodQuery(
      'transactions',
      accountComplianceFilterCriteria
    );
    expect(query).toEqual(
      '&transactionBeginDate=2019-01-01&transactionEndDate=2019-01-01&vintageYear=1995|2000'
    );
  });

  it('should construct the proper query for allowance based', () => {
    const query = constructTimePeriodQuery(
      'allowance based',
      accountComplianceFilterCriteria
    );
    expect(query).toEqual('&year=1995|2000');
  });

  it('should construct the proper query for emissions based', () => {
    const query = constructTimePeriodQuery(
      'emissions based',
      accountComplianceFilterCriteria
    );
    expect(query).toEqual('&year=1995|2000');
  });

  it('should return an empty string', () => {
    const query = constructTimePeriodQuery('', null);
    expect(query).toEqual('');
  });
});
