import React from 'react';
import { Card, Image, Text, Button, Group, Divider } from '@mantine/core';
import dayjs from 'dayjs';
import { trpc } from '@/utils/trpc';

type Props = {
  post: any;
};

const Post = ({ post }: Props) => {
  const { id, content, imgURL, userName, numOfReactions, numOfComments, locationId, dateCreated } =
    post;

  let { data: location } = trpc.admin.locationDetail.useQuery({ locationId });

  return (
    <Card shadow="sm" radius="lg" withBorder className="mt-3 px-8" key={id}>
      <p className="my-0 text-gray-300">Post#{id}</p>
      <Group position="apart" className="mx-3">
        <p className="my-0">{userName}</p>
        <Group>
          <p className="my-0">Địa chỉ:{location?.address}</p>
        </Group>
      </Group>
      <Image
        radius="md"
        maw={240}
        src={imgURL}
        alt="Random unsplash image"
        caption=""
        className="mx-auto"
      />
      <p className="text-gray-800 ml-3">{content}</p>
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
