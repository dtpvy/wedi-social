import { TripDetail } from '@/types/trip';
import classNames from '@/utils/classNames';
import { Avatar, Button, Text } from '@mantine/core';
import { IconDots } from '@tabler/icons-react';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import useTranslation from '@/hooks/useTranslation';

type Props = {
  className?: string;
  trip: TripDetail;
};

const Trip = ({ trip, className }: Props) => {
  const router = useRouter();
  const { name, users, posts, imgUrl } = trip;
  const { t } = useTranslation();

  return (
    <div className={classNames('bg-white rounded-lg shadow p-4', className)}>
      <div className="flex gap-4 mb-4">
        <Avatar src={imgUrl} size="xl" />
        <div>
          <Text weight={500} lineClamp={2} size="md">
            {name}
          </Text>
          {users.length && (
            <div className="text-gray-400 text-sm mt-2 mb-1">
              {`Tham gia từ: ${dayjs(users[0].createdAt).format('HH:mm DD/MM/YYYY')}`}
            </div>
          )}
          {posts.length && (
            <div className="text-gray-600 text-sm">
              {`Bài đăng lần cuối: ${dayjs(posts[0].createdAt).format('HH:mm DD/MM/YYYY')}`}
            </div>
          )}
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Button
          onClick={() => router.push(`/trip/${trip.id}`)}
          variant="light"
          className="w-full"
          color="green"
        >
        {t("openGroupText")}
        </Button>
      </div>
    </div>
  );
};

export default Trip;
