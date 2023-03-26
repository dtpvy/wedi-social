import { Avatar, Input } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import React from "react";

const Search = () => {
  return (
    <div className="flex items-center justify-between p-4 border-b">
      <Input icon={<IconSearch />} placeholder="Search" />
      <div className="flex items-center gap-4">
        <span className="font-medium">Quang Admin</span>
        <Avatar radius="xl" />
      </div>
    </div>
  );
};

export default Search;
