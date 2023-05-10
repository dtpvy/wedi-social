import { getTimePost } from '../src/utils/time';


describe("getTimePost", () => {
    it("returns post time ago if less than a month", () => {
      const now = new Date();
      const postCreatedAt = new Date(now.getTime() - 1000 * 60 * 60 * 24);
      const expected = "a day ago";
      const result = getTimePost(postCreatedAt);
      expect(result).toEqual(expected);
    });
  
    it("returns formatted date if more than a month", () => {
      const now = new Date();
      const postCreatedAt = new Date(now.getTime() - 1000 * 60 * 60 * 24 * 31);
      const expected = postCreatedAt.getDate().toString().padStart(2, '0') + "/" + (postCreatedAt.getMonth() + 1).toString().padStart(2, '0') + "/" + postCreatedAt.getFullYear();
      const result = getTimePost(postCreatedAt);
      expect(result).toEqual(expected);
    });
  });