import { trpc } from '@/utils/trpc';
import { Avatar, Badge, Button, Text } from '@mantine/core';
import { modals } from '@mantine/modals';
import { notifications } from '@mantine/notifications';
import type { Admin } from '@prisma/client';
import { IconCheck, IconX } from '@tabler/icons-react';
import { useSession } from 'next-auth/react';
import ERROR_MESSAGES from '../../../constants/errorMessage';

type Props = {
  admin: Admin;
  refetch: () => void;
};

const Admin = ({ admin, refetch }: Props) => {
  const deactive = trpc.admin.deactive.useMutation();
  const active = trpc.admin.active.useMutation();
  const { data: session } = useSession();
  const user = session ? session.user : null;

  const openDeleteModal = () =>
    modals.openConfirmModal({
      title: 'Delete your profile',
      centered: true,
      children: <Text size="sm">{`Are you sure you want to deactive ${admin.name}?`}</Text>,
      labels: { confirm: 'Yes', cancel: 'Cancel' },
      confirmProps: { color: 'red' },
      onCancel: () => null,
      onConfirm: async () => {
        try {
          await deactive.mutateAsync({
            id: admin.id,
            createdAt: admin.createdAt,
          });
          refetch();
          notifications.show({
            message: 'Action successfully',
            color: 'green',
            icon: <IconCheck />,
          });
        } catch (e: any) {
          if (e.message === ERROR_MESSAGES.dontHavePermission) {
            notifications.show({
              message: ERROR_MESSAGES.dontHavePermission,
              color: 'red',
              icon: <IconX />,
            });
          } else {
            notifications.show({
              message: 'Có lỗi xảy ra. Vui lòng thử lại',
              color: 'red',
              icon: <IconX />,
            });
          }
        }
      },
    });

  const handleActive = async () => {
    try {
      await active.mutateAsync({
        id: admin.id,
        createdAt: admin.createdAt,
      });
      refetch();
      notifications.show({
        message: 'Action successfully',
        color: 'green',
        icon: <IconCheck />,
      });
    } catch (e: any) {
      if (e.message === ERROR_MESSAGES.dontHavePermission) {
        notifications.show({
          message: ERROR_MESSAGES.dontHavePermission,
          color: 'red',
          icon: <IconX />,
        });
      } else {
        notifications.show({
          message: 'Có lỗi xảy ra. Vui lòng thử lại',
          color: 'red',
          icon: <IconX />,
        });
      }
    }
  };

  return (
    <div className="pb-3 sm:pb-4">
      <div className="flex items-center space-x-4">
        <div className="flex-shrink-0">
          <Avatar src={admin.imgUrl} alt="image" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 text-sm font-medium text-gray-900 truncate">
            {admin.name}
            <Badge color={admin.isDeleted ? 'red' : 'green'}>
              {admin.isDeleted ? 'Deactive' : 'Active'}
            </Badge>
          </div>
          <div className="text-sm text-gray-500 truncate dark:text-gray-400">{admin.email}</div>
        </div>
        {user?.email !== admin.email && (
          <div className="inline-flex items-center text-base font-semibold text-gray-900">
            {!admin.isDeleted ? (
              <Button onClick={openDeleteModal} color="red">
                Deactive
              </Button>
            ) : (
              <Button onClick={handleActive} color="teal">
                Active
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
