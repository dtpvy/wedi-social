import useToast from '@/hooks/useToast';
import useTranslation from '@/hooks/useTranslation';
import type { LocationDetail } from '@/types/location';
import classNames from '@/utils/classNames';
import { trpc } from '@/utils/trpc';
import { Button, Modal, Rating } from '@mantine/core';
import { useMemo, useState } from 'react';

type Props = {
  postId: number;
  locations: LocationDetail[];
  opened?: boolean;
  onClose: () => void;
};

const ModalReview = ({ postId, locations, opened = false, onClose }: Props) => {
  const { show } = useToast();

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

  const { t } = useTranslation();

  const handleReview = async (locationId: number) => {
    try {
      await create.mutateAsync({
        postId,
        locationId,
        rating: rating[locationId] as number,
      });

      show({ message: t('reviewSuccessfullyText'), type: 'success' });
      handleHide(locationId);
    } catch {
      show({ message: t('errorTryAgainText'), type: 'error' });
    }
  };

  return (
    <Modal title="Review Location" opened={opened} onClose={onClose} size="lg">
      <div className="flex flex-col gap-3">
        {reviewed.map((review) => {
          return (
            <div
              key={review.id}
              className={classNames('flex flex-col gap-2 shadow border p-3 rounded', {
                hidden: hide.includes(review.id),
              })}
            >
              {!review.review ? (
                <div>
                  {t('youDontReviewLocationText')} {review.name}
                  {t('whenYouRateYourArticleWillBeTiedToTheRating:')}
                </div>
              ) : (
                <div>
                  {t('youReviewedLocationText')} {review.name}
                  {t('doYouWantToUpdateTheReview')}
                </div>
              )}
              <div className="flex gap-2 items-center">
                <div>{t('reviewText')}:</div>
                <Rating
                  onChange={(value) => setRating((prev) => ({ ...prev, [review.id]: value }))}
                  value={rating[review.id]}
                  size="xl"
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button color="red" onClick={() => handleHide(review.id)}>
                  {t('ignoreText')}
                </Button>
                <Button onClick={() => handleReview(review.id)} color="green">
                  {t('reviewText')}
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
