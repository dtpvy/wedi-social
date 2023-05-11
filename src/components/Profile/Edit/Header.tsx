import useToast from '@/hooks/useToast';
import useTranslation from '@/hooks/useTranslation';
import useAppStore from '@/stores/store';
import { trpc } from '@/utils/trpc';
import { Button } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { IconCheck, IconLoader, IconMoodEdit, IconPhotoEdit, IconX } from '@tabler/icons-react';
import dayjs from '@/utils/dayjs';
import { IKUpload } from 'imagekitio-react';
import { useRef, useState } from 'react';

const Header = () => {
  const utils = trpc.useContext();
  const { show } = useToast();

  const user = useAppStore.use.user();
  const updateImage = trpc.user.updateImage.useMutation();
  const avatarRef = useRef<HTMLInputElement>(null);
  const bgRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [bgLoading, setBgLoading] = useState(false);

  const handleChangeImage = async (params: { imgUrl?: string; bgUrl?: string }) => {
    try {
      await updateImage.mutateAsync(params);
      show({
        message: `${t('addsuccessText')}`,
        type: 'success',
      });
      utils.user.findUser.refetch();
    } catch (e: any) {
      show({
        message: t('errorTryAgainText'),
        type: 'error',
      });
    }
    setLoading(false);
    setBgLoading(false);
  };
  const { t } = useTranslation();
  return (
    <div className="flex gap-3 items-center mb-4">
      <div className="mr-auto">
        <div className="font-bold text-lg">{t('editprofileText')}</div>
        <div className="text-green-700 font-italic">{user?.status}</div>
        <div className="text-sm text-gray-600">
          {`${t('lastEditText')} ${dayjs(user?.updatedAt).format('DD/MM/YYYY HH:mm')}`}
        </div>
      </div>
      <Button
        onClick={() => avatarRef.current?.click()}
        color="green"
        leftIcon={loading ? <IconLoader /> : <IconMoodEdit />}
        disabled={loading}
      >
        {t('changeavatarText')}
      </Button>
      <IKUpload
        inputRef={avatarRef}
        folder="/wedi"
        onUploadStart={() => setLoading(true)}
        onSuccess={(file) => handleChangeImage({ imgUrl: file.url })}
        onError={() => {
          show({
            message: t('errorTryAgainText'),
            type: 'error',
          });
          setLoading(false);
        }}
        accept="image/*"
        className="hidden"
      />
      <Button
        onClick={() => bgRef.current?.click()}
        variant="outline"
        color="green"
        leftIcon={bgLoading ? <IconLoader /> : <IconPhotoEdit />}
        loading={updateImage.isLoading}
      >
        {t('changebackgroundText')}
      </Button>
      <IKUpload
        inputRef={bgRef}
        folder="/wedi"
        onUploadStart={() => setBgLoading(true)}
        onSuccess={(file) => handleChangeImage({ bgUrl: file.url })}
        onError={() => {
          show({
            message: t('errorTryAgainText'),
            type: 'error',
          });
          setBgLoading(true);
        }}
        accept="image/*"
        className="hidden"
      />
    </div>
  );
};

export default Header;
