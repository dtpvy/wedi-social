import { Avatar, Button, CloseButton, Select, TextInput } from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { Privacy, Trip } from '@prisma/client';
import { IconEyeEdit, IconX } from '@tabler/icons-react';
import dayjs from 'dayjs';
import { IKUpload } from 'imagekitio-react';
import { useRef, useState } from 'react';

export type TripParams = {
  name: string;
  imgUrl: string;
  bgUrl?: string;
  privacy: Privacy;
  startDate: Date;
  endDate?: Date;
};

type Props = {
  trip?: Trip;
  onSubmit: (values: TripParams) => void;
};

const FormCreate = ({ trip, onSubmit }: Props) => {
  const avatarRef = useRef<HTMLInputElement>(null);
  const bgRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [bgLoading, setBgLoading] = useState(false);

  const {
    getInputProps,
    setFieldValue,
    values,
    onSubmit: handleSubmit,
  } = useForm({
    initialValues: {
      name: trip?.name || '',
      imgUrl: trip?.imgUrl || '',
      bgUrl: trip?.bgUrl || '',
      privacy: trip?.privacy || Privacy.PUBLIC,
      startDate: trip?.startDate || new Date(),
      endDate: trip?.endDate || undefined,
    },

    validate: {
      name: (value) => (!!value ? null : 'Require'),
      startDate: (value) => (!!value ? null : 'Require'),
      imgUrl: (value) => (!!value ? null : 'Require'),
      endDate: (value, values) =>
        value && dayjs(values.startDate).diff(value, 'd') > 0
          ? 'Start date cannot be greater than end date'
          : null,
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="relative">
        {values.bgUrl && (
          <CloseButton
            onClick={() => setFieldValue('bgUrl', '')}
            title="Close popover"
            size="lg"
            iconSize={20}
            radius="xl"
            className="absolute top-0 right-0 mt-2 mr-2"
          />
        )}
        <div
          style={{
            backgroundImage: `url(${values.bgUrl})`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
          }}
          className="h-[200px] bg-gray-200"
        ></div>
        <Avatar src={values.imgUrl} className="absolute bottom-0 ml-4 mb-4" size="lg" radius="xl" />
        <div className="flex gap-2 absolute bottom-0 mr-4 mb-4 right-0">
          <Button
            onClick={() => bgRef.current?.click()}
            disabled={bgLoading}
            variant="gradient"
            gradient={{ from: 'teal', to: 'lime', deg: 105 }}
          >
            Change background
          </Button>
          <IKUpload
            inputRef={bgRef}
            folder="/wedi"
            onUploadStart={() => setBgLoading(true)}
            onSuccess={(file) => {
              setFieldValue('bgUrl', file.url);
              setBgLoading(false);
            }}
            onError={() => {
              notifications.show({
                message: 'Có lỗi xảy ra. Vui lòng thử lại',
                color: 'red',
                icon: <IconX />,
              });
              setBgLoading(false);
            }}
            accept="image/*"
            className="hidden"
          />
          <Button
            onClick={() => avatarRef.current?.click()}
            disabled={loading}
            variant="gradient"
            gradient={{ from: 'teal', to: 'blue', deg: 60 }}
          >
            Change avatar
          </Button>
          <IKUpload
            inputRef={avatarRef}
            folder="/wedi"
            onUploadStart={() => setLoading(true)}
            onSuccess={(file) => {
              setFieldValue('imgUrl', file.url);
              setLoading(false);
            }}
            onError={() => {
              notifications.show({
                message: 'Có lỗi xảy ra. Vui lòng thử lại',
                color: 'red',
                icon: <IconX />,
              });
              setLoading(false);
            }}
            accept="image/*"
            className="hidden"
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 mt-4">
        <TextInput withAsterisk placeholder="Name" label="Name" {...getInputProps('name')} />
        <Select
          label="Privacy"
          placeholder="Privacy"
          icon={<IconEyeEdit size="1rem" />}
          data={[
            { value: Privacy.PUBLIC, label: 'Công khai' },
            { value: Privacy.FRIEND, label: 'Bạn bè' },
            { value: Privacy.PRIVATE, label: 'Chỉ mình tôi' },
          ]}
          {...getInputProps('privacy')}
        />
        <DateInput
          withAsterisk
          label="Start date"
          placeholder="Start date"
          maw={400}
          className="flex-1"
          {...getInputProps('startDate')}
        />
        <DateInput
          label="End date"
          placeholder="End date"
          maw={400}
          className="flex-1"
          {...getInputProps('endDate')}
        />
      </div>
      <div className="mt-4 justify-between flex items-center">
        <Button type="submit" variant="gradient" gradient={{ from: 'indigo', to: 'cyan' }}>
          {trip ? 'Update' : 'Create'}
        </Button>
        {getInputProps('imgUrl').error && (
          <div className="text-red-600 text-sm">Avatar {getInputProps('imgUrl').error}</div>
        )}
      </div>
    </form>
  );
};

export default FormCreate;