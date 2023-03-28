import {
  Avatar,
  Input,
  Button,
  UnstyledButton,
  Group,
  Text,
  Menu,
} from "@mantine/core";
import {
  IconSearch,
  IconChevronDown,
  IconSquareRoundedArrowRightFilled,
  IconHome2,
} from "@tabler/icons-react";
import { forwardRef } from "react";
import React from "react";
import Link from "next/link";

interface UserButtonProps extends React.ComponentPropsWithoutRef<"button"> {
  image: string;
  name: string;
  email: string;
  icon?: React.ReactNode;
}

// define thanh Admin(đăng xuất) bằng Mantine
const UserButton = forwardRef<HTMLButtonElement, UserButtonProps>(
  ({ image, name, email, icon, ...others }: UserButtonProps, ref) => (
    <UnstyledButton
      ref={ref}
      sx={(theme) => ({
        display: "block",
        width: "100%",
        padding: "0.8rem",
        color:
          theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,
      })}
      {...others}
    >
      <Group>
        <Avatar src={image} radius="xl" />

        <div style={{ flex: 1 }}>
          <Text size="sm" weight={500}>
            {name}
          </Text>

          <Text color="dimmed" size="xs">
            {email}
          </Text>
        </div>

        {icon || <IconChevronDown size="1rem" />}
      </Group>
    </UnstyledButton>
  )
);

const Search = () => {
  return (
    <div className="flex items-center justify-between px-4 border-b">
      <div className="flex justify-center w-8/12">
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

      <Group position="center">
        <Menu withArrow>
          <Menu.Target>
            <UserButton
              image="https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=255&q=80"
              name="Admin 1"
              email="admin1@outlook.com"
            />
          </Menu.Target>
          <Menu.Dropdown>
            <Link href="/home">
              <Menu.Item icon={<IconHome2 size={14} />}>
                Về trang User
              </Menu.Item>
            </Link>
            <Link href="/login">
              <Menu.Item icon={<IconSquareRoundedArrowRightFilled size={14} />}>
                Đăng xuất
              </Menu.Item>
            </Link>
          </Menu.Dropdown>
        </Menu>
      </Group>
    </div>
  );
};

export default Search;
