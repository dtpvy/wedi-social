import { getPlaceList } from '@/api/place';
import { Poi } from '@/types/place';
import { ScheduleDetail } from '@/types/schedule';
import { getName } from '@/utils/location';
import { trpc } from '@/utils/trpc';
import { ActionIcon, Button, Loader, Popover, TextInput, Textarea } from '@mantine/core';
import { DateInput, TimeInput } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { IconClock } from '@tabler/icons-react';
import dayjs from 'dayjs';
import { ChangeEvent, useRef, useState } from 'react';
import { useQuery } from 'react-query';

export type ScheduleParams = {
  name: string;
  description?: string;
  locationId: number;
  startTime: Date;
  endTime?: Date;
  reminderTime?: Date;
};

type Props = {
  schedule?: ScheduleDetail;
  onSubmit: (values: ScheduleParams) => void;
};

const FormCreate = ({ schedule, onSubmit }: Props) => {
  const createLocation = trpc.location.create.useMutation();
  const [openedPopover, setOpenedPopover] = useState(false);
  const [street, setStreet] = useState('');
  const ref = useRef<HTMLInputElement>(null);

  const { data, isLoading } = useQuery({
    queryKey: ['getPlaceList', street],
    queryFn: () => getPlaceList(street),
    enabled: !!street,
  });

  const {
    getInputProps,
    setFieldValue,
    values,
    onSubmit: handleSubmit,
  } = useForm({
    initialValues: {
      name: schedule?.name || '',
      description: schedule?.description || '',
      locationId: schedule?.locationId as number,
      startTime: schedule?.startTime || new Date(),
      endTime: schedule?.endTime || undefined,
      reminderTime: schedule?.joinSchedule?.[0].reminderTime || undefined,
    },

    validate: {
      name: (value) => (!!value ? null : 'Require'),
      locationId: (value) => (!!value ? null : 'Require'),
      startTime: (value) => (!!value ? null : 'Require'),
      endTime: (value, values) =>
        value && dayjs(values.startTime).diff(value, 'd') > 0
          ? 'Start date cannot be greater than end date'
          : null,
    },
  });

  const handleChange = (value: ChangeEvent<HTMLInputElement>) => {
    const time = value.target.value.split(':');
    const date = dayjs(values.startTime).set('hour', +time[0]).set('minute', +time[1]).toDate();
    setFieldValue('reminderTime', date);
  };

  const handleCreateLocation = async (location: Poi) => {
    try {
      const { title, address, gps, hash, category, img_big } = location;
      const data = await createLocation.mutateAsync({
        name: getName(title),
        placeId: hash,
        address,
        latitude: gps.latitude,
        longitude: gps.longitude,
        category,
        imgUrl: img_big,
      });
      setStreet(getName(title));
      setFieldValue('locationId', data.id);
    } catch (e) {}
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Popover
        opened={openedPopover}
        onClose={() => setOpenedPopover(false)}
        width="target"
        position="bottom"
        closeOnClickOutside={true}
      >
        <Popover.Target>
          <TextInput
            value={street}
            onFocus={() => setOpenedPopover(true)}
            label="Address"
            placeholder="Address"
            onChange={(e) => setStreet(e.target.value)}
          />
        </Popover.Target>
        <Popover.Dropdown className="min-h-[100px] max-h-[200px] overflow-auto px-0 py-1 cursor-pointer">
          {isLoading && (
            <div className="text-center">
              <Loader />
            </div>
          )}
          {data?.result.poi.map((place) => (
            <div
              key={place.hash}
              className="py-2 px-3 hover:bg-gray-100"
              onClick={() => {
                handleCreateLocation(place);
                setOpenedPopover(false);
              }}
            >
              <div dangerouslySetInnerHTML={{ __html: place.title }} className="font-bold"></div>
              <div className="text-gray-600 text-sm truncate">{place.address}</div>
            </div>
          ))}
        </Popover.Dropdown>
      </Popover>
      <div className="grid grid-cols-2 gap-4 mt-4">
        <TextInput withAsterisk placeholder="Name" label="Name" {...getInputProps('name')} />
        <TimeInput
          className="w-full"
          value={dayjs(values.reminderTime).format('HH:mm')}
          label="Time Reminder"
          placeholder="Time Reminder"
          ref={ref}
          rightSection={
            <ActionIcon onClick={() => ref.current?.showPicker()}>
              <IconClock size="1rem" stroke={1.5} />
            </ActionIcon>
          }
          onChange={handleChange}
          maw={400}
        />
        <DateInput
          withAsterisk
          label="Start time"
          placeholder="Start time"
          maw={400}
          className="flex-1"
          {...getInputProps('startTime')}
        />
        <DateInput
          label="End time"
          placeholder="End time"
          maw={400}
          className="flex-1"
          {...getInputProps('endTime')}
        />
      </div>
      <Textarea maxRows={4} label="Description" placeholder="Description" className="mt-4" />
      <div className="mt-4 text-right">
        <Button type="submit" variant="gradient" gradient={{ from: 'indigo', to: 'cyan' }}>
          {schedule ? 'Update' : 'Create'}
        </Button>
      </div>
    </form>
  );
};

export default FormCreate;
