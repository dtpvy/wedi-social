import { Friend, Notification, Post, User } from "@prisma/client";

export type UserInfo = User & {
  posts: Post[];
  friends: Friend[];
  notification: Notification[];
};
