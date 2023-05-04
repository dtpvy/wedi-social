import { ProfileLayout } from '@/components/Layout';
import { EditForm } from '@/components/Profile/Edit';

const Edit = () => {
  return (
    <ProfileLayout className="flex flex-col gap-4">
      <EditForm />
    </ProfileLayout>
  );
};

export default Edit;
