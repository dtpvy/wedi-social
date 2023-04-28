import useUserStore from '@/stores/user';
import classNames from '@/utils/classNames';
import { trpc } from '@/utils/trpc';
import { Avatar, Button, Modal } from '@mantine/core';
import { IconCalendarPlus, IconPlaneDeparture } from '@tabler/icons-react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { MouseEvent, useContext, useState } from 'react';
import FormCreate, { ScheduleParams } from './FormCreate';
import { TripLayoutContext } from '@/components/Layout/TripLayout';

type Props = {
  className?: string;
  tripId: number;
};

const CreateSchedule = ({ tripId, className }: Props) => {
  const { data } = useContext(TripLayoutContext) || {};

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
            <div className="text-gray-600 text-sm">Tạo những lịch trình đi chơi thôi</div>
          </div>
        </div>

        <Button
          onClick={handleOpen}
          className="w-full"
          rightIcon={<IconCalendarPlus />}
          variant="gradient"
          gradient={{ from: 'teal', to: 'blue', deg: 60 }}
        >
          Create Schedule
        </Button>
      </div>
      <Modal opened={opened} size="lg" onClose={() => setOpened(false)} title="Create Schedule">
        <FormCreate onSubmit={handleCreate} />
      </Modal>
    </div>
  );
};

export default CreateSchedule;
