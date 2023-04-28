import { Friend, Language, Message, Notification, Post, User } from '@prisma/client';

export type UserInfo = User & {
  posts: Post[];
  friends: Friend[];
  userFriends: Friend[];
  notification: Notification[];
  receiveMessages: Message[];
  language: Language | null;
};
