import TripLayout from '@/components/Layout/TripLayout';
import FormCreate, { TripParams } from '@/components/Trip/FormCreate';
import NotFound from '@/pages/404';
import useUserStore from '@/stores/auth';
import { trpc } from '@/utils/trpc';
import { LoadingOverlay } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { IconCheck, IconX } from '@tabler/icons-react';
import { useRouter } from 'next/router';

const Edit = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data, isLoading } = trpc.trip.get.useQuery({ id: +(id as string) });

  const user = useUserStore.use.user();
  const update = trpc.trip.update.useMutation();

  const handleEdit = async (value: TripParams) => {
    if (!data?.trip) return;
    try {
      await update.mutateAsync({ id: data.trip.id, ...value });
      notifications.show({
        message: `Action successfully`,
        color: 'green',
        icon: <IconCheck />,
      });
    } catch (e: any) {
      console.log(e);
      notifications.show({
        message: 'Có lỗi xảy ra. Vui lòng thử lại',
        color: 'red',
        icon: <IconX />,
      });
    }
  };
  console.log(data?.trip?.creatorId, user?.id);
  if (!isLoading && data?.trip?.creatorId !== user?.id) {
    return <NotFound />;
  }

  return (
    <TripLayout className="bg-white p-5">
      {!data?.trip ? (
        <LoadingOverlay visible />
      ) : (
        <FormCreate trip={data?.trip} onSubmit={handleEdit} />
      )}
    </TripLayout>
  );
};

export default Edit;
