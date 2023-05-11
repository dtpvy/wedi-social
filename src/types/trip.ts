import type { JoinTrip, Post, PostLocation, Schedule, Trip, User } from '@prisma/client';

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

export type TripSearch = Trip & {
  posts: Post[];
  schedules: Schedule[];
  _count: {
    posts: number;
    schedules: number;
  };
  creator: User;
  users: JoinTrip[];
};
