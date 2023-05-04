<<<<<<< HEAD
import { trpc } from "@/utils/trpc";
import { ActionIcon, Avatar, Text } from "@mantine/core";
import { modals } from "@mantine/modals";
import { notifications } from "@mantine/notifications";
import { IconCheck, IconX } from "@tabler/icons-react";
import useTranslation from "@/hooks/useTranslation"; 
=======
import { trpc } from '@/utils/trpc';
import { ActionIcon, Avatar, Text } from '@mantine/core';
import { modals } from '@mantine/modals';
import { notifications } from '@mantine/notifications';
import { IconCheck, IconX } from '@tabler/icons-react';

>>>>>>> 2f8308d4a445472f12d75e18f18f1f8757f8d31f
type Props = {
  id: number;
  name: string;
  imgUrl: string | null;
  mutualFriends: number;
};

const FriendWidget = ({ id, name, imgUrl, mutualFriends }: Props) => {
  const deleteFriend = trpc.friend.delete.useMutation();
  const utils = trpc.useContext();
  const { t } = useTranslation();

  const openDeleteModal = () =>
    modals.openConfirmModal({
<<<<<<< HEAD
      title: t("titleDeleteFriendText"),
      centered: true,
      children: <Text size="sm">{t("deleteFriendText")}</Text>,
      labels: { confirm: t("yesText"), cancel: t("cancelText") },
      confirmProps: { color: "red" },
=======
      title: 'Delete your profile',
      centered: true,
      children: <Text size="sm">{`Are you sure unfriend ${name}?`}</Text>,
      labels: { confirm: 'Yes', cancel: 'Cancel' },
      confirmProps: { color: 'red' },
>>>>>>> 2f8308d4a445472f12d75e18f18f1f8757f8d31f
      onCancel: () => null,
      onConfirm: async () => {
        try {
          await deleteFriend.mutateAsync({ userId: id });
          notifications.show({
<<<<<<< HEAD
            message: t("addsuccessText"),
            color: "green",
=======
            message: 'Action successfully',
            color: 'green',
>>>>>>> 2f8308d4a445472f12d75e18f18f1f8757f8d31f
            icon: <IconCheck />,
          });
          utils.friend.friendList.refetch();
        } catch (e: any) {
          notifications.show({
<<<<<<< HEAD
            message: t("addfailedText"),
            color: "red",
=======
            message: 'Có lỗi xảy ra. Vui lòng thử lại',
            color: 'red',
>>>>>>> 2f8308d4a445472f12d75e18f18f1f8757f8d31f
            icon: <IconX />,
          });
        }
      },
    });

  return (
    <div className="flex gap-4 bg-white rounded-lg shadow p-4 items-center">
      <Avatar src={imgUrl} size="lg" />
      <div className="mr-auto">
        <Text weight={500} lineClamp={2} size="md">
          {name}
        </Text>
        <div className="text-gray-400 text-sm mt-1">{t("mutualfriendText")}</div>
      </div>
      <ActionIcon onClick={openDeleteModal} color="red" radius="xl" variant="outline">
        <IconX size={20} />
      </ActionIcon>
    </div>
  );
};

export default FriendWidget;
