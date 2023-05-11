import type { LocationDetail } from '@/types/location';
import { Avatar, Button } from '@mantine/core';
import { Location } from '@prisma/client';
import { IconMapPinFilled } from '@tabler/icons-react';
import { useState } from 'react';
import ModalCreate from './ModalCreate';
import ModalLocation from './ModalLocation';
import ModalReview from './ModalReview';
import useTranslation from '@/hooks/useTranslation';

type Props = {
  refetch: () => void;
  tripId?: number;
};

const CreatePost = ({ tripId, refetch }: Props) => {
  const [modal, setModal] = useState('');
  const [postId, setPostId] = useState<number>();
  const [locations, setLocations] = useState<LocationDetail[]>([]);

  const handleCreateLocation = (location: LocationDetail) => {
    if (locations.find((d) => d.id === location.id)) return;
    setLocations((prev) => [...(prev || []), location]);
  };

  const handleDeleteLocation = (location: Location) => {
    setLocations((prev) => prev?.filter((d) => d.id !== location.id));
  };

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
          className="rounded-full w-1/2 cursor-pointer hover:bg-gray-100 px-3 py-2 border"
        >
          {t('statusText')}
        </div>
        <div onClick={() => setModal('location')} className="flex items-center gap-1 ml-auto">
          <IconMapPinFilled className="text-red-600" size={30} />
          <div>{t('selectLocationText')}</div>
        </div>
        <Button onClick={() => setModal('create')} color="teal" radius="xl">
          {t('postVerbText')}
        </Button>
      </div>

      <ModalCreate
        tripId={tripId}
        opened={modal === 'create'}
        onClose={() => setModal('')}
        locations={locations}
        onOpenReview={handleCreatePost}
        onCreateLocation={() => setModal('location')}
        onDeleteLocation={handleDeleteLocation}
      />

      <ModalLocation
        locations={locations}
        opened={modal === 'location'}
        onClose={() => setModal('create')}
        onAddLocation={handleCreateLocation}
        onDeleteLocation={handleDeleteLocation}
      />

      {postId && (
        <ModalReview
          postId={postId}
          locations={locations}
          opened={modal === 'review'}
          onClose={() => {
            setModal('');
            setPostId(undefined);
            setLocations([]);
            refetch();
          }}
        />
      )}
    </div>
  );
};

export default CreatePost;
