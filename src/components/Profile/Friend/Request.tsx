import { trpc } from '@/utils/trpc';
import { Avatar, Button } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { FriendStatus, User } from '@prisma/client';
import { IconCheck, IconX } from '@tabler/icons-react';
import { useSession } from 'next-auth/react';
import React from 'react';

type Props = {
  user: User;
  friendId: number;
  status: FriendStatus;
};

const Request = ({ user, status, friendId }: Props) => {
  const { data: session } = useSession();
  const utils = trpc.useContext();
  const addNoti = trpc.notification.push.useMutation();
  const reject = trpc.friend.reject.useMutation();
  const accept = trpc.friend.accept.useMutation();
  const userId = user.id;

  const handleReject = async () => {
    try {
      await reject.mutateAsync({ userId, friendId });
      notifications.show({
        message: `Action successfully`,
        color: 'green',
        icon: <IconCheck />,
      });
      utils.friend.friendList.refetch();
      utils.friend.requestList.refetch();
    } catch (e: any) {
      notifications.show({
        message: 'Có lỗi xảy ra. Vui lòng thử lại',
        color: 'red',
        icon: <IconX />,
      });
    }
  };

  const handleAccept = async () => {
    try {
      await accept.mutateAsync({ userId, friendId });
      await addNoti.mutateAsync({
        content: 'Lời mời kết bạn của bạn đã được chấp nhận',
        userId,
        imgUrl: user.imgUrl || '',
      });
      notifications.show({
        message: `Action successfully`,
        color: 'green',
        icon: <IconCheck />,
      });
      utils.friend.friendList.refetch();
      utils.friend.requestList.refetch();
    } catch (e: any) {
      console.log(e);
      notifications.show({
        message: 'Có lỗi xảy ra. Vui lòng thử lại',
        color: 'red',
        icon: <IconX />,
      });
    }
  };

  return (
    <div className="flex gap-2 items-center border-t p-2">
      <Avatar radius="xl" src={user.imgUrl} />
      <div className="mr-auto">
        <div className="font-bold">{user.name}</div>
        <div className="text-sm text-gray-600">{status}</div>
      </div>
      {friendId === session?.user.id && (
        <>
          <Button onClick={handleAccept} variant="outline" color="green">
            Accept
          </Button>
          <Button onClick={handleReject} color="green">
            Reject
          </Button>
        </>
      )}
    </div>
  );
};

export default Request;
