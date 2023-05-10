import { Button } from '@mantine/core';

import { Menu } from '@/components/Menu';
import useTranslation from '@/hooks/useTranslation';
import { default as useAppStore, default as useProfileStore } from '@/stores/store';
import { Tab } from '@/types/tab';
import { trpc } from '@/utils/trpc';
import { calcFriend } from '@/utils/user';
import { IconArticle, IconFriends, IconMap, IconMessageReport } from '@tabler/icons-react';
import { useRouter } from 'next/router';
import { useMemo } from 'react';

const TAB_NAME = {
  POSTS: 'posts',
  TRIPS: 'trips',
  FRIENDS: 'friends',
  REQUESTS: 'requests',
};

const TAB_LIST: Record<string, Tab> = {
  [TAB_NAME.POSTS]: {
    name: 'posts',
    title: 'postText',
    url: 'posts',
    icon: <IconArticle />,
  },
  [TAB_NAME.TRIPS]: {
    name: 'trips',
    title: 'tripText',
    url: 'trips',
    icon: <IconMap />,
  },
  [TAB_NAME.FRIENDS]: {
    name: 'friends',
    title: 'friendText',
    url: 'friends',
    icon: <IconFriends />,
  },
  [TAB_NAME.REQUESTS]: {
    name: 'requests',
    title: 'requestText',
    url: 'requests',
    icon: <IconMessageReport />,
  },
};

const TabMenu = () => {
  const router = useRouter();
  const user = useAppStore.use.user();
  const { user: profile, isOwner } = useProfileStore.use.profile();

  const { t } = useTranslation();

  const isFriend =
    user?.friends.find((friend) => friend.friendId === profile?.id) ||
    user?.userFriends.find((friend) => friend.userId === profile?.id);

  const tab = router.asPath.split('/')[2] || TAB_LIST.POSTS.name;

  const handleChangeTab = (tab: string) => {
    router.push(`/profile/${profile?.id}/${tab}`);
  };

  const addFriend = trpc.friend.add.useMutation();
  const addNoti = trpc.notification.push.useMutation();

  const handleAdd = async () => {
    if (!profile?.id) return;
    try {
      await addFriend.mutateAsync({ userId: profile.id });
      await addNoti.mutateAsync({
        content: `${t('friendnotifText')}`,
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
    Object.keys(tabs).forEach((key) => {
      tabs[key].title = t(tabs[key].title || '');
    });
    tabs[TAB_NAME.POSTS].badgeNumber = user.posts.length;
    tabs[TAB_NAME.TRIPS].badgeNumber = user.joinTrip.length;
    tabs[TAB_NAME.FRIENDS].badgeNumber = calcFriend(user);
    tabs[TAB_NAME.REQUESTS].badgeNumber = user.requests.length;
    return tabs;
  }, [t, user]);

  return (
    <>
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
          {t('addfriendText')}
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
          {t('editprofileText')}
        </Button>
      )}
    </>
  );
};

export default TabMenu;
