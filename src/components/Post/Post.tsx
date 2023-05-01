import { PostDetail } from '@/types/post';
import classNames from '@/utils/classNames';
import { Carousel } from '@mantine/carousel';
import { Avatar, Button, Card, Image, Rating, Text } from '@mantine/core';
import { IconEyeCog, IconLockSquare, IconMessage, IconWorld } from '@tabler/icons-react';
import dayjs from 'dayjs';
import { useState } from 'react';
import Comment from './Comment';
import CreateComment from './CreateComment';
import PostAction from './PostAction';
import Reaction from './Reaction';
import { Privacy } from '@prisma/client';
import useUserStore from '@/stores/user';

type Props = {
  post: PostDetail;
  className?: string;
  refetch: () => void;
};

const PrivacyConfig = {
  [Privacy.PUBLIC]: {
    icon: <IconWorld />,
    text: 'publicText',
  },
  [Privacy.FRIEND]: {
    icon: <IconEyeCog />,
    text: 'friendText',
  },
  [Privacy.PRIVATE]: {
    icon: <IconLockSquare />,
    text: 'privateText',
  },
};

const Post = ({ post, className, refetch }: Props) => {
  const [opened, setOpened] = useState(false);
  const user = useUserStore.use.user();
  const { creator, createdAt, content, _count, imgUrls, locations, reviews, privacy } = post;

  return (
    <div className={classNames('shadow rounded-lg p-4 bg-white', className)}>
      <div className="flex items-center gap-2 mb-4">
        <Avatar radius="xl" src={creator.imgUrl} />
        <div className="mr-auto">
          <div className="font-medium">{creator.name}</div>
          <div className="text-sm text-gray-400 flex items-center">
            {PrivacyConfig[privacy].icon}
            <div className="ml-1 mr-4">{PrivacyConfig[privacy].text}</div>
            <div className="font-medium">{dayjs(createdAt).format('DD-MM-YYYY HH:mm')}</div>
          </div>
        </div>
        {user?.id === post.creatorId && <PostAction post={post} refetch={refetch} />}
      </div>
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        {!!locations?.length && (
          <Carousel
            slideGap="md"
            align="start"
            className="w-full bg-gray-100 bg-opacity-50"
            styles={{
              control: {
                '&[data-inactive]': {
                  opacity: 0,
                  cursor: 'default',
                },
              },
            }}
          >
            {locations.map((data) => {
              const review = reviews.find((d) => d.locationId === data.location.id);
              return (
                <Carousel.Slide key={data.location.id}>
                  <div className="p-2 cursor-pointer flex flex-col justify-center rounded-lg">
                    <Image alt="location" height={300} src={data.location.imgUrl} fit="contain" />
                    <div className="p-3 flex flex-col gap-1">
                      <div className="font-bold">{data.location.name}</div>
                      <div className="text-gray-600">{data.location.address}</div>
                      {!!review && <Rating readOnly value={review.rating} size="lg" />}
                    </div>
                  </div>
                </Carousel.Slide>
              );
            })}
            {imgUrls.map((imgUrl, index) => {
              return (
                <Carousel.Slide
                  key={`imgUrl_${index}`}
                  className="flex flex-col items-center justify-center"
                >
                  <Image alt="location" height={200} src={imgUrl} fit="contain" />
                </Carousel.Slide>
              );
            })}
          </Carousel>
        )}
        {!!imgUrls.length && (
          <Carousel
            slideSize="33.333333%"
            slideGap="md"
            loop
            align="start"
            slidesToScroll={3}
            withControls={imgUrls.length > 3}
          ></Carousel>
        )}
        <Text size="sm" lineClamp={5} className="mt-3">
          {content}
        </Text>
      </Card>
      <div className="flex items-center gap-4 mt-4">
        <Reaction post={post} refetch={refetch} />

        <Button
          onClick={() => setOpened(!opened)}
          variant="white"
          leftIcon={<IconMessage />}
          color="dark"
        >
          {_count.comments}
        </Button>
      </div>

      <div
        className={classNames('p-3 mt-3 shadow border rounded', {
          hidden: !opened,
        })}
      >
        <CreateComment postId={post.id} onCreate={refetch} creator={post.creator} />
        <div className="mt-3 flex flex-col gap-3">
          <Comment postId={post.id} creatorId={post.creatorId} refetch={refetch} />
        </div>
      </div>
    </div>
  );
};

export default Post;
