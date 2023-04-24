import { getPlaceList } from "@/api/place";
import useLocation from "@/hooks/useLocation";
import { LocationDetail } from "@/types/location";
import { Prediction, StructuredFormatting } from "@/types/place";
import { trpc } from "@/utils/trpc";
import {
  Button,
  Image,
  Loader,
  Modal,
  Popover,
  Select,
  TextInput,
} from "@mantine/core";
import { useDebouncedState } from "@mantine/hooks";
import { Location } from "@prisma/client";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";

const GOONG_MAPTILES_KEY = "FJwjUrOipJfRwoeSakehJED5fiXUsO802RaIIUVd";

type LocationMap = {
  countryId: string | null;
  districtId: string | null;
  cityId: string | null;
  wardId: string | null;
};

type Props = {
  opened?: boolean;
  curLocation?: Location;
  onClose: () => void;
  onOpenReview: (location: LocationDetail) => void;
};

const ModalLocation = ({
  opened = false,
  curLocation,
  onClose,
  onOpenReview,
}: Props) => {
  // const [viewport, setViewport] = useState({
  //   latitude: 37.8,
  //   longitude: -122.4,
  //   zoom: 3,
  //   bearing: 0,
  //   pitch: 0,
  // });
  const createLocation = trpc.location.create.useMutation();
  const [openedPopover, setOpenedPopover] = useState(false);
  const [street, setStreet] = useDebouncedState("", 500);
  const [location, setLocation] = useState<Partial<Prediction>>();

  const [state, setState] = useState<LocationMap>({
    countryId: null,
    cityId: null,
    districtId: null,
    wardId: null,
  });

  const { countryId, cityId, districtId, wardId } = state;

  useEffect(() => {
    console.log(curLocation);
    setStreet(curLocation?.street || "");
    setState({
      countryId: curLocation ? `${curLocation.countryId}` : null,
      cityId: curLocation ? `${curLocation.cityId}` : null,
      districtId: curLocation ? `${curLocation.districtId}` : null,
      wardId: curLocation ? `${curLocation.wardId}` : null,
    });
    setLocation(
      curLocation
        ? {
            place_id: curLocation.placeId,
            description: curLocation.name,
            structured_formatting: {
              main_text: curLocation.name,
            } as StructuredFormatting,
          }
        : undefined
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [curLocation]);

  const onChangeField = (field: keyof LocationMap, value: string | null) => {
    const index =
      state[field] !== value
        ? Object.keys(state).findIndex((key) => key === field)
        : Object.keys(state).length;
    setState((prev) => ({ ...prev, [field]: value }));
    Object.keys(state).forEach((key, inx) => {
      if (inx <= index) return;
      setState((prev) => ({ ...prev, [key]: null }));
    });
  };

  const { countries, cities, districts, wards } = useLocation({
    countryId: countryId ? +countryId : null,
    cityId: cityId ? +cityId : null,
    districtId: districtId ? +districtId : null,
  });

  const { data, isLoading } = useQuery({
    queryKey: ["getPlaceList"],
    queryFn: () => {
      const country = countries.find((d) => d.value === countryId)?.label || "";
      const city = cities.find((d) => d.value === cityId)?.label || "";
      const district =
        districts.find((d) => d.value === districtId)?.label || "";
      const ward = wards.find((d) => d.value === wardId)?.label || "";
      return getPlaceList({ city, country, district, ward, street });
    },
    enabled: !!street,
  });

  const handleCreateLocation = async () => {
    if (!countryId || !cityId || !districtId || !wardId || !location) return;
    try {
      const data = await createLocation.mutateAsync({
        countryId: +countryId,
        cityId: +cityId,
        districtId: +districtId,
        wardId: +wardId,
        name: location.structured_formatting?.main_text as string,
        placeId: (location.terms?.[1].value as string) || street,
        street,
      });
      onOpenReview(data);
    } catch (e) {}
  };

  return (
    <Modal title="Choose Location" opened={opened} onClose={onClose} size="lg">
      <div className="flex flex-col gap-2">
        <Select
          label="Country"
          value={countryId}
          placeholder="Country"
          data={countries}
          dropdownPosition="bottom"
          onChange={(value) => onChangeField("countryId", value)}
        />
        <Select
          label="Tỉnh/Thành phố"
          placeholder="Tỉnh/Thành phố"
          value={cityId}
          data={cities}
          dropdownPosition="bottom"
          onChange={(value) => onChangeField("cityId", value)}
        />
        <Select
          label="Quận/Huyện"
          placeholder="Quận/Huyện"
          value={districtId}
          data={districts}
          dropdownPosition="bottom"
          onChange={(value) => onChangeField("districtId", value)}
        />
        <Select
          label="Phường"
          placeholder="Phường"
          value={wardId}
          data={wards}
          dropdownPosition="bottom"
          onChange={(value) => onChangeField("wardId", value)}
        />
        <Popover
          opened={openedPopover}
          onClose={() => setOpenedPopover(false)}
          width="target"
          position="bottom"
          closeOnClickOutside={true}
        >
          <Popover.Target>
            <TextInput
              disabled={!countryId || !cityId || !districtId || !wardId}
              onFocus={() => setOpenedPopover(true)}
              label="Street"
              placeholder="Street"
              value={street}
              onChange={(e) => setStreet(e.target.value)}
            />
          </Popover.Target>
          <Popover.Dropdown className="min-h-[100px] max-h-[200px] overflow-auto px-0 py-1 cursor-pointer">
            {isLoading && <Loader />}
            {data?.predictions.map((place) => (
              <div
                key={place.place_id}
                className="py-2 px-3 hover:bg-gray-100"
                onClick={() => {
                  setLocation(place);
                  setOpenedPopover(false);
                }}
              >
                <div className="font-bold">
                  {place.structured_formatting.main_text}
                </div>
                <div className="text-gray-600 text-sm truncate">
                  {place.description}
                </div>
              </div>
            ))}
          </Popover.Dropdown>
        </Popover>

        <div className="h-[200px] flex items-center justify-center relative">
          <Image
            alt="location"
            width={300}
            height={200}
            className="opacity-30"
            src="https://ik.imagekit.io/0o9nfg6a3/wedi/bg.png?updatedAt=1682238085594"
          />
          <div className="absolute top-0 bottom-0 left-0 right-0  bg-[rgba(96,173,100,0.5)] flex items-center justify-center">
            {!location ? (
              <div className="text-center font-bold">
                Bạn chưa chọn địa điểm nào.
              </div>
            ) : (
              <div className="px-16">
                <div className="font-bold">
                  {location.structured_formatting?.main_text}
                </div>
                <div className="text-sm font-medium">
                  {location.description}
                </div>
                <div className="text-sm font-medium mt-4">
                  Bạn cần trả tiền để xem Google Map
                </div>
              </div>
            )}
          </div>
        </div>
        {/* <MapGL
        {...viewport}
        width="100%"
        height="300px"
        onViewportChange={setViewport}
        goongApiAccessToken={GOONG_MAPTILES_KEY}
      /> */}

        <div className="flex justify-end gap-2">
          <Button onClick={onClose} color="red">
            Huỷ
          </Button>
          <Button
            onClick={handleCreateLocation}
            disabled={!location}
            color="green"
          >
            Tiếp tục
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ModalLocation;
