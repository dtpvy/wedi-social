import { ActionIcon, Avatar, Button, Text } from '@mantine/core';
import {
  IconDots,
  IconSquareRoundedChevronLeft,
  IconSquareRoundedChevronRight,
  IconStarFilled,
} from '@tabler/icons-react';
import Review from './Review';

const Location = () => {
  return (
    <div className="bg-white shadow rounded-md p-5">
      <div className="flex items-center gap-4">
        <Avatar radius="md" size="lg" className="border" />
        <div className="mr-auto">
          <Text weight={500}>Địa điểm ABC</Text>
          <div className="flex items-center text-yellow-400 bg-yellow-100 px-2 py-1 rounded-lg w-fit gap-1">
            <IconStarFilled size={16} />
            <span className="text-sm font-bold">4.5</span>
          </div>
        </div>
        <ActionIcon radius="xl">
          <IconDots size={20} />
        </ActionIcon>
      </div>
      <div className="my-5 flex gap-2 items-center">
        <ActionIcon radius="xl" size="xl">
          <IconSquareRoundedChevronLeft size={100} />
        </ActionIcon>
        <Review />
        <ActionIcon radius="xl" size="xl">
          <IconSquareRoundedChevronRight size={100} />
        </ActionIcon>
      </div>
      <div className="flex items-center gap-3">
        <Button className="flex-1" color="green" radius="md">
          Viết bài
        </Button>
        <Button variant="outline" color="green" radius="md">
          Xem địa điểm
        </Button>
      </div>
    </div>
  );
};

export default Location;
