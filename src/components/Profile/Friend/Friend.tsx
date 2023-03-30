import { ActionIcon, Avatar, Text } from "@mantine/core";
import { IconDots } from "@tabler/icons-react";
import React from "react";

const FriendWidget = () => {
  return (
    <div className="flex gap-4 bg-white rounded-lg shadow p-4 items-center">
      <Avatar size="lg" />
      <div className="mr-auto">
        <Text weight={500} lineClamp={2} size="md">
          Minh Chanh
        </Text>
        <div className="text-gray-400 text-sm mt-1">10 bạn chung</div>
      </div>
      <ActionIcon radius="xl" variant="default">
        <IconDots size={20} />
      </ActionIcon>
    </div>
  );
};

export default FriendWidget;
