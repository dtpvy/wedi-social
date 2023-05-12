import { FriendStatus, UserStatus } from '@prisma/client';
import { calcFriend } from '../src/utils/user';

describe('calcFriend', () => {
  it('should return the correct number of friends for a user', () => {
    const userInfo = {
      id: 1,
      name: 'John Doe',
      imgUrl: 'https://example.com/avatar.jpg',
      bgUrl: 'https://example.com/cover.jpg',
      password: 'secret',
      email: 'john.doe@example.com',
      phone: '123456789',
      bio: "Hello, I'm John Doe!",
      status: UserStatus.ACTIVE,
      languageId: 1,
      cityId: 1,
      districtId: 2,
      wardId: 3,
      countryId: 4,
      street: '123 Main St.',
      createdAt: new Date(),
      updatedAt: new Date(),
      posts: [],
      friends: [
        {
          userId: 1,
          friendId: 1,
          status: FriendStatus.ACCEPT,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 2,
          friendId: 2,
          status: FriendStatus.ACCEPT,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      userFriends: [],
      notification: [],
      receiveMessages: [],
      language: null,
      requests: [],
      joinTrip: [],
    };
    const result = calcFriend(userInfo);
    expect(result).toEqual(2);
  });

  it('should return 0 when user is null', () => {
    const user = {
      id: 1,
      name: 'John Doe',
      imgUrl: 'https://example.com/avatar.jpg',
      bgUrl: 'https://example.com/cover.jpg',
      password: 'secret',
      email: 'john.doe@example.com',
      phone: '123456789',
      bio: "Hello, I'm John Doe!",
      status: UserStatus.ACTIVE,
      languageId: 1,
      cityId: 1,
      districtId: 2,
      wardId: 3,
      countryId: 4,
      street: '123 Main St.',
      createdAt: new Date(),
      updatedAt: new Date(),
      posts: [],
      friends: [],
      userFriends: [],
      notification: [],
      receiveMessages: [],
      language: null,
      requests: [],
      joinTrip: [],
    };
    const result = calcFriend(user);
    expect(result).toEqual(0);
  });
});

it('should return 0 when user is undefined', () => {
  const user = undefined;
  const result = calcFriend(user);
  expect(result).toEqual(0);
});
