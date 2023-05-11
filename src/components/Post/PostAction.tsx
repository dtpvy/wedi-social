import useToast from '@/hooks/useToast';
import useTranslation from '@/hooks/useTranslation';
import type { LocationDetail } from '@/types/location';
import type { PostDetail } from '@/types/post';
import { trpc } from '@/utils/trpc';
import { ActionIcon, Popover, Text } from '@mantine/core';
import { modals } from '@mantine/modals';
import type { Location } from '@prisma/client';
import { IconDots } from '@tabler/icons-react';
import { useState } from 'react';
import ModalCreate from './ModalCreate';
import ModalLocation from './ModalLocation';
import ModalReview from './ModalReview';

type Props = {
  post: PostDetail;
  refetch: () => void;
};

const PostAction = ({ post, refetch }: Props) => {
  const { content, privacy, imgUrls, locations: rawLocations } = post;
  const { show } = useToast();

  const [modal, setModal] = useState('');
  const [opened, setOpened] = useState(false);
  const [locations, setLocations] = useState<LocationDetail[]>(
    rawLocations.map((d) => d.location) || []
  );

  const handleCreateLocation = (location: LocationDetail) => {
    if (locations.find((d) => d.id === location.id)) return;
    setLocations((prev) => [...(prev || []), location]);
  };

  const handleDeleteLocation = (location: Location) => {
    setLocations((prev) => prev?.filter((d) => d.id !== location.id));
  };

  const deletePost = trpc.post.delete.useMutation();
  const { t } = useTranslation();
  const openDeleteModal = () => {
    setOpened(false);
    modals.openConfirmModal({
      title: t('deletePostText'),
      centered: true,
      children: <Text size="sm">{t('areYouSureDeleteThisPostText')}</Text>,
      labels: { confirm: t('yesText'), cancel: t('cancelText') },
      confirmProps: { color: 'red' },
      onCancel: () => null,
      onConfirm: async () => {
        try {
          await deletePost.mutateAsync({ id: post.id });
          show({ message: t('addsuccessText'), type: 'success' });
          refetch();
        } catch (e: any) {
          show({ message: t('errorTryAgainText'), type: 'error' });
        }
      },
    });
  };

  const handleOpen = () => {
    setOpened(false);
    setModal('create');
  };

  const handleUpdatePost = () => {
    refetch();
    setModal('review');
  };

  return (
    <Popover
      opened={opened}
      closeOnClickOutside
      width={200}
      position="bottom"
      withArrow
      shadow="md"
    >
      <Popover.Target>
        <ActionIcon onClick={() => setOpened(!opened)} color="green" radius="xl">
          <IconDots size="20" />
        </ActionIcon>
      </Popover.Target>
      <Popover.Dropdown className="px-0 py-1">
        <div
          onClick={openDeleteModal}
          className="text-red-600 cursor-pointer p-2 text-center font-medium hover:bg-red-50"
        >
          {t('deletePostText')}
        </div>
        <div
          onClick={handleOpen}
          className="text-gray-600 cursor-pointer p-2 text-center font-medium hover:bg-gray-100"
        >
          {t('editPostText')}
        </div>
      </Popover.Dropdown>
      <ModalCreate
        postId={post.id}
        content={content || ''}
        privacy={privacy}
        imgUrls={imgUrls}
        opened={modal === 'create'}
        onClose={() => setModal('')}
        locations={locations}
        onOpenReview={handleUpdatePost}
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

      {modal === 'review' && (
        <ModalReview
          opened
          postId={post.id}
          locations={locations}
          onClose={() => {
            setModal('');
            setLocations([]);
            refetch();
          }}
        />
      )}
    </Popover>
  );
};

export default PostAction;
