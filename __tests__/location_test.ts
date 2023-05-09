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
  it('should handle input with HTML entities', () => {
    const input = 'This is an &lt;b&gt;example&lt;/b&gt;';
    const expectedOutput = 'This is an example';
    expect(getName(input)).toEqual(expectedOutput);
  });
  it('should remove all HTML tags from the input', () => {
    const input = 'This is a <b>bold</b> statement';
    const expectedOutput = 'This is a bold statement';
    expect(getName(input)).toEqual(expectedOutput);
  });
  it('should handle input with multiple HTML tags', () => {
    const input = '<h1>Hello</h1><p>This is a paragraph</p><a href="#">Click me</a>';
    const expectedOutput = 'HelloThis is a paragraphClick me';
    expect(getName(input)).toEqual(expectedOutput);
  });
});