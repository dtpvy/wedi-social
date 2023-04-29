import { JoinTrip, Post, Trip, User } from '@prisma/client';

export type TripDetail = Trip & {
  posts: Post[];
  users: JoinTrip[];
};

export type TripInfo = Trip & {
  users: (JoinTrip & {
    user: User;
  })[];
  _count: {
    posts: number;
    schedules: number;
  };
};
