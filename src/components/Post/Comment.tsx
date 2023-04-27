import useUserStore from "@/stores/user";
import { CommentDetail } from "@/types/comment";
import { trpc } from "@/utils/trpc";
import { Carousel } from "@mantine/carousel";
import { Avatar, Button, Image, Text } from "@mantine/core";
import { modals } from "@mantine/modals";
import { notifications } from "@mantine/notifications";
import { IconCheck, IconX } from "@tabler/icons-react";
import dayjs from "dayjs";
import { useCallback, useEffect, useState } from "react";
import CreateComment from "./CreateComment";

type Props = {
  postId: number;
  creatorId: number;
  refetch: () => void;
};

const Comment = ({ postId, creatorId, refetch }: Props) => {
  const user = useUserStore((state) => state.user);
  const [commentId, setCommentId] = useState<number>();

  const query = trpc.comment.infinite.useInfiniteQuery(
    { postId, take: 5 },
    {
      getNextPageParam: (d) => d.nextCursor,
    }
  );

  const utils = trpc.useContext();
  const deleteComment = trpc.comment.delete.useMutation();
  const { hasNextPage } = query;

  const [comments, setComments] = useState(() => {
    const nts = query.data?.pages
      .map((page) => page.items as unknown as CommentDetail)
      .flat();
    return nts;
  });

  const addComment = useCallback((incoming?: CommentDetail[]) => {
    setComments((current) => {
      const map: Record<CommentDetail["id"], CommentDetail> = {};
      for (const msg of current ?? []) {
        map[msg.id] = msg;
      }
      for (const msg of incoming ?? []) {
        map[msg.id] = msg;
      }
      return Object.values(map).sort(
        (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
      );
    });
  }, []);

  useEffect(() => {
    const msgs = query.data?.pages
      .map((page) => page.items as unknown as CommentDetail)
      .flat();
    addComment(msgs);
  }, [query.data?.pages, addComment]);

  trpc.comment.onCreate.useSubscription(undefined, {
    onData(noti) {
      addComment([noti as CommentDetail]);
    },
    onError(err) {
      console.error("Subscription error:", err);
      utils.notification.infinite.invalidate();
    },
  });

  const handleUpdate = (comment: CommentDetail) => {
    setComments((prev) =>
      prev?.map((d) => (d.id === comment.id ? comment : d))
    );
    setCommentId(undefined);
  };

  const openDeleteModal = (id: number) =>
    modals.openConfirmModal({
      title: "Delete your profile",
      centered: true,
      children: <Text size="sm">Are you sure delete this comment</Text>,
      labels: { confirm: "Yes", cancel: "Cancel" },
      confirmProps: { color: "red" },
      onCancel: () => null,
      onConfirm: async () => {
        try {
          await deleteComment.mutateAsync({ id });
          notifications.show({
            message: "Action successfully",
            color: "green",
            icon: <IconCheck />,
          });
          setComments((prev) => prev?.filter((d) => d.id !== id));
          refetch();
        } catch (e: any) {
          notifications.show({
            message: "Có lỗi xảy ra. Vui lòng thử lại",
            color: "red",
            icon: <IconX />,
          });
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
              <div className="rounded bg-gray-100 w-full p-3">
                {comment.content}
              </div>
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
                  {dayjs(comment.createdAt).format("DD/MM/YYYY HH:mm")}
                </div>
                {(user?.id === comment.userId ||
                  creatorId === comment.userId) && (
                  <>
                    <Button
                      onClick={() => openDeleteModal(comment.id)}
                      color="red"
                      size="xs"
                      variant="outline"
                    >
                      Xoá
                    </Button>
                    <Button
                      onClick={() => setCommentId(comment.id)}
                      color="gray"
                      size="xs"
                      variant="outline"
                    >
                      Edit
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
        <div className="text-center underline text-green-600">Xem thêm</div>
      )}
    </div>
  );
};

export default Comment;
