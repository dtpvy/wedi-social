import { Loader, LoadingOverlay } from '@mantine/core';
import { ReactNode } from 'react';
import { Search } from '../Search';
import { useSession } from 'next-auth/react';

type Props = {
  children: ReactNode;
};

const MainLayout = ({ children }: Props) => {
  const { status } = useSession();

  if (status === 'loading') {
    return (
      <div className="w-screen h-screen relative">
        <LoadingOverlay visible />
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <Search />
      {children}
    </div>
  );
};

export default MainLayout;
