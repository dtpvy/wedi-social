import {Location} from '../node_modules/.pnpm/@prisma+client@4.12.0_prisma@4.12.0/node_modules/.prisma/client/index'
import {Review} from '../node_modules/.pnpm/@prisma+client@4.12.0_prisma@4.12.0/node_modules/.prisma/client/index'
import {LocationDetail} from '../src/types/location'
import {getName} from '../src/utils/location'


  
describe('getName', () => {
  it('should extract name from encoded HTML string', () => {
    const title = '&lt;h1&gt;Hello, world!&lt;/h1&gt;';
    const expected = 'Hello, world!';
    const result = getName(title);
    expect(result).toEqual(expected);
  });

  it('should return an empty string when input is an empty string', () => {
    const title = '';
    const expected = '';
    const result = getName(title);
    expect(result).toEqual(expected);
  });

  it('should return input string when it contains no HTML tags', () => {
    const title = 'Hello, world!';
    const expected = 'Hello, world!';
    const result = getName(title);
    expect(result).toEqual(expected);
  });
});