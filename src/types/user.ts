import { Friend, Post, User } from "@prisma/client";

export type UserDetail = User & {
  posts: Post[];
  friends: Friend[];
};
