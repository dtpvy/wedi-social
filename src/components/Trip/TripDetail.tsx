import useTranslation from '@/hooks/useTranslation';
import { type TripSearch } from '@/types/trip';
import { trpc } from '@/utils/trpc';
import { Avatar, Button, Image } from '@mantine/core';
import { Event } from '../Event';
import { Post } from '../Post';
import useAppStore from '@/stores/store';

type Props = {
  trip: TripSearch;
};

const TripDetail = ({ trip }: Props) => {
  const { t } = useTranslation();
  const user = useAppStore.use.user();

  console.log(trip);

  const { data: post, refetch: refetchPost } = trpc.post.get.useQuery(
    { id: trip.posts?.[0]?.id as never },
    { enabled: !!trip.posts?.[0].id }
  );

  const { data: schedule, refetch: refetchSchedule } = trpc.schedule.get.useQuery(
    { id: trip.schedules?.[0]?.id as never },
    { enabled: !!trip.schedules?.[0].id }
  );

  const joined = (data: typeof trip) => {
    return !!data?.users.find((d) => d.userId === user?.id);
  };

  return (
    <div className="bg-white shadow rounded-lg flex-[2] pb-10">
      <div className="relative mb-10">
        <Image src={trip.bgUrl} alt="bg" height={200} width="100%" />
        <div className="bg-white absolute p-2 -bottom-5 left-5 rounded-3xl">
          <Avatar src={trip.imgUrl} size={100} radius="lg" />
        </div>
      </div>
      <div className="px-5">
        <div className="flex justify-between items-center">
          <div className="font-bold text-3xl">{trip.name}</div>
          {!joined(trip) && (
            <Button color="teal" variant="outline">
              {t('participatebtnText')}
            </Button>
          )}
        </div>
        <Button.Group className="my-3">
          <Button variant="default">
            <div className="mr-3">{t('totalJoinedText')}:</div>
            <div>
              {trip.users.length} {t('peopleText')}
            </div>
          </Button>
          <Button variant="default">
            <div className="mr-3">{t('totalPostText')}:</div>
            <div>
              {trip._count.posts} {t('postsText')}
            </div>
          </Button>
          <Button variant="default">
            <div className="mr-3">{t('totalScheduleText')}:</div>
            <div>
              {trip._count.schedules} {t('schedulesText')}
            </div>
          </Button>
        </Button.Group>

        <div className="font-medium text-md mt-5">{t('mostRecentScheduleText')}</div>
        {!!schedule ? (
          <Event schedule={schedule} refetch={refetchSchedule} />
        ) : (
          'Chưa có lịch trình nào'
        )}

        <div className="font-medium text-md mt-5">{t('mostRecentPostText')}</div>
        {!!post ? <Post post={post} refetch={refetchPost} /> : 'Chưa có bài viết nào'}
      </div>
    </div>
  );
};

export default TripDetail;
