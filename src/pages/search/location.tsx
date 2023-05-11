import { MainLayout } from '@/components/Layout';
import SearchLayout from '@/components/Layout/SearchLayout';
import { Location } from '@/components/Location';
import { Post, Reaction } from '@/components/Post';

import useTranslation from '@/hooks/useTranslation';
import { type SearchState } from '@/stores/search';

import { getTimePost } from '@/utils/time';
import { trpc } from '@/utils/trpc';
import { Avatar, Button, Rating } from '@mantine/core';
import { IconMapPinPin, IconMessage } from '@tabler/icons-react';

import { useState, type ReactElement, useEffect } from 'react';

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
      <div className="w-[400px] flex flex-col gap-4 ">
        {locations?.map((location) => (
          <div
            onClick={() => setLocation(location)}
            key={location.id}
            className="bg-white rounded-lg shadow cursor-pointer p-3"
          >
            <div className="flex items-center gap-2">
              <Avatar size="lg" radius="lg" src={location.imgUrl} />
              <div>
                <div className="font-bold">{location.name}</div>
                <div className="text-sm">{location.address}</div>
              </div>
            </div>
            <Button color="text" className="mt-3">
              {t('createPostText')}
            </Button>
          </div>
        ))}
      </div>

      {!!location && <Location location={location} className="w-full" />}
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
