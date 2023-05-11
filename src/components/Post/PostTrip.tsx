import useTranslation from '@/hooks/useTranslation';
import type { PostTrip } from '@/types/post';
import { Avatar } from '@mantine/core';
import dayjs from '@/utils/dayjs';
import Post from './Post';

type Props = {
  post: PostTrip;
  refetch: () => void;
};

const PostTrip = ({ post, refetch }: Props) => {
  const { trip, ...postDetail } = post;

  const { t } = useTranslation();

  return (
    <div className="bg-white p-5 shadow rounded-lg">
      <div className="flex items-center gap-4">
        <Avatar radius="md" className="border" />
        <div className="mr-auto">
          <div className="font-bold">{trip?.name}</div>
          <div className="text-gray-400 text-sm">
            {`${t('memberSinceText')} ${dayjs(trip?.createdAt).format('DD/MM/YYYY HH:mm')}`}
          </div>
        </div>
      </div>
      <div className="shadow mt-4">
        <Post post={postDetail} refetch={refetch} />
      </div>
    </div>
  );
};

export default PostTrip;
