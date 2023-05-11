import type { Location, Post, Review, User } from '@prisma/client';

export type ReviewDetail = Review & {
  user: User;
  post: Post;
};

export type LocationDetail = Location & {
  rating?: number;
  reviews?: ReviewDetail[];
};
