import useUserStore from '@/stores/user';
import { ScheduleDetail } from '@/types/schedule';
import { trpc } from '@/utils/trpc';
import { ActionIcon, Avatar, Button, Group, HoverCard, Modal, Text, Tooltip } from '@mantine/core';
import { TimeInput } from '@mantine/dates';
import {
  IconCalendar,
  IconClock,
  IconClockEdit,
  IconNote,
  IconPointFilled,
  IconStarFilled,
} from '@tabler/icons-react';
import dayjs from 'dayjs';
import { useRef, useState } from 'react';
import useTranslation from "@/hooks/useTranslation"; 
type Props = {
  schedule: ScheduleDetail;
  refetch: () => void;
};

const Event = ({ schedule, refetch }: Props) => {
  const user = useUserStore.use.user();
  const ref = useRef<HTMLInputElement>(null);
  const { name, location, description, startTime, joinSchedule } = schedule;
  const joined = joinSchedule.find((d) => d.userId === user?.id);
  const [show, setShow] = useState(false);

  const cancel = trpc.schedule.cancel.useMutation();
  const join = trpc.schedule.join.useMutation();
  const update = trpc.schedule.updateTime.useMutation();
  const { t } = useTranslation(); 
  const handleCancel = () => {
    cancel.mutate({ id: schedule.id }, { onSuccess: refetch });
  };

  const handleJoin = () => {
    join.mutate({ id: schedule.id }, { onSuccess: refetch });
  };

  const handleUpdate = () => {
    if (!ref.current) return;
    const [h, m] = ref.current.value.split(':');
    console.log(h, m);
    const date = dayjs(startTime).set('hour', +h).set('minute', +m).toDate();
    update.mutate({ id: schedule.id, reminderTime: date }, { onSuccess: refetch });
  };

  return (
    <div className="bg-white shadow p-4 rounded-lg">
      <div className="flex items-center mb-2 justify-between">
        <div className="font-medium text-md">{name}</div>
        {!joined ? (
          <Button
            onClick={handleJoin}
            size="xs"
            variant="gradient"
            gradient={{ from: 'indigo', to: 'cyan' }}
          >
            {t('participatebtnText')}
          </Button>
        ) : (
          <div className="flex gap-2 items-center">
            <Button
              onClick={handleCancel}
              size="xs"
              variant="gradient"
              gradient={{ from: 'teal', to: 'lime', deg: 105 }}
            >
              {t('leaveText')}
            </Button>
            <HoverCard width={200} shadow="md">
              <HoverCard.Target>
                <ActionIcon color="teal" variant="outline">
                  <IconClockEdit size="1.125rem" />
                </ActionIcon>
              </HoverCard.Target>
              <HoverCard.Dropdown>
                <TimeInput
                  label= {t('timeReminderText')}
                  ref={ref}
                  defaultValue={dayjs(joined.reminderTime).format('HH:mm')}
                  rightSection={
                    <ActionIcon onClick={() => ref.current?.showPicker()}>
                      <IconClock size="1rem" stroke={1.5} />
                    </ActionIcon>
                  }
                  maw={400}
                  mx="auto"
                />
                <Group position="right">
                  <Button
                    className="mt-2"
                    onClick={handleUpdate}
                    size="xs"
                    variant="outline"
                    color="teal"
                  >
                    {t("updateText")}
                  </Button>
                </Group>
              </HoverCard.Dropdown>
            </HoverCard>
          </div>
        )}
      </div>
      <div className="shadow p-2 rounded flex gap-2 items-center">
        <Avatar src={location.imgUrl} radius="md" size="lg" className="border" />
        <div className="mr-auto">
          <div className="font-medium text-md">{location.name}</div>
          <div className="text-gray-400 text-sm">{location.address}</div>
        </div>
        <div className="flex items-center text-yellow-400 bg-yellow-100 px-2 py-1 rounded-lg w-fit gap-1">
          <IconStarFilled size={16} />
          <span className="text-sm font-bold">{location.rating}</span>
        </div>
      </div>
      {description && (
        <div className="flex text-gray-600 text-sm mt-4 gap-2 items-start">
          <IconNote size={20} />
          <Text lineClamp={2} className="w-full" align="justify">
            {description}
          </Text>
        </div>
      )}
      <div className="flex text-gray-600 items-center mt-4 gap-2 text-sm">
        <IconCalendar size={20} />
        <div>{dayjs(startTime).format('HH:mm DD/MM/YYYY')}</div>
        {joined?.reminderTime && (
          <>
            <IconPointFilled size={16} />
            <div>{dayjs(joined.reminderTime).format('HH:mm DD/MM/YYYY')}</div>{' '}
          </>
        )}
        {joinSchedule.length && (
          <Tooltip label={joinSchedule.map((d) => d.user.name).join(', ')}>
            <Avatar.Group spacing="sm" className="ml-auto">
              <Avatar src={joinSchedule[0].user.imgUrl} radius="xl" />
              {joinSchedule.length > 1 && (
                <Avatar radius="xl" color="green">
                  {joinSchedule.length - 1}
                </Avatar>
              )}
            </Avatar.Group>
          </Tooltip>
        )}
      </div>
      <Modal opened={show} onClose={() => setShow(false)}></Modal>
    </div>
  );
};

export default Event;
