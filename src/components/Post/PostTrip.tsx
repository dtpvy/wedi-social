import { profilePost } from '@/mocks/post';
import { ActionIcon, Avatar } from '@mantine/core';
import React from 'react';
import Post from './Post';
import { IconDots } from '@tabler/icons-react';
import { PostTrip } from '@/types/post';
import { Trip } from '@prisma/client';
import dayjs from 'dayjs';

type Props = {
  post: PostTrip;
  refetch: () => void;
};

const PostTrip = ({ post, refetch }: Props) => {
  const { trip, ...postDetail } = post;

  return (
    <div className="bg-white p-5 shadow rounded-lg">
      <div className="flex items-center gap-4">
        <Avatar radius="md" className="border" />
        <div className="mr-auto">
          <div className="font-bold">{trip?.name}</div>
          <div className="text-gray-400 text-sm">
            {`Đã tạo từ ${dayjs(trip?.createdAt).format('DD/MM/YYYY HH:mm')}`}
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
