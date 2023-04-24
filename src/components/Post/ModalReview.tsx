import { LocationDetail } from "@/types/location";
import { trpc } from "@/utils/trpc";
import { Button, Modal, Rating } from "@mantine/core";
import React, { useMemo } from "react";

type Props = {
  locations?: LocationDetail[];
  opened?: boolean;
  onClose: () => void;
};

const ModalReview = ({ locations, opened = false, onClose }: Props) => {
  const { data } = trpc.review.find.useQuery({
    locationIds: locations?.map((d) => d.id) || [],
  });

  const reviewed = useMemo(() => {
    return locations?.map((location) => ({
      ...location,
      isReviewed: data?.find((d) => d.locationId === location.id),
    }));
  }, [data, locations]);

  return (
    <Modal title="Review Location" opened={opened} onClose={() => {}} size="lg">
      <div className="flex flex-col gap-2">
        {reviewed ? (
          <div>
            Bạn chưa review địa điểm này. Khi bạn đánh giá bài viết của bạn sẽ
            gắn với đánh giá:
          </div>
        ) : (
          <div>Bạn đã review địa điểm này. Bạn có muốn cập nhật đánh giá:</div>
        )}
        <div className="flex gap-2 items-center">
          <div>Đánh giá:</div>
          <Rating defaultValue={1} size="xl" />
        </div>
        <div className="flex justify-end gap-2">
          <Button color="red" onClick={onClose}>
            Bỏ qua
          </Button>
          <Button color="green">Đánh giá</Button>
        </div>
      </div>
    </Modal>
  );
};

export default ModalReview;
