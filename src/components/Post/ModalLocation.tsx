import { getPlaceList } from '@/api/place';
import type { LocationDetail } from '@/types/location';
import type { Poi } from '@/types/place';
import { getName } from '@/utils/location';
import { trpc } from '@/utils/trpc';
import { Button, Loader, Modal, Popover, TextInput } from '@mantine/core';
import { useDebouncedState } from '@mantine/hooks';
import { useState } from 'react';
import { useQuery } from 'react-query';
import LocationSeletion, { type LocationSeletionProps } from './LocationSeletion';
import useTranslation from '@/hooks/useTranslation';

type Props = {
  opened?: boolean;
  onClose: () => void;
  onAddLocation: (location: LocationDetail) => void;
} & LocationSeletionProps;

const ModalLocation = ({
  opened = false,
  locations,
  onClose,
  onAddLocation,
  onDeleteLocation,
}: Props) => {
  const createLocation = trpc.location.create.useMutation();
  const [openedPopover, setOpenedPopover] = useState(false);
  const [street, setStreet] = useDebouncedState('', 500);

  const { data, isLoading } = useQuery({
    queryKey: ['getPlaceList', street],
    queryFn: () => getPlaceList(street),
    enabled: !!street,
  });

  const handleCreateLocation = async (location: Poi) => {
    try {
      const { title, address, gps, hash, category, img_big } = location;

      const data = await createLocation.mutateAsync({
        name: getName(title),
        placeId: hash,
        address,
        latitude: gps.latitude,
        longitude: gps.longitude,
        category,
        imgUrl: img_big,
      });
      onAddLocation(data);
    } catch (e) {}
  };

  const { t } = useTranslation();

  return (
    <Modal title={t('selectLocationText')} opened={opened} onClose={onClose} size="lg">
      <div className="flex flex-col gap-2">
        <Popover
          opened={openedPopover}
          onClose={() => setOpenedPopover(false)}
          width="target"
          position="bottom"
          closeOnClickOutside={true}
        >
          <Popover.Target>
            <TextInput
              onFocus={() => setOpenedPopover(true)}
              label={t('addressText')}
              placeholder={t('addressText')}
              onChange={(e) => setStreet(e.target.value)}
            />
          </Popover.Target>
          <Popover.Dropdown className="min-h-[100px] max-h-[200px] overflow-auto px-0 py-1 cursor-pointer">
            {isLoading && (
              <div className="text-center">
                <Loader className="" />
              </div>
            )}
            {data?.result.poi.map((place) => (
              <div
                key={place.hash}
                className="py-2 px-3 hover:bg-gray-100"
                onClick={() => {
                  handleCreateLocation(place);
                  setOpenedPopover(false);
                }}
              >
                <div dangerouslySetInnerHTML={{ __html: place.title }} className="font-bold"></div>
                <div className="text-gray-600 text-sm truncate">{place.address}</div>
              </div>
            ))}
          </Popover.Dropdown>
        </Popover>

        <LocationSeletion locations={locations} onDeleteLocation={onDeleteLocation} />

        <div className="flex justify-end gap-2">
          <Button onClick={onClose} color="red">
            {t('cancelText')}
          </Button>
          <Button onClick={onClose} disabled={!location} color="green">
            {t('goOnText')}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ModalLocation;
