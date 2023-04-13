import { trpc } from "@/utils/trpc";
import { ActionIcon, Avatar, Text } from "@mantine/core";
import { modals } from "@mantine/modals";
import { notifications } from "@mantine/notifications";
import { IconCheck, IconX } from "@tabler/icons-react";

type Props = {
  id: number;
  name: string;
  imgUrl: string | null;
  mutualFriends: number;
};

const FriendWidget = ({ id, name, imgUrl, mutualFriends }: Props) => {
  const deleteFriend = trpc.friend.delete.useMutation();
  const utils = trpc.useContext();

  const openDeleteModal = () =>
    modals.openConfirmModal({
      title: "Delete your profile",
      centered: true,
      children: (
        <Text size="sm">{`Are you sure you want to unfriend ${name}?`}</Text>
      ),
      labels: { confirm: "Yes", cancel: "Cancel" },
      confirmProps: { color: "red" },
      onCancel: () => null,
      onConfirm: async () => {
        try {
          await deleteFriend.mutateAsync({ userId: id });
          notifications.show({
            message: "Action successfully",
            color: "green",
            icon: <IconCheck />,
          });
          utils.friend.friendList.refetch();
        } catch (e: any) {
          notifications.show({
            message: "Có lỗi xảy ra. Vui lòng thử lại",
            color: "red",
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
        <div className="text-gray-400 text-sm mt-1">{`${mutualFriends} bạn chung`}</div>
      </div>
      <ActionIcon
        onClick={openDeleteModal}
        color="red"
        radius="xl"
        variant="outline"
      >
        <IconX size={20} />
      </ActionIcon>
    </div>
  );
};

export default FriendWidget;
