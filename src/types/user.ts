import {
  Friend,
  JoinTrip,
  Language,
  Message,
  Notification,
  Post,
  Request,
  User,
} from '@prisma/client';

export type UserInfo = User & {
  posts: Post[];
  friends: Friend[];
  userFriends: Friend[];
  notification: Notification[];
  receiveMessages: Message[];
  language: Language | null;
  requests: Request[];
  joinTrip: JoinTrip[];
};
