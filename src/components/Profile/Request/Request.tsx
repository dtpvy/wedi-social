import { ActionIcon, Avatar, Text } from "@mantine/core";
import { IconDots, IconMessages, IconPaperclip } from "@tabler/icons-react";
import React from "react";

const Request = () => {
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <div className="flex items-center gap-4 mb-4">
        <Avatar radius="xl" />
        <div className="font-bold">Request #100</div>
        <div className="ml-auto">11:11 20/03/2023</div>
        <ActionIcon variant="default" radius="xl">
          <IconDots size={20} />
        </ActionIcon>
      </div>
      <div className="font-medium text-lg mb-3">
        Request title for something
      </div>
      <Text lineClamp={3}>
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry&apos;s standard dummy text
        ever since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book. It has survived not only five
        centuries, but also the leap into electronic typesetting, remaining
        essentially unchanged. It was popularised in the 1960s with the release
        of Letraset sheets containing Lorem Ipsum passages, and more recently
        with desktop publishing software like Aldus PageMaker including versions
        of Lorem Ipsum
      </Text>
      <div className="flex items-center gap-4 mt-4">
        <Avatar radius="xl" />
        <div>Admin 1</div>
        <div className="flex items-center gap-2 ml-auto">
          <IconPaperclip />
          <span>1</span>
        </div>
        <div className="flex items-center gap-2">
          <IconMessages />
          <span>Chưa có phản hồi</span>
        </div>
      </div>
    </div>
  );
};

export default Request;
