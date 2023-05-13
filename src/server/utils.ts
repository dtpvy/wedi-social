import { prisma } from './prisma';

export const getFriendList = async (userId: number) => {
  const friends = await prisma.friend.findMany({
    where: { OR: [{ userId: userId, friendId: userId }], status: 'ACCEPT' },
  });
  return friends.map((f) => (f.userId === userId ? f.friendId : f.userId));
};
