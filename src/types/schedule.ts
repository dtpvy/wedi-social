import type { JoinSchedule, Schedule, Trip, User } from '@prisma/client';
import type { LocationDetail } from './location';

export type ScheduleDetail = Schedule & {
  location: LocationDetail;
  creator: User;
  trip?: Trip;
  joinSchedule: (JoinSchedule & {
    user: User;
  })[];
};
