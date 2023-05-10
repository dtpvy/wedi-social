import { RequestDetail } from '@/types/request';
import { trpc } from '@/utils/trpc';
import { ActionIcon, Avatar, Text } from '@mantine/core';
import { modals } from '@mantine/modals';
import { notifications } from '@mantine/notifications';
import {
  IconCheck,
  IconDots,
  IconMessages,
  IconPaperclip,
  IconTrack,
  IconTrash,
  IconX,
} from '@tabler/icons-react';
import dayjs from 'dayjs';
import React from 'react';
import useTranslation from '@/hooks/useTranslation';

type Props = {
  request: RequestDetail;
};

const Request = ({ request }: Props) => {
  const { t } = useTranslation();
  const { id, createdAt, title, content, reply } = request;
  const deleteRequest = trpc.request.delete.useMutation();
  const utils = trpc.useContext();

  const openDeleteModal = () =>
    modals.openConfirmModal({
      title: `${t('titleDeleteFriendText')}`,
      centered: true,
      children: <Text size="sm">{`${t('areYouSureDeleteThisRequestText')}`}</Text>,
      labels: { confirm: t('yesText'), cancel: t('cancelText') },
      confirmProps: { color: 'red' },
      onCancel: () => null,
      onConfirm: async () => {
        try {
          await deleteRequest.mutateAsync({ id });
          notifications.show({
            message: t('addsuccessText'),
            color: 'green',
            icon: <IconCheck />,
          });
          utils.request.requestList.refetch();
        } catch (e: any) {
          notifications.show({
            message: t('errorTryAgainText'),
            color: 'red',
            icon: <IconX />,
          });
        }
      },
    });

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <div className="flex items-center gap-4 mb-4">
        <Avatar radius="xl" />
        <div className="font-bold">{t('requestText')} #{id}</div>
        <div className="ml-auto">{dayjs(createdAt).format('HH:mm DD/MM/YYYY')}</div>
        <ActionIcon onClick={openDeleteModal} variant="light" color="red" radius="xl">
          <IconTrash size={20} />
        </ActionIcon>
      </div>
      <div className="font-medium text-lg mb-3">{title}</div>
      <Text lineClamp={3}>{content}</Text>
      <div className="flex items-center gap-4 mt-4 justify-between">
        {reply[0]?.admin && (
          <div>
            <Avatar src={reply[0].admin.imgUrl} radius="xl" />
            <div>{reply[0].admin.name}</div>
          </div>
        )}
        <div className="flex items-center gap-2 ml-auto">
          <IconMessages />
          <span>{reply.length ? reply.length : t('statusresponseText')}</span>
        </div>
      </div>
    </div>
  );
};

export default Request;
