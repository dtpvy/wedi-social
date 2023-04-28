import React from 'react';
import { useRouter } from 'next/router';
import { LocationDetail } from '@/components/Admin/Location';

const LocationInfo = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <div>
      {/* LocationDetail: {id} */}
      <LocationDetail />
    </div>
  );
};

export default LocationInfo;
