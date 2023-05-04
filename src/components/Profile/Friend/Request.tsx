import useUserStore from '@/stores/user';
import { trpc } from '@/utils/trpc';
import { Avatar, Button } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { FriendStatus, User } from '@prisma/client';
import { IconCheck, IconX } from '@tabler/icons-react';

import useTranslation from "@/hooks/useTranslation"; 
type Props = {
  user: User;
  friendId: number;
  status: FriendStatus;
};

const Request = ({ user, status, friendId }: Props) => {
  const _user = useUserStore.use.user();
  const utils = trpc.useContext();
  const addNoti = trpc.notification.push.useMutation();
  const reject = trpc.friend.reject.useMutation();
  const accept = trpc.friend.accept.useMutation();
  const userId = user.id;

  const handleReject = async () => {
    try {
      await reject.mutateAsync({ userId, friendId });
      notifications.show({
<<<<<<< HEAD
        message: t("addsuccessText"),
        color: "green",
=======
        message: `Action successfully`,
        color: 'green',
>>>>>>> 2f8308d4a445472f12d75e18f18f1f8757f8d31f
        icon: <IconCheck />,
      });
      utils.friend.friendList.refetch();
      utils.friend.requestList.refetch();
    } catch (e: any) {
      notifications.show({
<<<<<<< HEAD
        message: t("errorText"),
        color: "red",
=======
        message: 'Có lỗi xảy ra. Vui lòng thử lại',
        color: 'red',
>>>>>>> 2f8308d4a445472f12d75e18f18f1f8757f8d31f
        icon: <IconX />,
      });
    }
  };

  const handleAccept = async () => {
    try {
      
      await accept.mutateAsync({ userId, friendId });
      await addNoti.mutateAsync({
<<<<<<< HEAD
        content: String(t("addsuccessText")),
=======
        content: 'Lời mời kết bạn của bạn đã được chấp nhận',
>>>>>>> 2f8308d4a445472f12d75e18f18f1f8757f8d31f
        userId,
        imgUrl: user.imgUrl || '',
      });
      notifications.show({
<<<<<<< HEAD
        message: t("addsuccessText"),
        color: "green",
=======
        message: `Action successfully`,
        color: 'green',
>>>>>>> 2f8308d4a445472f12d75e18f18f1f8757f8d31f
        icon: <IconCheck />,
      });
      utils.friend.friendList.refetch();
      utils.friend.requestList.refetch();
    } catch (e: any) {
      console.log(e);
      notifications.show({
<<<<<<< HEAD
        message: t("errorText"),
        color: "red",
=======
        message: 'Có lỗi xảy ra. Vui lòng thử lại',
        color: 'red',
>>>>>>> 2f8308d4a445472f12d75e18f18f1f8757f8d31f
        icon: <IconX />,
      });
    }
  };
  const { t } = useTranslation();
  return (
    <div className="flex gap-2 items-center border-t p-2">
      <Avatar radius="xl" src={user.imgUrl} />
      <div className="mr-auto">
        <div className="font-bold">{user.name}</div>
        <div className="text-sm text-gray-600">{status}</div>
      </div>
      {friendId === _user?.id && (
        <>
          <Button onClick={handleAccept} variant="outline" color="green">
            {t("acceptText")}
          </Button>
          <Button onClick={handleReject} color="green">
            {t("rejectText")}
          </Button>
        </>
      )}
    </div>
  );
};

export default Request;
