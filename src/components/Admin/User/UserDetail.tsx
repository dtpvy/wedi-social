import dayjs from '@/utils/dayjs';
import { trpc } from '@/utils/trpc';
import { Badge, Button, Card, Group, Modal, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { UserStatus } from '@prisma/client';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const UserDetail = () => {
  const [userBanOpened, userBan] = useDisclosure(false);
  const router = useRouter();
  let id = parseInt(router.query.id as string, 10);
  const { data: user, refetch } = trpc.admin.userDetail.useQuery({ id });

  let setUserStatus = trpc.admin.setUserStatus.useMutation();
  const [currentStatus, setCurrentStatus] = useState<UserStatus>();

  useEffect(() => {
    if (!currentStatus) {
      setCurrentStatus(user?.status);
    }
    setCurrentStatus(user?.status);
  }, [currentStatus, user?.status]);

  const handleSetStatus = (status: UserStatus) => {
    setUserStatus.mutate(
      { id, status },
      {
        onSuccess: () => {
          // setCurrentStatus(status);
          refetch();
          userBan.close();
        },
        onError: () => {
          console.log('something wrong');
        },
      }
    );
  };

  return (
    <div className="flex w-full justify-center my-3">
      <Card shadow="sm" padding="lg" radius="lg" withBorder className="w-9/12 ">
        <Card.Section></Card.Section>
        <div className="flex justify-between items-center pt-5 px-5">
          <div>
            <Text>
              User: <span className="font-medium">{user?.name}</span>{' '}
            </Text>
            <Text size="m">
              Email: <span className="font-medium">{user?.email}</span>{' '}
            </Text>
            <Text>
              Số điện thoại: <span className="font-medium">{user?.phone}</span>
            </Text>
            <Text>
              Ngày tham gia:{' '}
              <span className="font-medium">{dayjs(user?.createdAt).format('DD/MM/YYYY')}</span>
            </Text>
            <Text size="m">
              Số lượng bài viết: <span className="font-medium">{user?.posts.length}</span>
            </Text>
            <Text></Text>
          </div>
          <div className="text-center">
            <Text>Tình trạng:</Text>
            <Badge color={user?.status == 'BANNED' ? 'red' : 'blue'} variant="light">
              {user?.status}
            </Badge>
          </div>
        </div>

        <Modal opened={userBanOpened} onClose={userBan.close} className="text-center">
          <Text size="lg">Bạn có chắc muốn cấm người dùng?</Text>

          <Button
            variant="default"
            color="blue"
            mt="md"
            radius="md"
            onClick={() =>
              handleSetStatus(
                user?.status === UserStatus.BANNED ? UserStatus.NOTVERIFIED : UserStatus.BANNED
              )
            }
          >
            {user?.status !== UserStatus.BANNED ? 'Cấm' : 'Hủy cấm'}
          </Button>
        </Modal>

        <Group position="center">
          <Button variant="outline" color="yellow" mt="md" radius="md" onClick={userBan.open}>
            {user?.status !== UserStatus.BANNED ? 'Cấm người dùng' : 'Hủy cấm người dùng'}
          </Button>
        </Group>
      </Card>
    </div>
  );
};

export default UserDetail;
