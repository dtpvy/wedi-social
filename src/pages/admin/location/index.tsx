import { LocationList } from "@/components/Admin/Location";
import { Text, Menu, Button, Divider } from "@mantine/core";
import React from "react";
import { useState } from "react";
const Location = () => {
  const [statusVisibility, setStatusVisibility] = useState("");

  return (
    <div>
      <div className="flex h-10 items-center justify-between mt-2 pr-36">
        <Text size="xl" className="px-4 ml-8 font-semibold">
          Danh sách Các địa điểm du lịch:
        </Text>
        <Menu width={200} shadow="md">
          <Menu.Target>
            <Button>Bộ lọc status</Button>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Item onClick={() => setStatusVisibility("All")}>
              Tất cả
            </Menu.Item>
            <Menu.Item onClick={() => setStatusVisibility("ACTIVE")}>
              NOTVERIFIED
            </Menu.Item>
            <Menu.Item onClick={() => setStatusVisibility("DEACTIVE")}>
              BANNED
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </div>
      <Divider my="sm" />
      <LocationList statusVisibility={statusVisibility} />
    </div>
  );
};

export default Location;
