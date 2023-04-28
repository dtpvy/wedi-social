import { Location, Post, Reaction, Review, User } from '@prisma/client';

export type PostReaction = Reaction & {
  count: number;
};

export type PostDetail = Post & {
  creator: User;
  reviews: Review[];
  reactions: { reaction: Reaction }[];
  locations: {
    location: Location;
  }[];
  _count: {
    comments: number;
    reactions: number;
  };
  reaction: PostReaction[];
};
