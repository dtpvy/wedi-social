import { sum } from '@/utils/demo';

describe('sum', () => {
  it('should return right result', () => {
    expect(sum(1, 2)).toBe(3);
    expect(sum(1, 4)).toBe(5);
  });
});
