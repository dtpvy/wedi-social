import useUserStore from '@/stores/user';
import { Loader } from '@mantine/core';
import { ReactNode } from 'react';
import { Search } from '../Search';

type Props = {
  children: ReactNode;
};

const LayoutMain = ({ children }: Props) => {
  const status = useUserStore.use.status();

  if (status === 'loading') {
    return <Loader />;
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="w-full fixed shadow-md mb-4 z-10">
        <Search />
      </div>
      {children}
    </div>
  );
};

export default LayoutMain;
