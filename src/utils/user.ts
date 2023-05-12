import type { UserInfo } from '@/types/user';

export const calcFriend = (user: UserInfo | undefined) => {
  if (!user) return 0;
  return user.friends.length + user.userFriends.length;
};

export const makeid = (length: number) => {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
};
