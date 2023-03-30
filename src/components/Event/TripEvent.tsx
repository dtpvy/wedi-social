import { ActionIcon, Avatar } from "@mantine/core";
import { IconDots } from "@tabler/icons-react";
import Event from "./Event";

const TripEvent = () => {
  return (
    <div className="bg-white p-5 shadow rounded">
      <div className="flex items-center gap-4">
        <Avatar radius="md" className="border" />
        <div className="mr-auto">
          <div className="font-bold">Group Name</div>
          <div className="text-gray-400 text-sm">Đã tham gia từ 20/03/2022</div>
        </div>
        <ActionIcon radius="xl">
          <IconDots size="20" />
        </ActionIcon>
      </div>
      <div className="shadow mt-4">
        <Event />
      </div>
    </div>
  );
};

export default TripEvent;
