import { LocationDetail } from '@/types/location';
import { Carousel } from '@mantine/carousel';
import { Avatar, Text } from '@mantine/core';
import { IconStarFilled } from '@tabler/icons-react';
import Review from './Review';

type Props = {
  location: LocationDetail;
};

const Location = ({ location }: Props) => {
  const { name, imgUrl, address, reviews } = location;
  return (
    <div className="bg-white shadow rounded-md p-5 h-fit">
      <div className="flex items-center gap-4">
        <Avatar src={imgUrl} radius="md" size="xl" className="border" />
        <div className="mr-auto w-[calc(100%-100px)]">
          <Text weight={500}>{name}</Text>
          <div className="truncate text-sm text-gray-600 w-full">{address}</div>
          <div className="flex items-center text-yellow-400 bg-yellow-100 px-2 py-1 rounded-lg w-fit gap-1">
            <IconStarFilled size={16} />
            <span className="text-sm font-bold">4.5</span>
          </div>
        </div>
      </div>
      <Carousel
        maw={320}
        mx="auto"
        slideGap="md"
        align="start"
        slidesToScroll={1}
        slideSize="100%"
        className="mt-3"
        styles={{
          control: {
            '&[data-inactive]': {
              opacity: 0,
              cursor: 'default',
            },
          },
        }}
      >
        {reviews?.map((d, index) => (
          <Carousel.Slide key={index}>
            <Review review={d} />
          </Carousel.Slide>
        ))}
      </Carousel>
    </div>
  );
};

export default Location;
