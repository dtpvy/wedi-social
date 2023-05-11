import { MainLayout, ProfileLayout } from '@/components/Layout';
import { EditForm } from '@/components/Profile/Edit';
import { type ReactElement } from 'react';

const Edit = () => {
  return <EditForm />;
};

Edit.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <ProfileLayout className="flex flex-col gap-4">{page}</ProfileLayout>
    </MainLayout>
  );
};

export default Edit;
