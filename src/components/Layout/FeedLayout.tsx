import classNames from '@/utils/classNames';
import { type ReactNode } from 'react';

import type { Tab } from '@/types/tab';
import { IconBus, IconCalendarTime, IconMapPinFilled, IconNews } from '@tabler/icons-react';
import { useRouter } from 'next/router';
import { Avatar } from '@mantine/core';
import useUserStore from '@/stores/user';

type Props = {
  children: ReactNode;
  className?: string;
};

const TAB_LIST: Record<string, Tab> = {
  FEED: {
    name: 'feed',
    url: '',
    icon: <IconNews size={50} />,
  },
  TRIP: {
    name: 'trip',
    url: 'trip',
    icon: <IconBus size={50} />,
  },
  EVENT: {
    name: 'event',
    url: 'event',
    icon: <IconCalendarTime size={50} />,
  },
  LOCATION: {
    name: 'location',
    url: 'location',
    icon: <IconMapPinFilled size={50} />,
  },
};

const FeedLayout = ({ children, className }: Props) => {
  const router = useRouter();
  const user = useUserStore((state) => state.user);
  const tab = router.asPath.split('/')[2] || TAB_LIST.FEED.name;

  const handleChangeTab = (tab: Tab) => {
    router.push(`/feed/${tab.url}`);
  };

  return (
    <>
      <div className="fixed top-[30px] left-[100px] mt-[70px]">
        <div className="flex flex-col gap-4 bg-white min-h-[500px] w-[200px] shadow rounded-xl">
          <div className="flex items-center">
            <Avatar radius="xl" src={user?.imgUrl} />
          </div>
          {/* {Object.keys(TAB_LIST).map((key, index) => (
            <div key={index} className="flex flex-col gap-4 flex-1">
              <button
                onClick={() => handleChangeTab(TAB_LIST[key])}
                className={classNames(
                  "flex-1 px-5 uppercase flex flex-col items-center justify-center gap-3 bg-white hover:bg-green-700 hover:text-white",
                  { "bg-green-700 text-white": tab === TAB_LIST[key].name }
                )}
              >
                {TAB_LIST[key].icon}
                <div className="font-bold text-lg">{TAB_LIST[key].name}</div>
              </button>
              {index + 1 !== Object.keys(TAB_LIST).length && (
                <div className="border-b-[5px] border-green-900 w-2/3 mx-auto"></div>
              )}
            </div>
          ))} */}
        </div>
      </div>
      <div className="pt-[70px] pl-[132px] flex gap-8 max-h-[100vh] overflow-auto">
        <div className={classNames(className)}>{children}</div>
      </div>
    </>
  );
};

export default FeedLayout;
