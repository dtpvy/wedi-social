import useTranslation from '@/hooks/useTranslation';
import { trpc } from '@/utils/trpc';
import { Avatar, Button, Modal } from '@mantine/core';
import { IconCalendarPlus } from '@tabler/icons-react';
import { useRouter } from 'next/router';
import { MouseEvent, useContext, useState } from 'react';
import FormCreate, { ScheduleParams } from './FormCreate';
import useAppStore from '@/stores/store';

type Props = {
  className?: string;
  tripId: number;
};

const CreateSchedule = ({ tripId }: Props) => {
  const { profile: data } = useAppStore.use.trip();
  const { t } = useTranslation();
  const router = useRouter();
  const create = trpc.schedule.create.useMutation();
  const [opened, setOpened] = useState(false);

  const handleCreate = async (values: ScheduleParams) => {
    try {
      await create.mutateAsync({ tripId, ...values });
      router.push(`/trip/${data?.id}/schedules`);
    } catch {}
  };

  const handleOpen = (e: MouseEvent<HTMLElement>) => {
    e.preventDefault();
    setOpened(true);
  };

  return (
    <div>
      <div className="bg-gray-100 text-black p-4 rounded-xl w-full">
        <div className="flex gap-3 mb-3 items-center">
          <Avatar size="lg" radius="xl" src={data?.imgUrl} />
          <div>
            <div className="font-medium">{data?.name}</div>
            <div className="text-gray-600 text-sm">{t('createScheduleDescribeText')}</div>
          </div>
        </div>

        <Button
          onClick={handleOpen}
          className="w-full"
          rightIcon={<IconCalendarPlus />}
          variant="gradient"
          gradient={{ from: 'teal', to: 'blue', deg: 60 }}
        >
          {t('createScheduleText')}
        </Button>
      </div>
      <Modal
        opened={opened}
        size="lg"
        onClose={() => setOpened(false)}
        title={t('createScheduleText')}
      >
        <FormCreate onSubmit={handleCreate} />
      </Modal>
    </div>
  );
};

export default CreateSchedule;
