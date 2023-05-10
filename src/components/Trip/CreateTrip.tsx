import useTranslation from '@/hooks/useTranslation';
import classNames from '@/utils/classNames';
import { trpc } from '@/utils/trpc';
import { Avatar, Button, Modal } from '@mantine/core';
import { IconPlaneDeparture } from '@tabler/icons-react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { MouseEvent, useState } from 'react';
import FormCreate, { TripParams } from './FormCreate';
import useAppStore from '@/stores/store';

type Props = {
  className?: string;
};

const CreateTrip = ({ className }: Props) => {
  const user = useAppStore.use.user();
  const router = useRouter();
  const create = trpc.trip.create.useMutation();
  const [opened, setOpened] = useState(false);

  const handleCreate = async (values: TripParams) => {
    try {
      const data = await create.mutateAsync(values);
      router.push(`/trip/${data.id}`);
    } catch {}
  };

  const handleOpen = (e: MouseEvent<HTMLElement>) => {
    e.preventDefault();
    setOpened(true);
  };

  const { t } = useTranslation();

  return (
    <>
      <Link href={`/profile/${user?.id}`} className={classNames('no-underline mt-5', className)}>
        <div className="bg-gray-100 text-black p-4 rounded-xl w-full">
          <div className="flex gap-4 items-center">
            <Avatar radius="xl" src={user?.imgUrl} />
            <div>
              <div className="font-medium">{user?.name}</div>
              <div className="text-gray-600 text-sm">{user?.bio || t('statusText')}</div>
            </div>
          </div>

          <div className="mt-2 mb-1 text-sm">{t('createTripWithFriendAndFamilyText')}</div>
          <Button
            onClick={handleOpen}
            className="w-full"
            rightIcon={<IconPlaneDeparture />}
            variant="gradient"
            gradient={{ from: 'teal', to: 'blue', deg: 60 }}
          >
            {t('createtripText')}
          </Button>
        </div>
      </Link>
      <Modal opened={opened} size="lg" onClose={() => setOpened(false)} title={t('createtripText')}>
        <FormCreate onSubmit={handleCreate} />
      </Modal>
    </>
  );
};

export default CreateTrip;
