import React from 'react';
import { Card, Image, Text, Button, Group, Divider } from '@mantine/core';
import dayjs from 'dayjs';
import { trpc } from '@/utils/trpc';
import RatingDisplay from '../RatingDisplay';

type Props = {
  post: any;
};

const Post = ({ post }: Props) => {
  const {
    id,
    content,
    imgUrls,
    userName,
    numOfReactions,
    numOfComments,
    locationId,
    dateCreated,
    userId,
    privacy,
  } = post;

  let { data: location } = trpc.admin.locationDetail.useQuery({ locationId });
  let { data: rating } = trpc.admin.postRating.useQuery({ userId, postId: id, locationId });
  return (
    <Card shadow="sm" radius="lg" withBorder className="mt-3 px-8" key={id}>
      <p className="my-0 text-gray-300">Post#{id}</p>
      <div className="mx-3 ">
        <div>
          <div className="flex justify-between">
            <p className="my-0">{userName}</p>
            <p className="my-0 mr-5">Chế độ: {privacy}</p>
          </div>

          <p className="text-gray-800 ml-1">{content}</p>
          {imgUrls && (
            <Image radius="md" maw={240} src={imgUrls} alt="" caption="" className="mx-auto" />
          )}
        </div>
        <div className="flex flex-col items-center">
          <p className="my-0">Địa điểm: {location?.name}</p>
          <RatingDisplay rating={rating?.rating || 0} maxRating={5} numRatings={1} />
        </div>
      </div>

      <Divider my="sm" />

      <Group position="apart">
        <p className="my-0">Ngày: {dayjs(dateCreated).format('DD/MM/YYYY')} </p>
        <p className="my-0">Lượt tương tác: {numOfReactions}</p>
        <p className="my-0">Lượt comment: {numOfComments}</p>
      </Group>
    </Card>
  );
};

export default Post;
