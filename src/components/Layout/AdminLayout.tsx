import { TAB_LIST } from '@/constants/admin';

import Menu from '@/components/Admin/Menu';
import type { Tab } from '@/types/tab';
import { useRouter } from 'next/router';
import { Search } from '../Admin/Dashboard';

const LayoutAdmin = ({ children }: ComponentWithChildren) => {
  const router = useRouter();
  const tab = router.asPath.split('/')[2] || TAB_LIST.DASHBOARD.name;

  const handleChangeTab = (tab: Tab) => {
    router.push(`/admin/${tab.url}`);
  };

  return (
    <div className="flex h-screen">
      <div className="w-[200px] px-5">
        <Menu tab={tab} onChangeTab={handleChangeTab} />
      </div>
      <div className="w-full border-l">
        <Search />
        {children}
      </div>
    </div>
  );
};

export default LayoutAdmin;
