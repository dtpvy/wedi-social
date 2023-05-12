import { TAB_LIST } from '@/constants/admin';
import type { Tab } from '@/types/tab';
import { IconHelpHexagon, IconLayoutDashboard, IconMapPin, IconUsers } from '@tabler/icons-react';
import classNames from '@/utils/classNames';

type Props = {
  tab: string;
  onChangeTab: (tab: Tab) => void;
};

const Menu = ({ tab, onChangeTab }: Props) => {
  return (
    <div className="flex flex-col w-full">
      <div className="px-4 pt-6 pb-5 border-b mb-2">Admin Page</div>
      {Object.keys(TAB_LIST).map((key) => (
        <button
          onClick={() => onChangeTab(TAB_LIST[key as keyof typeof TAB_LIST])}
          key={key}
          className={classNames('px-5 py-3 capitalize flex rounded', {
            'bg-slate-200': tab === TAB_LIST[key as keyof typeof TAB_LIST].name,
          })}
        >
          <div className="flex items-center">
            {TAB_LIST[key as keyof typeof TAB_LIST].name == 'dashboard' && (
              <IconLayoutDashboard className="pr-2 pb-1" />
            )}
            {TAB_LIST[key as keyof typeof TAB_LIST].name == 'user' && (
              <IconUsers className="pr-2 pb-1" />
            )}
            {TAB_LIST[key as keyof typeof TAB_LIST].name == 'location' && (
              <IconMapPin className="pr-2 pb-1" />
            )}
            {TAB_LIST[key as keyof typeof TAB_LIST].name == 'request' && (
              <IconHelpHexagon className="pr-2 pb-1" />
            )}
            {TAB_LIST[key as keyof typeof TAB_LIST].name}
          </div>
        </button>
      ))}
    </div>
  );
};

export default Menu;
