import { Avatar, Text } from '@mantine/core';
import { IconStar, IconStarFilled } from '@tabler/icons-react';
import React from 'react';

const Review = () => {
  return (
    <div className="bg-white shadow-md border rounded-lg p-4">
      <div className="flex items-center gap-2">
        <Avatar radius="xl" />
        <div className="mr-auto">
          <div className="font-medium">Quang Nguyen</div>
          <div className="text-sm text-gray-400">20/03/2023, TP HCM, VietNam</div>
        </div>
      </div>
      <div className="mt-2 flex flex-col gap-1">
        <div className="flex text-yellow-400">
          {[1, 2, 3, 4, 5].map((index) => (
            <IconStarFilled key={index} />
          ))}
        </div>
        <Text lineClamp={3}>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has
          been the standard dummy text ever since the 1500s, when an unknown printer took a galley
          of type and scrambled it to make a type specimen book. It has survived not only five
          centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
          It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum
          passages, and more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum.
        </Text>
      </div>
    </div>
  );
};

export default Review;
