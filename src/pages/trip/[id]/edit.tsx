import { MainLayout } from '@/components/Layout';
import TripLayout from '@/components/Layout/TripLayout';
import FormCreate, { TripParams } from '@/components/Trip/FormCreate';
import useToast from '@/hooks/useToast';
import useTranslation from '@/hooks/useTranslation';
import NotFound from '@/pages/404';
import useAppStore from '@/stores/store';
import { trpc } from '@/utils/trpc';
import { LoadingOverlay } from '@mantine/core';
import { useRouter } from 'next/router';
import { type ReactElement } from 'react';

const Edit = () => {
  const { t } = useTranslation();
  const { show } = useToast();
  const utils = trpc.useContext();

  const router = useRouter();
  const { id } = router.query;
  const { data, isLoading } = trpc.trip.get.useQuery({ id: +(id as string) });

  const user = useAppStore.use.user();
  const update = trpc.trip.update.useMutation();

  const handleEdit = async (value: TripParams) => {
    if (!data?.trip) return;
    try {
      await update.mutateAsync({ id: data.trip.id, ...value });
      show({
        message: `${t('addsuccessText')}`,
        type: 'success',
      });
      utils.trip.get.refetch();
    } catch (e: any) {
      console.log(e);
      show({
        message: t('errorTryAgainText'),
        type: 'error',
      });
    }
  };
  console.log(data?.trip?.creatorId, user?.id);
  if (!isLoading && data?.trip?.creatorId !== user?.id) {
    return <NotFound />;
  }

  return (
    <>
      {!data?.trip ? (
        <LoadingOverlay visible />
      ) : (
        <FormCreate trip={data?.trip} onSubmit={handleEdit} />
      )}
    </>
  );
};

Edit.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <TripLayout className="bg-white p-5">{page}</TripLayout>
    </MainLayout>
  );
};

export default Edit;
