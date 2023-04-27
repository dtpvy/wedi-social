import { Location, Post, Review, User } from "@prisma/client";

export type PostDetail = Post & {
  creator: User;
  reviews: Review[];
  locations: {
    location: Location;
  }[];
  _count: {
    comments: number;
    reactions: number;
  };
};
