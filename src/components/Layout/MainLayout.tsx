import { LoadingOverlay } from '@mantine/core';
import { useSession } from 'next-auth/react';
import { Search } from '../Search';

const MainLayout = ({ children }: ComponentWithChildren) => {
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
