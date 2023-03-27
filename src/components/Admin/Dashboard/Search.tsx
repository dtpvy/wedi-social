import { Avatar, Input, Button } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import React from "react";

const Search = () => {
  return (
    <div className="flex items-center justify-between p-4 border-b">
      <div className="flex justify-center w-9/12">
        <Input
          className="w-1/2 "
          icon={<IconSearch />}
          placeholder="Search"
          rightSection={
            <Button className=" hover:bg-sky-100 bg-neutral-400 rounded-l-none">
              Tìm kiếm
            </Button>
          }
        />
      </div>
      <div className="flex items-center gap-4">
        <span className="font-medium">Quang Admin</span>
        <Avatar radius="xl" />
      </div>
    </div>
  );
};

export default Search;
