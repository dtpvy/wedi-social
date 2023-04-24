import useUserStore from "@/stores/user";
import { LocationDetail } from "@/types/location";
import { getAddress } from "@/utils/location";
import { trpc } from "@/utils/trpc";
import { Carousel } from "@mantine/carousel";
import {
  Avatar,
  Button,
  CloseButton,
  Image,
  Modal,
  Select,
  Textarea,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { Location, Privacy } from "@prisma/client";
import {
  IconEyeEdit,
  IconLoader,
  IconMapPinFilled,
  IconPhoto,
  IconX,
} from "@tabler/icons-react";
import { IKUpload } from "imagekitio-react";
import { useRef, useState } from "react";

type State = {
  content: string;
  imgUrls: string[];
  privacy: Privacy;
};

type Props = {
  opened?: boolean;
  location?: LocationDetail[];
  onClose: () => void;
  onOpenReview: () => void;
  onCreateLocation: () => void;
  onEditLocation: (location: Location) => void;
  onDeleteLocation: (location: Location) => void;
};

const ModalCreate = ({
  opened = false,
  location,
  onClose,
  onCreateLocation,
  onEditLocation,
  onDeleteLocation,
  onOpenReview,
}: Props) => {
  const mediaRef = useRef<HTMLInputElement>(null);
  const user = useUserStore((state) => state.user);
  const create = trpc.post.create.useMutation();

  const [mediaLoading, setMediaLoading] = useState(false);
  const [state, setState] = useState<State>({
    content: "",
    imgUrls: [],
    privacy: Privacy.PUBLIC,
  });

  const onChangeField = (field: keyof State, value: unknown) => {
    setState((prev) => ({ ...prev, [field]: value }));
  };

  const handleChooseImage = async (imgUrl: string) => {
    onChangeField("imgUrls", [...state.imgUrls, imgUrl]);
    setMediaLoading(false);
  };

  const handleDeleteImage = async (imgUrl: string) => {
    onChangeField(
      "imgUrls",
      state.imgUrls.filter((url) => url !== imgUrl)
    );
  };

  const handleCreate = async () => {
    if (!location) return;
    try {
      await create.mutate({ ...state, locationIds: location.map((d) => d.id) });
      onOpenReview();
    } catch {}
  };

  return (
    <Modal
      onClose={onClose}
      opened={opened}
      size="lg"
      title={<div className="font-medium text-lg">Create a post</div>}
    >
      <div className="flex gap-3 items-center mb-3">
        <Avatar src={user?.imgUrl} radius="xl" />
        <div className="flex-1">{user?.name}</div>
        <Select
          value={state.privacy}
          placeholder="Privacy"
          onChange={(value) => onChangeField("privacy", value)}
          icon={<IconEyeEdit size="1rem" />}
          data={[
            { value: Privacy.PUBLIC, label: "Công khai" },
            { value: Privacy.FRIEND, label: "Bạn bè" },
            { value: Privacy.PRIVATE, label: "Chỉ mình tôi" },
          ]}
        />
      </div>
      <Textarea
        value={state.content}
        onChange={(e) => onChangeField("content", e.target.value)}
        maxLength={500}
        minRows={10}
        placeholder="What do you think?"
      />
      {!!location?.length && (
        <Carousel
          withIndicators
          slideSize="33.333333%"
          slideGap="md"
          loop
          align="start"
          slidesToScroll={3}
          className="my-3"
          withControls={false}
        >
          {location.map((data) => (
            <Carousel.Slide key={data.id} className="relative">
              <div
                onClick={() => onEditLocation(data)}
                className="p-2 bg-teal-700 text-white cursor-pointer"
              >
                <div className="font-bold">{data.name}</div>
                <div className="text-sm font-medium">{getAddress(data)}</div>
              </div>
              <CloseButton
                onClick={() => onDeleteLocation(data)}
                title="Close popover"
                size="md"
                iconSize={20}
                radius="xl"
                className="absolute top-0 right-4"
              />
            </Carousel.Slide>
          ))}
        </Carousel>
      )}
      {!!state.imgUrls.length && (
        <Carousel
          withIndicators
          height={200}
          slideSize="33.333333%"
          slideGap="md"
          loop
          align="start"
          slidesToScroll={3}
          className="my-3"
          withControls={false}
        >
          {state.imgUrls.map((imgUrl, index) => (
            <Carousel.Slide key={index} className="flex justify-center">
              <Image alt="media" src={imgUrl} />
              <CloseButton
                onClick={() => handleDeleteImage(imgUrl)}
                title="Close popover"
                size="md"
                iconSize={20}
                radius="xl"
              />
            </Carousel.Slide>
          ))}
        </Carousel>
      )}

      <div className="flex items-center gap-3 mt-3">
        <Button
          onClick={onCreateLocation}
          leftIcon={<IconMapPinFilled className="text-red-600" />}
          variant="outline"
          color="red"
        >
          Chọn địa điểm
        </Button>
        <Button
          color="teal"
          variant="outline"
          leftIcon={
            mediaLoading ? (
              <IconLoader />
            ) : (
              <IconPhoto className="text-teal-600" />
            )
          }
          onClick={() => mediaRef.current?.click()}
          disabled={mediaLoading}
        >
          Choose media
        </Button>
        <Button
          onClick={handleCreate}
          disabled={!location || !state.content}
          className="ml-auto"
        >
          Create
        </Button>
        <IKUpload
          inputRef={mediaRef}
          folder="/wedi"
          onUploadStart={() => setMediaLoading(true)}
          onSuccess={(file) => handleChooseImage(file.url)}
          onError={() => {
            notifications.show({
              message: "Có lỗi xảy ra. Vui lòng thử lại",
              color: "red",
              icon: <IconX />,
            });
            setMediaLoading(false);
          }}
          accept="image/*"
          className="hidden"
        />
      </div>
    </Modal>
  );
};

export default ModalCreate;
