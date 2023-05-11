import { Avatar } from '@mantine/core';
import type { Trip } from '@prisma/client';

type Props = {
  trip: Trip;
};

const Header = ({ trip }: Props) => {
  const { bgUrl, imgUrl } = trip;
  return (
    <div
      style={{
        backgroundImage: `url(${bgUrl})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
      }}
      className="bg-gray-50 pb-5"
    >
      <div className="relative h-[300px]">
        <div className="absolute top-1/2 left-1/2 w-[150px] h-[150px] rounded-full shadow-md p-1 bg-white -translate-x-1/2">
          <Avatar src={imgUrl} className=" w-full h-full rounded-full" />
        </div>
      </div>
    </div>
  );
};

export default Header;
