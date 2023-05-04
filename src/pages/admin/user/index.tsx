import { UserList } from "@/components/Admin/User";
// import Filter from "@/components/Admin/Filter";
import React from "react";
import { Text, Divider, Group, Menu, Button } from "@mantine/core";
import { trpc } from "@/utils/trpc";
import { useState } from "react";

const User = () => {
  const [statusVisibility, setStatusVisibility] = useState("");

  return (
    <div>
      <div className="flex h-10 items-center justify-between mt-2 pr-36">
        <Text size="xl" className="px-4 ml-8 font-semibold">
          Danh sách User:
        </Text>
        <Menu width={200} shadow="md">
          <Menu.Target>
            <Button>Bộ lọc status</Button>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Item onClick={() => setStatusVisibility("All")}>
              Tất cả
            </Menu.Item>
            <Menu.Item onClick={() => setStatusVisibility("NOTVERIFIED")}>
              NOTVERIFIED
            </Menu.Item>
            <Menu.Item onClick={() => setStatusVisibility("BANNED")}>
              BANNED
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
        {/* <Filter status1="NOTVERIFIED" status2="BANNED" setStatusVisibility={setStatusVisibility} /> */}
      </div>

      <Divider my="sm" />
      <UserList statusVisibility={statusVisibility} />
    </div>
  );
};

export default User;
