import { Avatar, Badge, Button, Textarea } from '@mantine/core';

<<<<<<< HEAD
import { Menu } from "@/components/Menu";
import { Tab } from "@/types/tab";
import {
  IconArticle,
  IconFriends,
  IconMap,
  IconMessageReport,
} from "@tabler/icons-react";
import { useRouter } from "next/router";
import { use, useContext, useMemo } from "react";
import { ProfileLayoutContext } from "@/components/Layout/ProfileLayout";
import useUserStore from "@/stores/user";
import { trpc } from "@/utils/trpc";
import { calcFriend } from "@/utils/user";
import useTranslation from "@/hooks/useTranslation"; 
=======
import { Menu } from '@/components/Menu';
import { Tab } from '@/types/tab';
import { IconArticle, IconFriends, IconMap, IconMessageReport } from '@tabler/icons-react';
import { useRouter } from 'next/router';
import { use, useContext, useMemo } from 'react';
import { ProfileLayoutContext } from '@/components/Layout/ProfileLayout';
import useUserStore from '@/stores/user';
import { trpc } from '@/utils/trpc';
import { calcFriend } from '@/utils/user';
import { CreateTrip } from '@/components/Trip';
>>>>>>> 2f8308d4a445472f12d75e18f18f1f8757f8d31f

const TAB_NAME = {
  POSTS: 'posts',
  TRIPS: 'trips',
  FRIENDS: 'friends',
  REQUESTS: 'requests',
};

const TAB_LIST: Record<string, Tab> = {
  
  [TAB_NAME.POSTS]: {
    name: 'posts',
    url: 'posts',
    icon: <IconArticle />,
  },
  [TAB_NAME.TRIPS]: {
    name: 'trips',
    url: 'trips',
    icon: <IconMap />,
  },
  [TAB_NAME.FRIENDS]: {
    name: 'friends',
    url: 'friends',
    icon: <IconFriends />,
  },
  [TAB_NAME.REQUESTS]: {
    name: 'requests',
    url: 'requests',
    icon: <IconMessageReport />,
  },
};

const TabMenu = () => {
  const router = useRouter();
  const user = useUserStore.use.user();
  const { data: profile, isOwner } = useContext(ProfileLayoutContext) || {};

  const isFriend =
    user?.friends.find((friend) => friend.friendId === profile?.id) ||
    user?.userFriends.find((friend) => friend.userId === profile?.id);

  const tab = router.asPath.split('/')[2] || TAB_LIST.POSTS.name;

  const handleChangeTab = (tab: string) => {
    router.push(`/profile/${profile?.id}/${tab}`);
  };

  const addFriend = trpc.friend.add.useMutation();
  const addNoti = trpc.notification.push.useMutation();
  const { t } = useTranslation();
  const handleAdd = async () => {
    if (!profile?.id) return;
    try {
      await addFriend.mutateAsync({ userId: profile.id });
      await addNoti.mutateAsync({
<<<<<<< HEAD
        content: 't("notifText")',
=======
        content: 'Có người muốn kết bạn với bạn',
>>>>>>> 2f8308d4a445472f12d75e18f18f1f8757f8d31f
        userId: profile.id,
        imgUrl: user?.imgUrl || '',
      });
    } catch (e) {
      console.log(e);
    }
  };

  const tabs = useMemo(() => {
    const tabs = { ...TAB_LIST };
    if (!user) return tabs;
    tabs[TAB_NAME.POSTS].badgeNumber = user.posts.length;
    tabs[TAB_NAME.TRIPS].badgeNumber = user.joinTrip.length;
    tabs[TAB_NAME.FRIENDS].badgeNumber = calcFriend(user);
    tabs[TAB_NAME.REQUESTS].badgeNumber = user.requests.length;
    return tabs;
  }, [user]);

  return (
    <>
<<<<<<< HEAD
      <div className="border-b pb-3">
        <div className="flex items-start gap-3">
          <Avatar radius="xl" className="border" />
          <Textarea
            placeholder= {t("statusText")}
            withAsterisk
            className="w-full"
          />
        </div>
        <div className="flex gap-2 mt-2">
          <Button size="md" className="flex-1" variant="outline" color="green">
            {t("createtripText")}
          </Button>
          <Button size="md" className="flex-1" variant="filled" color="green">
          {t("createpostText")}
          </Button>
        </div>
      </div>
=======
>>>>>>> 2f8308d4a445472f12d75e18f18f1f8757f8d31f
      <div className="flex flex-col gap-4 mt-4">
        <Menu
          tab={tab}
          showBadgeNumber
          items={tabs}
          onChange={(tab) => handleChangeTab(tab.url)}
          className="bg-white flex items-center text-green-600 p-4 hover:bg-green-600 hover:text-white"
          activeClass="bg-green-600 text-white"
          titleClass="text-md"
          leftIcon={TAB_LIST[tab]?.icon}
        />
      </div>

      {!isOwner && !isFriend && (
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
      {isOwner && (
        <Button
          onClick={() => handleChangeTab('edit')}
          size="md"
          className="w-full mt-5"
          variant="filled"
          color="green"
        >
          {t("editprofileText")}
        </Button>
      )}
    </>
  );
};

export default TabMenu;
