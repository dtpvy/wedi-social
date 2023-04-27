import { CommentDetail } from "@/types/comment";
import { PostDetail } from "@/types/post";
import { trpc } from "@/utils/trpc";
import { Button, HoverCard, Image } from "@mantine/core";
import { Reaction } from "@prisma/client";
import { IconIcons } from "@tabler/icons-react";

type Props = {
  post?: PostDetail;
  comment?: CommentDetail;
  refetch: () => void;
};

const Reaction = ({ post, comment, refetch }: Props) => {
  const react = trpc.reaction.react.useMutation();
  const utils = trpc.useContext();
  const addNoti = trpc.notification.push.useMutation();
  const { reaction, _count, reactions } = post || comment || {};

  const handleReaction = (reaction: Reaction) => {
    react.mutate(
      { reactionId: reaction.id, postId: post?.id, commentId: comment?.id },
      {
        onSuccess: (data) => {
          refetch();
          if (!data) return;
          const content = post
            ? "Vừa mới thả cảm xúc vô bài viết của bạn"
            : "Vừa mới thả cảm xúc vô bình luận của bạn";
          addNoti.mutate({
            content,
            userId: (post?.creatorId || comment?.userId) as number,
            imgUrl: reaction.imgUrl,
          });
          utils.user.findUser.refetch();
        },
      }
    );
  };

  return (
    <HoverCard position="top" withArrow shadow="md" openDelay={500}>
      <HoverCard.Target>
        {!reactions?.length ? (
          <Button
            variant="white"
            leftIcon={<IconIcons />}
            color="dark"
            className="relative"
          >
            {_count?.reactions}
          </Button>
        ) : (
          <div className="flex gap-1 items-center ml-3 mr-5">
            <Image
              alt={reactions[0].reaction.name}
              src={reactions[0].reaction.imgUrl}
              width={30}
              height={30}
            />
            {_count?.reactions}
          </div>
        )}
      </HoverCard.Target>
      <HoverCard.Dropdown>
        <div className="flex justify-between gap-3">
          {reaction?.map((d) => (
            <div
              onClick={() => handleReaction(d)}
              key={d.id}
              className="transition-all ease-in-out hover:scale-110 duration-300 flex gap-1 items-center cursor-pointer"
            >
              <Image alt={d.name} src={d.imgUrl} width={30} height={30} />
              {d.count}
            </div>
          ))}
        </div>
      </HoverCard.Dropdown>
    </HoverCard>
  );
};

export default Reaction;
