import { Avatar, Button, Input } from "@mantine/core";
import { IconMapPinFilled, IconSearch } from "@tabler/icons-react";
import React from "react";

const CreatePost = () => {
  return (
    <div className="bg-white shadow p-4 rounded ">
      <div className="flex items-center gap-4 w-full">
        <Avatar radius="xl" />
        <Input placeholder="Write something..." radius="xl" className="w-1/2" />
        <div className="flex items-center gap-1 ml-auto">
          <IconMapPinFilled className="text-red-600" size={30} />
          <div>Chọn địa điểm</div>
        </div>
        <Button color="green" radius="xl">
          Đăng bài
        </Button>
      </div>
    </div>
  );
};

export default CreatePost;
