<<<<<<< HEAD
import classNames from "@/utils/classNames";
import { Avatar, Button, Text } from "@mantine/core";
import { IconDots } from "@tabler/icons-react";
import useTranslation from "@/hooks/useTranslation"; 
=======
import { TripDetail } from '@/types/trip';
import classNames from '@/utils/classNames';
import { Avatar, Button, Text } from '@mantine/core';
import { IconDots } from '@tabler/icons-react';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';

>>>>>>> 2f8308d4a445472f12d75e18f18f1f8757f8d31f
type Props = {
  className?: string;
  trip: TripDetail;
};

<<<<<<< HEAD
const Trip = ({ className }: Props) => {
  const { t } = useTranslation();
=======
const Trip = ({ trip, className }: Props) => {
  const router = useRouter();
  const { name, users, posts, imgUrl } = trip;

>>>>>>> 2f8308d4a445472f12d75e18f18f1f8757f8d31f
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
          <div className="text-gray-600 text-sm">
            {`Bài đăng lần cuối: ${dayjs(posts[0].createdAt).format('HH:mm DD/MM/YYYY')}`}
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2">
<<<<<<< HEAD
        <Button variant="light" className="w-full" color="green">
        {t("openGroupText")}
=======
        <Button
          onClick={() => router.push(`/trip/${trip.id}`)}
          variant="light"
          className="w-full"
          color="green"
        >
          Xem nhóm
>>>>>>> 2f8308d4a445472f12d75e18f18f1f8757f8d31f
        </Button>
      </div>
    </div>
  );
};

export default Trip;
