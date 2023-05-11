import type { Comment, Reaction, User } from '@prisma/client';

export type CommentReaction = Reaction & {
  count: number;
};

export type CommentDetail = Comment & {
  user: User;
  reactions: { reaction: Reaction }[];
  _count: {
    reactions: number;
  };
  reaction: CommentReaction[];
};
