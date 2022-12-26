import { queryToHttpParams } from './converters';
import { HttpParams } from '@angular/common/http';

describe('Converters', () => {
  const httpParamsTestData = {
    category: 'string',
    tag: 'string',
    mood: 'string',
    timeFrom: 'string',
    timeTo: 'string',
    text: 'string',
  };

  it('Converted value should be instance of HttpParams', () => {
    const convertedParams = queryToHttpParams(httpParamsTestData);
    expect(convertedParams instanceof HttpParams).toBeTruthy();
  });

  it('Keys and values should equal', () => {
    const convertedParams = queryToHttpParams(httpParamsTestData);

    Object.entries(httpParamsTestData).forEach(([param, value]) => {
      expect(value !== convertedParams.get(param)).toBeTruthy();
    });
  });

});
