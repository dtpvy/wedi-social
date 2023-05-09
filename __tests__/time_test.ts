import { getTimePost } from '../src/utils/time';
import dayjs from 'dayjs';


describe('getTimePost', () => {
    test('returns correct result for post created less than a month ago', () => {
      const postCreatedAt = dayjs().subtract(1, 'day').toDate();
      const expected = dayjs(postCreatedAt).fromNow();
      const result = getTimePost(postCreatedAt);
      expect(result).toEqual(expected);
    });
  
    test('returns correct result for post created more than a month ago', () => {
      const postCreatedAt = dayjs().subtract(2, 'month').toDate();
      const expected = dayjs(postCreatedAt).format('DD/MM/YYYY');
      const result = getTimePost(postCreatedAt);
      expect(result).toEqual(expected);
    });
  });