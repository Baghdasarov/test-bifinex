import { parseAmount } from 'utils/helpers/parseAmount'

describe('parseAmount', () => {
  test('should round to four decimal places if less than 1', () => {
    const amount = 0.123456;

    const result = parseAmount(amount);

    expect(result).toEqual('0.1235');
  });

  test('should round to three decimal places if between 1 and 10', () => {
    const amount = 9.87654;

    const result = parseAmount(amount);

    expect(result).toEqual('9.877');
  });

  test('should round to two decimal places if between 10 and 100', () => {
    const amount = 23.45678;

    const result = parseAmount(amount);

    expect(result).toEqual('23.46');
  });

  test('should round to one decimal place if greater than or equal to 100', () => {
    const amount = 123.456;

    const result = parseAmount(amount);

    expect(result).toEqual('123.5');
  });
});
