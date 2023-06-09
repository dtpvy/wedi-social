import useToast from '@/hooks/useToast';
import useTranslation from '@/hooks/useTranslation';
import useAppStore from '@/stores/store';
import type { CommentDetail } from '@/types/comment';
import { trpc } from '@/utils/trpc';
import { Carousel } from '@mantine/carousel';
import { Avatar, Button, Image, Text } from '@mantine/core';
import { modals } from '@mantine/modals';
import dayjs from '@/utils/dayjs';
import { useCallback, useEffect, useState } from 'react';
import CreateComment from './CreateComment';
import Reaction from './Reaction';

type Props = {
  postId: number;
  creatorId: number;
  refetch: () => void;
};

const Comment = ({ postId, creatorId, refetch }: Props) => {
  const user = useAppStore.use.user();
  const { show } = useToast();
  const [commentId, setCommentId] = useState<number>();

  const query = trpc.comment.infinite.useInfiniteQuery(
    { postId, take: 3 },
    {
      getNextPageParam: (d) => d.nextCursor,
    }
  );

  const utils = trpc.useContext();
  const deleteComment = trpc.comment.delete.useMutation();
  const { hasNextPage } = query;

  const [comments, setComments] = useState(() => {
    const nts = query.data?.pages.map((page) => page.items as unknown as CommentDetail).flat();
    return nts;
  });

  const addComment = useCallback((incoming?: CommentDetail[]) => {
    setComments((current) => {
      const map: Record<CommentDetail['id'], CommentDetail> = {};
      for (const msg of current ?? []) {
        map[msg.id] = msg;
      }
      for (const msg of incoming ?? []) {
        map[msg.id] = msg;
      }
      return Object.values(map).sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    });
  }, []);

  useEffect(() => {
    const msgs = query.data?.pages.map((page) => page.items as unknown as CommentDetail).flat();
    addComment(msgs);
  }, [query.data?.pages, addComment]);

  const { t } = useTranslation();

  trpc.comment.onCreate.useSubscription(undefined, {
    onData(noti) {
      addComment([noti as CommentDetail]);
    },
    onError(err) {
      console.error(t('subscriptionErrorText'), err);
      utils.notification.infinite.invalidate();
    },
  });

  const handleUpdate = (comment: CommentDetail) => {
    setComments((prev) => prev?.map((d) => (d.id === comment.id ? comment : d)));
    setCommentId(undefined);
  };

  const openDeleteModal = (id: number) =>
    modals.openConfirmModal({
      title: t('deletePostText'),
      centered: true,
      children: <Text size="sm">{t('sureDeleteCommentText')}</Text>,
      labels: { confirm: t('yesText'), cancel: t('cancelText') },
      confirmProps: { color: 'red' },
      onCancel: () => null,
      onConfirm: async () => {
        try {
          await deleteComment.mutateAsync({ id });
          show({ type: 'success' });
          setComments((prev) => prev?.filter((d) => d.id !== id));
          refetch();
        } catch (e: any) {
          show({ message: t('errorTryAgainText'), type: 'error' });
        }
      },
    });

  return (
    <div className="flex flex-col gap-3">
      {comments?.map((comment) =>
        commentId !== comment.id ? (
          <div key={comment.id} className="flex gap-3">
            <Avatar radius="xl" />
            <div className="flex-1 flex flex-col gap-2">
              <div className="font-bold">{comment.user?.name}</div>
              <div className="rounded bg-gray-100 w-full p-3">{comment.content}</div>
              {!!comment.imgUrls.length && (
                <Carousel
                  withIndicators
                  slideSize="33.333333%"
                  slideGap="md"
                  loop
                  align="start"
                  slidesToScroll={3}
                  withControls={false}
                >
                  {comment.imgUrls.map((imgUrl, index) => (
                    <Carousel.Slide key={index}>
                      <Image alt="media" src={imgUrl} className="shadow-md" />
                    </Carousel.Slide>
                  ))}
                </Carousel>
              )}
              <div className="flex items-center gap-3">
                <div className="text-gray-600 text-sm">
                  {dayjs(comment.createdAt).format('DD/MM/YYYY HH:mm')}
                </div>
                <Reaction comment={comment} refetch={query.refetch} />
                {(user?.id === comment.userId || creatorId === comment.userId) && (
                  <>
                    <Button
                      onClick={() => openDeleteModal(comment.id)}
                      color="red"
                      size="xs"
                      variant="outline"
                    >
                      {t('deleteText')}
                    </Button>
                    <Button
                      onClick={() => setCommentId(comment.id)}
                      color="gray"
                      size="xs"
                      variant="outline"
                    >
                      {t('editText')}
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        ) : (
          <CreateComment
            key={comment.id}
            postId={postId}
            comment={comment}
            onCancel={() => setCommentId(undefined)}
            onUpdate={handleUpdate}
          />
        )
      )}
      {hasNextPage && (
        <div
          onClick={() => query.fetchNextPage()}
          className="text-center underline text-green-600 cursor-pointer"
        >
          {t('loadMoreText')}
        </div>
      )}
    </div>
  );
};

export default Comment;
