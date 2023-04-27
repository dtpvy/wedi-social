import { LocationDetail } from "@/types/location";
import classNames from "@/utils/classNames";
import { trpc } from "@/utils/trpc";
import { Button, Modal, Rating } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { IconCheck, IconX } from "@tabler/icons-react";
import { useMemo, useState } from "react";

type Props = {
  postId: number;
  locations: LocationDetail[];
  opened?: boolean;
  onClose: () => void;
};

const ModalReview = ({ postId, locations, opened = false, onClose }: Props) => {
  const [hide, setHide] = useState<number[]>([]);

  const create = trpc.review.add.useMutation();
  const { data } = trpc.review.find.useQuery(
    {
      locationIds: locations?.map((d) => d.id) || [],
    },
    { enabled: opened && postId !== undefined }
  );

  const reviewed = useMemo(() => {
    return locations?.map((location) => ({
      ...location,
      review: data?.find((d) => d.locationId === location.id),
    }));
  }, [data, locations]);

  const [rating, setRating] = useState<Record<number, number>>(
    reviewed.reduce(
      (rating: Record<string, number>, d) => ({
        ...rating,
        [d.id]: d.review?.rating || 1,
      }),
      {}
    )
  );

  const handleHide = (id: number) => {
    setHide((prev) => [...prev, id]);
    if (hide.length + 1 >= locations.length) onClose();
  };

  const handleReview = async (locationId: number) => {
    try {
      await create.mutateAsync({
        postId,
        locationId,
        rating: rating[locationId] as number,
      });
      notifications.show({
        message: "Review successfully",
        color: "green",
        icon: <IconCheck />,
      });
      handleHide(locationId);
    } catch {
      notifications.show({
        message: "Có lỗi xảy ra. Vui lòng thử lại",
        color: "red",
        icon: <IconX />,
      });
    }
  };

  return (
    <Modal title="Review Location" opened={opened} onClose={onClose} size="lg">
      <div className="flex flex-col gap-3">
        {reviewed.map((review) => {
          return (
            <div
              key={review.id}
              className={classNames(
                "flex flex-col gap-2 shadow border p-3 rounded",
                { hidden: hide.includes(review.id) }
              )}
            >
              {!review.review ? (
                <div>
                  Bạn chưa review địa điểm {review.name}. Khi bạn đánh giá bài
                  viết của bạn sẽ gắn với đánh giá:
                </div>
              ) : (
                <div>
                  Bạn đã review địa điểm {review.name}. Bạn có muốn cập nhật
                  đánh giá:
                </div>
              )}
              <div className="flex gap-2 items-center">
                <div>Đánh giá:</div>
                <Rating
                  onChange={(value) =>
                    setRating((prev) => ({ ...prev, [review.id]: value }))
                  }
                  value={rating[review.id]}
                  size="xl"
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button color="red" onClick={() => handleHide(review.id)}>
                  Bỏ qua
                </Button>
                <Button onClick={() => handleReview(review.id)} color="green">
                  Đánh giá
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </Modal>
  );
};

export default ModalReview;
