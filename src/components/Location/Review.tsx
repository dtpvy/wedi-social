import { ReviewDetail } from '@/types/location';
import { Avatar, Rating, Text } from '@mantine/core';
import { IconStar, IconStarFilled } from '@tabler/icons-react';
import dayjs from 'dayjs';
import React from 'react';

type Props = {
  review: ReviewDetail;
};

const Review = ({ review }: Props) => {
  return (
    <div className="bg-white shadow-md border rounded-lg p-4">
      <div className="flex items-center gap-2">
        <Avatar src={review.user.imgUrl} radius="xl" />
        <div className="mr-auto">
          <div className="font-medium">{review.user.name}</div>
          <div className="text-sm text-gray-400">
            {dayjs(review.createdAt).format('HH:mm DD/MM/YYY')}
          </div>
        </div>
      </div>
      <div className="mt-2 flex flex-col gap-1">
        <Rating readOnly value={review.rating} />
        <Text lineClamp={3}>{review.post.content}</Text>
      </div>
    </div>
  );
};

export default Review;
