import classNames from '@/utils/classNames';
import { type ReactNode } from 'react';

import { CreateTrip } from '@/components/Trip';
import useUserStore from '@/stores/user';
import type { Tab } from '@/types/tab';
import { IconBus, IconCalendarTime, IconMapPinFilled, IconNews } from '@tabler/icons-react';
import Link from 'next/link';
import { useRouter } from 'next/router';

type Props = {
  children: ReactNode;
  className?: string;
};

const TAB_LIST: Record<string, Tab> = {
  FEED: {
    name: 'feed',
    url: '',
    icon: <IconNews size={30} />,
  },
  TRIP: {
    name: 'trip',
    url: 'trip',
    icon: <IconBus size={30} />,
  },
  EVENT: {
    name: 'event',
    url: 'event',
    icon: <IconCalendarTime size={30} />,
  },
  LOCATION: {
    name: 'location',
    url: 'location',
    icon: <IconMapPinFilled size={30} />,
  },
};

const FeedLayout = ({ children, className }: Props) => {
  const router = useRouter();
  const tab = router.asPath.split('/')[2] || TAB_LIST.FEED.name;

  return (
    <>
      <div className="absolute top-0 bottom-0 mt-[70px] z-[5] shadow-md">
        <div className="flex flex-col gap-4 bg-white w-[250px] h-full p-4">
          <CreateTrip />
          {Object.keys(TAB_LIST).map((key, index) => (
            <Link
              key={index}
              href={`/feed/${TAB_LIST[key].url}`}
              className={classNames(
                'px-5 uppercase py-3 rounded-lg text-gray-400 no-underline flex gap-4 items-center bg-white hover:bg-teal-600 hover:text-white',
                { 'bg-teal-700 text-white': tab === TAB_LIST[key].name }
              )}
            >
              {TAB_LIST[key].icon}
              <div className="font-bold text-md">{TAB_LIST[key].name}</div>
            </Link>
          ))}
        </div>
      </div>
      <div className="pt-[70px] px-[100px] flex gap-8 max-h-[100vh] overflow-auto">
        <div className={classNames(className)}>{children}</div>
      </div>
      <div className="absolute top-0 bottom-0 right-0 mt-[70px] z-[5] shadow-md">
        <div className="flex flex-col gap-4 bg-white w-[250px] h-full p-4"></div>
      </div>
    </>
  );
};

export default FeedLayout;
