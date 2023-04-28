import { ActionIcon, Avatar } from '@mantine/core';
import { IconDots } from '@tabler/icons-react';
import Event from './Event';
import { ScheduleDetail } from '@/types/schedule';
import dayjs from 'dayjs';

type Props = {
  event: ScheduleDetail;
  refetch: () => void;
};

const TripEvent = ({ event, refetch }: Props) => {
  const { trip } = event;
  return (
    <div className="bg-white p-5 shadow rounded">
      <div className="flex items-center gap-4">
        <Avatar src={trip?.imgUrl} radius="md" className="border" />
        <div className="mr-auto">
          <div className="font-bold">{trip?.name}</div>
          <div className="text-gray-400 text-sm">
            {dayjs(trip?.createdAt).format('DD/MM/YYYY HH:mm')}
          </div>
        </div>
      </div>
      <div className="shadow mt-4">
        <Event schedule={event} refetch={refetch} />
      </div>
    </div>
  );
};

export default TripEvent;
