import type { UserInfo } from '@/types/user';

export const calcFriend = (user: UserInfo | undefined) => {
  if (!user) return 0;
  return user.friends.length + user.userFriends.length;
};
