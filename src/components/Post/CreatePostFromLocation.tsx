import useTranslation from '@/hooks/useTranslation';
import type { LocationDetail } from '@/types/location';
import { Avatar, Button } from '@mantine/core';
import { IconMapPinFilled } from '@tabler/icons-react';
import { useState } from 'react';
import ModalCreate from './ModalCreate';
import ModalReview from './ModalReview';

type Props = {
  refetch: () => void;
  location: LocationDetail;
};

const CreatePostFromLocation = ({ location, refetch }: Props) => {
  const [modal, setModal] = useState('');
  const [postId, setPostId] = useState<number>();

  const handleCreatePost = (id: number) => {
    setPostId(id);
    setModal('review');
  };

  const { t } = useTranslation();

  return (
    <div className="bg-white shadow p-4 rounded-lg">
      <div className="flex items-center gap-4 w-full">
        <Avatar radius="xl" />
        <div
          onClick={() => setModal('create')}
          className="rounded-full w-1/2 cursor-pointer hover:bg-gray-100 px-3 py-2 border mr-auto"
        >
          {t('statusText')}
        </div>

        <Button onClick={() => setModal('create')} color="teal" radius="xl">
          {t('postVerbText')}
        </Button>
      </div>

      <ModalCreate
        opened={modal === 'create'}
        onClose={() => setModal('')}
        locations={[location]}
        onOpenReview={handleCreatePost}
        onCreateLocation={() => setModal('location')}
        enableUpdateLocation={false}
      />

      {postId && (
        <ModalReview
          postId={postId}
          locations={[location]}
          opened={modal === 'review'}
          onClose={() => {
            setModal('');
            setPostId(undefined);
            refetch();
          }}
        />
      )}
    </div>
  );
};

export default CreatePostFromLocation;
