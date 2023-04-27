import { Comment, Reaction, User } from "@prisma/client";

export type CommentDetail = Comment & {
  user: User;
  reactions: {
    reaction: Reaction;
  }[];
};
