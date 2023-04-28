import { Tab } from '@/types/tab';
import { IconBus } from '@tabler/icons-react';

export const TAB_LIST_FEED: Record<string, Tab> = {
  Location: {
    name: 'Location',
    url: 'Location',
    icon: 'https://cdn-icons-png.flaticon.com/512/2838/2838912.png',
  },
  Trip: {
    name: 'Trip',
    url: 'Trip',
    icon: 'https://cdn-icons-png.flaticon.com/512/4004/4004174.png',
  },
  Event: {
    name: 'Event',
    url: 'Event',
    icon: 'https://cdn-icons-png.flaticon.com/512/839/839888.png',
  },
};
