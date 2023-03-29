import { Avatar, Input } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { Button } from '@mantine/core';
import {IconBellFilled ,IconNews} from "@tabler/icons-react";
import React from "react";
import ReactComponent from "*.svg"


const Search = () => {
  return (
    <div className="flex items-center justify-between p-4 border-b">
        <div className="Search"> </div>
    
        <Input icon={<IconSearch />} placeholder="Search" />
        <Button variant="light" radius="xl" size="md" color="green">
        <IconNews/>
            News 
        </Button>
        <Button variant="light" radius="xl" size="md" color="green">
        <IconBellFilled />
            Notification 
        </Button>
    <div className="flex items-center gap-4">
        <span className="font-medium text-green-500">Micha Admin</span>
        <Avatar radius="xl" />
      </div>
    </div>
  );
};

export default Search;
