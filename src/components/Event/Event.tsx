import { Avatar, Checkbox, Text } from '@mantine/core';
import { IconCalendar, IconNote, IconStarFilled } from '@tabler/icons-react';
import React from 'react';

const Event = () => {
  return (
    <div className="bg-white shadow p-4 rounded-lg">
      <div className="flex items-center justify-between mb-2">
        <div className="font-medium text-md">Event name ABC</div>
        <Checkbox />
      </div>
      <div className="shadow p-2 rounded flex gap-2 items-center">
        <Avatar radius="md" size="lg" className="border" />
        <div className="mr-auto">
          <div className="font-medium text-md">Địa điểm ABC</div>
          <div className="text-gray-400 text-sm">227 Nguyen Van Cu, Quan 5, TP HCM</div>
        </div>
        <div className="flex items-center text-yellow-400 bg-yellow-100 px-2 py-1 rounded-lg w-fit gap-1">
          <IconStarFilled size={16} />
          <span className="text-sm font-bold">4.5</span>
        </div>
      </div>
      <div className="flex text-gray-600 text-sm mt-4 gap-2 items-start">
        <IconNote size={20} />
        <Text lineClamp={2} className="w-full" align="justify">
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has
          been the standard dummy text ever since the 1500s, when an unknown printer took a galley
          of type and scrambled it to make a type specimen book. It has survived not only five
          centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
          It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum
          passages, and more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum.
        </Text>
      </div>
      <div className="flex text-gray-600 items-center mt-4 gap-2 text-sm">
        <IconCalendar size={20} />
        <div>23:59 23/03/2023</div>
        <Avatar.Group spacing="sm" className="ml-auto">
          <Avatar radius="xl" />
          <Avatar radius="xl" />
          <Avatar radius="xl" />
          <Avatar radius="xl" color="green">
            +5
          </Avatar>
        </Avatar.Group>
      </div>
    </div>
  );
};

export default Event;
