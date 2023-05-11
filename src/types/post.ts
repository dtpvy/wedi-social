import type { Location, Post, Reaction, Review, Trip, User } from '@prisma/client';

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

export type PostTrip = PostDetail & {
  trip?: Trip | null;
};
