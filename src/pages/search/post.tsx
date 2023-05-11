import { MainLayout } from '@/components/Layout';
import SearchLayout from '@/components/Layout/SearchLayout';
import { Post, Reaction } from '@/components/Post';

import useTranslation from '@/hooks/useTranslation';
import { type SearchState } from '@/stores/search';

import { getTimePost } from '@/utils/time';
import { trpc } from '@/utils/trpc';
import { Avatar, Button, Rating } from '@mantine/core';
import { IconMapPinPin, IconMessage } from '@tabler/icons-react';

import { useState, type ReactElement } from 'react';

const Search = ({ search, sort, field, privacy, startDate, endDate }: SearchState) => {
  const { t } = useTranslation();
  const { data: posts, refetch } = trpc.search.post.useQuery({
    search,
    field,
    sort,
    privacy,
    startDate,
    endDate,
  });

  const [post, setPost] = useState(posts?.[0]);

  return (
    <div className="flex gap-6">
      <div className="w-[400px] flex flex-col gap-4 ">
        {posts?.map((post) => (
          <div
            onClick={() => setPost(post)}
            key={post.id}
            className="bg-white rounded-lg shadow cursor-pointer p-3"
          >
            <div className="flex items-center gap-2">
              <Avatar size="lg" radius="xl" />
              <div>
                <div className="font-bold">{post.creator.name}</div>
                <div className="text-sm">{getTimePost(post.createdAt)}</div>
              </div>
            </div>
            <div className="my-2">{post.content}</div>
            <div className="flex gap-2 items-center">
              <Button
                leftIcon={<IconMapPinPin />}
                variant="gradient"
                gradient={{ from: 'teal', to: 'lime', deg: 105 }}
              >
                {post.locations[0].location.name}
              </Button>
              <Reaction post={post} refetch={refetch} />
              <div className="flex items-center gap-1 font-medium mr-auto">
                <IconMessage size={20} />
                {post._count.comments}
              </div>
              {post.reviews[0]?.rating ? (
                <Rating value={post.reviews[0].rating} readOnly />
              ) : (
                <span className="text-sm">{t('notExistReviewText')}</span>
              )}
            </div>
          </div>
        ))}
      </div>
      {!!posts?.length && <Post className="w-full" post={post || posts[0]} refetch={refetch} />}
    </div>
  );
};

Search.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <SearchLayout>{page}</SearchLayout>
    </MainLayout>
  );
};

export default Search;
