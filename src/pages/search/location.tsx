import { MainLayout } from '@/components/Layout';
import SearchLayout from '@/components/Layout/SearchLayout';
import { Location } from '@/components/Location';
import { CreatePostFromLocation } from '@/components/Post';

import useTranslation from '@/hooks/useTranslation';
import { type SearchState } from '@/stores/search';

import { trpc } from '@/utils/trpc';
import { Avatar } from '@mantine/core';

import { useEffect, useState, type ReactElement } from 'react';

const SearchLocation = ({ search, sort, field }: SearchState) => {
  const { t } = useTranslation();
  const { data: locations, refetch } = trpc.search.location.useQuery({
    search,
    field,
    sort,
  });

  const [location, setLocation] = useState(locations?.[0]);

  useEffect(() => {
    setLocation(locations?.[0]);
  }, [locations]);

  return (
    <div className="flex gap-6">
      <div className="flex flex-col gap-4 flex-1 h-[500px] overflow-auto">
        {locations?.map((location) => (
          <div
            onClick={() => setLocation(location)}
            key={location.id}
            className="bg-white rounded-lg shadow cursor-pointer p-3"
          >
            <div className="flex items-center gap-2 mb-3">
              <Avatar size="lg" radius="lg" src={location.imgUrl} />
              <div>
                <div className="font-bold">{location.name}</div>
                <div className="text-sm">{location.address}</div>
              </div>
            </div>

            <CreatePostFromLocation refetch={refetch} location={location} />
          </div>
        ))}
      </div>

      {!!location && <Location location={location} className="flex-1" />}
    </div>
  );
};

SearchLocation.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <SearchLayout>{page}</SearchLayout>
    </MainLayout>
  );
};

export default SearchLocation;
