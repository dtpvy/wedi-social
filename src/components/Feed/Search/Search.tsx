import { Avatar, Input } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { Button } from '@mantine/core';
import {IconBellFilled ,IconNews} from "@tabler/icons-react";
import React from "react";

const Search = () => {
  return (
    <div className="flex items-center justify-between p-4 border-b">
        <Button variant="light" radius="xl" size="lg">
            WEDI
        </Button>
    
        <Input icon={<IconSearch />} placeholder="Search" />
        <Button variant="light" radius="xl" size="md">
        <IconNews/>
            News 
        </Button>
        <Button variant="light" radius="xl" size="md">
        <IconBellFilled />
            Notification 
        </Button>
    <div className="flex items-center gap-4">
        <span className="font-medium">Micha Admin</span>
        <Avatar radius="xl" />
      </div>
    </div>
  );
};

export default Search;
