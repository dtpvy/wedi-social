import { JoinTrip, Post, Trip } from '@prisma/client';

export type TripDetail = Trip & {
  posts: Post[];
  users: JoinTrip[];
};
