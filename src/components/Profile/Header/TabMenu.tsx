import { Avatar, Badge, Button, Textarea } from "@mantine/core";

import { Menu } from "@/components/Menu";
import { Tab } from "@/types/tab";
import {
  IconArticle,
  IconFriends,
  IconMap,
  IconMessageReport,
} from "@tabler/icons-react";
import { useRouter } from "next/router";
import { useContext } from "react";
import { ProfileLayoutContext } from "@/components/Layout/ProfileLayout";
import useUserStore from "@/stores/user";
import { trpc } from "@/utils/trpc";

const TAB_LIST: Record<string, Tab> = {
  POSTS: {
    name: "posts",
    url: "posts",
    icon: <IconArticle />,
  },
  TRIPS: {
    name: "trips",
    url: "trips",
    icon: <IconMap />,
  },
  FRIENDS: {
    name: "friends",
    url: "friends",
    icon: <IconFriends />,
  },
  REQUEST: {
    name: "requests",
    url: "requests",
    icon: <IconMessageReport />,
  },
};

const TabMenu = () => {
  const router = useRouter();
  const user = useUserStore.use.user();
  const profile = useContext(ProfileLayoutContext);

  const tab = router.asPath.split("/")[2] || TAB_LIST.POSTS.name;

  const handleChangeTab = (tab: Tab) => {
    router.push(`/profile/${profile?.id}/${tab.url}`);
  };

  const addFriend = trpc.friend.add.useMutation();
  const addNoti = trpc.notification.push.useMutation();

  const handleAdd = async () => {
    if (!profile?.id) return;
    try {
      await addFriend.mutateAsync({ userId: profile.id });
      await addNoti.mutateAsync({
        content: "Có người muốn kết bạn với bạn",
        userId: profile.id,
      });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <div className="border-b pb-3">
        <div className="flex items-start gap-3">
          <Avatar radius="xl" className="border" />
          <Textarea
            placeholder="What do you think?"
            withAsterisk
            className="w-full"
          />
        </div>
        <div className="flex gap-2 mt-2">
          <Button size="md" className="flex-1" variant="outline" color="green">
            Create Trip
          </Button>
          <Button size="md" className="flex-1" variant="filled" color="green">
            Create Post
          </Button>
        </div>
      </div>
      <div className="flex flex-col gap-4 mt-4">
        <Menu
          tab={tab}
          items={TAB_LIST}
          onChange={handleChangeTab}
          className="bg-white flex items-center text-green-600 p-4 hover:bg-green-600 hover:text-white"
          activeClass="bg-green-600 text-white"
          titleClass="text-md"
          rightIcon={<Badge color="green">{10}</Badge>}
          leftIcon={TAB_LIST[tab]?.icon}
        />
      </div>

      {user?.id !== profile?.id && (
        <Button
          onClick={handleAdd}
          size="md"
          className="w-full mt-5"
          variant="filled"
          color="green"
        >
          Add Friend
        </Button>
      )}
    </>
  );
};

export default TabMenu;
