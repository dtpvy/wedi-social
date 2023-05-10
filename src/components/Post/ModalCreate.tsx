import useUserStore from '@/stores/auth';
import { trpc } from '@/utils/trpc';
import { Carousel } from '@mantine/carousel';
import { Avatar, Button, CloseButton, Image, Modal, Select, Textarea } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { Privacy } from '@prisma/client';
import { IconEyeEdit, IconLoader, IconMapPinFilled, IconPhoto, IconX } from '@tabler/icons-react';
import { IKUpload } from 'imagekitio-react';
import { useRef, useState } from 'react';
import LocationSeletion, { LocationSeletionProps } from './LocationSeletion';
import classNames from '@/utils/classNames';
import useTranslation from '@/hooks/useTranslation';

type State = {
  content: string;
  imgUrls: string[];
  privacy: Privacy;
};

type Props = {
  tripId?: number;
  postId?: number;
  opened?: boolean;
  privacy?: Privacy;
  content?: string;
  imgUrls?: string[];
  onClose: () => void;
  onOpenReview: (id: number) => void;
  onCreateLocation: () => void;
} & LocationSeletionProps;

const ModalCreate = ({
  tripId,
  postId,
  opened = false,
  locations,
  privacy = Privacy.PUBLIC,
  content = '',
  imgUrls = [],
  onClose,
  onCreateLocation,
  onOpenReview,
  onDeleteLocation,
}: Props) => {
  const mediaRef = useRef<HTMLInputElement>(null);
  const user = useUserStore((state) => state.user);
  const create = trpc.post.create.useMutation();
  const update = trpc.post.update.useMutation();

  const isUpdate = postId !== undefined;

  const [mediaLoading, setMediaLoading] = useState(false);
  const [state, setState] = useState<State>({
    content,
    imgUrls,
    privacy,
  });

  const onChangeField = (field: keyof State, value: unknown) => {
    setState((prev) => ({ ...prev, [field]: value }));
  };

  const handleChooseImage = async (imgUrl: string) => {
    onChangeField('imgUrls', [...state.imgUrls, imgUrl]);
    setMediaLoading(false);
  };

  const handleDeleteImage = async (imgUrl: string) => {
    onChangeField(
      'imgUrls',
      state.imgUrls.filter((url) => url !== imgUrl)
    );
  };

  const { t } = useTranslation();

  const handleCreate = async () => {
    if (!location) return;
    try {
      if (isUpdate) {
        await update.mutateAsync({
          id: postId,
          ...state,
        });
        onOpenReview(postId);
      } else {
        const data = await create.mutateAsync({
          tripId,
          ...state,
          locationIds: locations.map((d) => d.id),
        });
        onOpenReview(data.id);
      }
      setState({
        content: '',
        imgUrls: [],
        privacy: Privacy.PUBLIC,
      });
    } catch {}
  };

  return (
    <Modal
      onClose={onClose}
      opened={opened}
      size="lg"
      title={<div className="font-medium text-lg">{t('createpostText')}</div>}
    >
      <div className="flex gap-3 items-center mb-3">
        <Avatar src={user?.imgUrl} radius="xl" />
        <div className="flex-1">{user?.name}</div>
        <Select
          value={state.privacy}
          placeholder={t('privacyText') as string}
          onChange={(value) => onChangeField('privacy', value)}
          icon={<IconEyeEdit size="1rem" />}
          data={[
            { value: Privacy.PUBLIC, label: t('publicModeText') },
            { value: Privacy.FRIEND, label: t('friendModeText') },
            { value: Privacy.PRIVATE, label: t('privateModeText') },
          ]}
        />
      </div>
      <Textarea
        value={state.content}
        onChange={(e) => onChangeField('content', e.target.value)}
        maxLength={500}
        minRows={10}
        placeholder={t('statusText')}
      />
      <LocationSeletion
        readonly={isUpdate}
        locations={locations}
        onDeleteLocation={onDeleteLocation}
      />
      {!!state.imgUrls.length && (
        <Carousel
          withIndicators
          slideSize="33.333333%"
          slideGap="md"
          loop
          align="start"
          slidesToScroll={3}
          className="my-3"
          withControls={false}
        >
          {state.imgUrls.map((imgUrl, index) => (
            <Carousel.Slide key={index} className="relative">
              <Image alt="media" src={imgUrl} />
              <CloseButton
                className="absolute top-2 right-6"
                onClick={() => handleDeleteImage(imgUrl)}
                title={t('closePopoverText')}
                size="md"
                iconSize={20}
                radius="xl"
              />
            </Carousel.Slide>
          ))}
        </Carousel>
      )}

      <div className="flex items-center gap-3 mt-3">
        <Button
          disabled={isUpdate}
          onClick={onCreateLocation}
          leftIcon={
            <IconMapPinFilled
              className={classNames('text-red-600', {
                'text-gray-600': isUpdate,
              })}
            />
          }
          variant="outline"
          color="red"
        >
          {t('selectLocationText')}
        </Button>
        <Button
          color="teal"
          variant="outline"
          leftIcon={mediaLoading ? <IconLoader /> : <IconPhoto className="text-teal-600" />}
          onClick={() => mediaRef.current?.click()}
          disabled={mediaLoading}
        >
          {t('chooseImageText')}
        </Button>
        <Button
          onClick={handleCreate}
          disabled={!locations.length || !state.content}
          className="ml-auto"
        >
          {postId ? 'Update' : 'Create'}
        </Button>
        <IKUpload
          inputRef={mediaRef}
          folder="/wedi"
          onUploadStart={() => setMediaLoading(true)}
          onSuccess={(file) => handleChooseImage(file.url)}
          onError={() => {
            notifications.show({
              message: t('errorTryAgainText'),
              color: 'red',
              icon: <IconX />,
            });
            setMediaLoading(false);
          }}
          accept="image/*"
          className="hidden"
        />
      </div>
    </Modal>
  );
};

export default ModalCreate;
