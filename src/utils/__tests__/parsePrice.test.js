import { parsePrice } from 'utils/helpers/parsePrice'

describe('parsePrice', () => {
  test('should return a formatted string for a price with decimals', () => {
    const price = 1234.56;

    const result = parsePrice(price);

    expect(result).toEqual('1,234.56');
  });

  test('should handle negative prices', () => {
    const price = -567.89;

    const result = parsePrice(price);

    expect(result).toEqual('-567.89');
  });
});
