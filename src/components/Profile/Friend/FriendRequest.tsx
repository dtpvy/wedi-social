import { trpc } from "@/utils/trpc";
import { Drawer, Loader } from "@mantine/core";
import Request from "./Request";
import useTranslation from "@/hooks/useTranslation"; 

type Props = {
  opened?: boolean;
  onClose: () => void;
  owner: boolean;
};

const FriendRequest = ({ opened = false, owner, onClose }: Props) => {
  const { data, isLoading } = trpc.friend.requestList.useQuery({
    owner,
  });
  const { t } = useTranslation();

  return (
    <Drawer
      position="right"
      opened={opened}
      onClose={onClose}
      title= {t("friendrequestText")}
    >
      {isLoading && <Loader />}
      {data?.map((request) => (
        <Request
          key={`${request.userId}_${request.friendId}`}
          status={request.status}
          user={owner ? request.user : request.friend}
          friendId={request.friendId}
        />
      ))}
    </Drawer>
  );
};

export default FriendRequest;
