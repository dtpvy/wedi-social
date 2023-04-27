import { CommentDetail } from "@/types/comment";
import { trpc } from "@/utils/trpc";
import { Carousel } from "@mantine/carousel";
import {
  ActionIcon,
  Avatar,
  CloseButton,
  Image,
  Textarea,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { IconPhoto, IconSend, IconX } from "@tabler/icons-react";
import { IKUpload } from "imagekitio-react";
import { useContext, useEffect, useRef, useState } from "react";
import { ProfileLayoutContext } from "../Layout/ProfileLayout";

type Props = {
  postId: number;
  comment?: CommentDetail;
  onCancel?: () => void;
  onUpdate?: (comment: CommentDetail) => void;
  onCreate?: () => void;
};

const CreateComment = ({
  postId,
  comment,
  onCancel,
  onUpdate,
  onCreate,
}: Props) => {
  const { data: profile } = useContext(ProfileLayoutContext) || {};
  const uploadRef = useRef<HTMLInputElement>(null);
  const utils = trpc.useContext();

  const create = trpc.comment.create.useMutation();
  const update = trpc.comment.update.useMutation();
  const addNoti = trpc.notification.push.useMutation();

  const [imgUrls, setImgUrls] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState("");

  useEffect(() => {
    setContent(comment?.content || "");
    setImgUrls(comment?.imgUrls || []);
  }, [comment]);

  const handleChooseImage = async (imgUrl: string) => {
    setImgUrls((prev) => [...prev, imgUrl]);
    setLoading(false);
  };

  const handleDeleteImage = async (imgUrl: string) => {
    setImgUrls((prev) => prev.filter((url) => url !== imgUrl));
  };

  const handleCreate = async () => {
    try {
      if (!comment) {
        await create.mutateAsync({ postId, imgUrls, content });
        await addNoti.mutateAsync({
          content: "Vừa mới bình luận vào bài viết của bạn",
          userId: profile?.id as number,
        });
        utils.user.findUser.refetch();
        onCreate && onCreate();
      } else {
        await update.mutateAsync({ id: comment.id, content, imgUrls });
        onUpdate && onUpdate({ ...comment, content, imgUrls });
      }
      setContent("");
      setImgUrls([]);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="flex gap-3">
      <Avatar radius="xl" />
      <div className="flex flex-col gap-1 flex-1">
        <div className="flex gap-3">
          <Textarea
            onChange={(e) => setContent(e.target.value)}
            className="flex-1"
            value={content}
            placeholder="Write comment"
          />
          <div className="flex flex-col gap-1">
            <div className="flex gap-3">
              <ActionIcon
                onClick={() => uploadRef.current?.click()}
                color="teal"
                variant="filled"
                disabled={loading}
              >
                <IconPhoto />
              </ActionIcon>
              <IKUpload
                inputRef={uploadRef}
                folder="/wedi"
                onUploadStart={() => setLoading(true)}
                onSuccess={(file) => handleChooseImage(file.url)}
                onError={() => {
                  notifications.show({
                    message: "Có lỗi xảy ra. Vui lòng thử lại",
                    color: "red",
                    icon: <IconX />,
                  });
                  setLoading(false);
                }}
                accept="image/*"
                className="hidden"
              />
              <ActionIcon
                disabled={!content}
                color="blue"
                size="lg"
                radius="xl"
                variant="filled"
                onClick={handleCreate}
              >
                <IconSend size="1.225rem" />
              </ActionIcon>
            </div>
            {typeof onCancel === "function" && (
              <div onClick={onCancel} className="underline text-gray-600">
                Huỷ
              </div>
            )}
          </div>
        </div>
        {!!imgUrls.length && (
          <Carousel
            withIndicators
            slideSize="33.333333%"
            slideGap="md"
            loop
            align="start"
            slidesToScroll={3}
            withControls={false}
          >
            {imgUrls.map((imgUrl, index) => (
              <Carousel.Slide key={index} className="relative">
                <Image alt="media" src={imgUrl} className="shadow-md" />
                <CloseButton
                  className="absolute top-2 right-7"
                  onClick={() => handleDeleteImage(imgUrl)}
                  title="Close popover"
                  size="md"
                  iconSize={20}
                  radius="xl"
                  variant="filled"
                />
              </Carousel.Slide>
            ))}
          </Carousel>
        )}
      </div>
    </div>
  );
};

export default CreateComment;
