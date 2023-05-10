import useTranslation from '@/hooks/useTranslation';
import useAppStore from '@/stores/store';
import { trpc } from '@/utils/trpc';
import { Avatar, Button } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { FriendStatus, User } from '@prisma/client';
import { IconCheck, IconX } from '@tabler/icons-react';

type Props = {
  user: User;
  friendId: number;
  status: FriendStatus;
};

const Request = ({ user, status, friendId }: Props) => {
  const _user = useAppStore.use.user();
  const utils = trpc.useContext();
  const addNoti = trpc.notification.push.useMutation();
  const reject = trpc.friend.reject.useMutation();
  const accept = trpc.friend.accept.useMutation();
  const userId = user.id;
  const { t } = useTranslation();
  const handleReject = async () => {
    try {
      await reject.mutateAsync({ userId, friendId });
      notifications.show({
        message: t('addsuccessText'),
        color: 'green',
        icon: <IconCheck />,
      });
      utils.friend.friendList.refetch();
      utils.friend.requestList.refetch();
    } catch (e: any) {
      notifications.show({
        message: t('addfailedText'),
        color: 'red',
        icon: <IconX />,
      });
    }
  };

  const handleAccept = async () => {
    try {
      await accept.mutateAsync({ userId, friendId });
      await addNoti.mutateAsync({
        content: String(t('acceptedfriendText')),
        userId,
        imgUrl: user.imgUrl || '',
      });
      notifications.show({
        message: t('addsuccessText'),
        color: 'green',
        icon: <IconCheck />,
      });
      utils.friend.friendList.refetch();
      utils.friend.requestList.refetch();
    } catch (e: any) {
      console.log(e);
      notifications.show({
        message: t('errorTryAgainText'),
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
      {friendId === _user?.id && (
        <>
          <Button onClick={handleAccept} variant="outline" color="green">
            {t('acceptText')}
          </Button>
          <Button onClick={handleReject} color="green">
            {t('rejectText')}
          </Button>
        </>
      )}
    </div>
  );
};

export default Request;
