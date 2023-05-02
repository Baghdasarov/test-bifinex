import { calculateTotal } from 'utils/helpers/calculateTotal'

describe('calculateTotal', () => {
  test('should return an array with total property added to each object', () => {
    const book = [
      { price: 291, amount: 10 },
      { price: 292, amount: 12 },
      { price: 295, amount: 15 }
    ];

    const result = calculateTotal(book);

    expect(result).toEqual([
      { price: 291, amount: 10, total: 10 },
      { price: 292, amount: 12, total: 22 },
      { price: 295, amount: 15, total: 37 }
    ]);
  });

  test('should return an empty array if input is empty', () => {
    const book = [];

    const result = calculateTotal(book);

    expect(result).toEqual([]);
  });

  test('should handle negative amounts', () => {
    const book = [
      { price: 291, amount: -10 },
      { price: 292, amount: -5 },
      { price: 293, amount: -15 }
    ];

    const result = calculateTotal(book);

    expect(result).toEqual([
      { price: 291, amount: -10, total: 10 },
      { price: 292, amount: -5, total: 15 },
      { price: 293, amount: -15, total: 30 }
    ]);
  });
});
