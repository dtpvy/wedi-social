import { RequestList } from "@/components/Admin/Request";
import { Text, Divider, Menu, Button } from "@mantine/core";
import React from "react";
import { useState } from "react";

const Request = () => {
  const [statusVisibility, setStatusVisibility] = useState("");

  return (
    <div>
      <div className="flex h-10 items-center justify-between mt-2 pr-36">
        <Text size="xl" className="p-4 ml-8 pt-3 font-semibold">
          Danh sách các request:
        </Text>
        <Menu width={200} shadow="md">
          <Menu.Target>
            <Button>Bộ lọc status</Button>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Item onClick={() => setStatusVisibility("All")}>
              Tất cả
            </Menu.Item>
            <Menu.Item onClick={() => setStatusVisibility("Đã phản hồi")}>
              Đã phản hồi
            </Menu.Item>
            <Menu.Item onClick={() => setStatusVisibility("Chưa phản hồi")}>
              Chưa phản hồi
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </div>
      <Divider my="sm" />
      <RequestList statusVisibility={statusVisibility} />
    </div>
  );
};

export default Request;
