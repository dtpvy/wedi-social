import { UserInfo } from "@/types/user";

export const calcFriend = (user: UserInfo) => {
  return user.friends.length + user.userFriends.length;
};
