import { Avatar, Input, Button, UnstyledButton, Group, Text, Menu } from '@mantine/core';
import {
  IconSearch,
  IconChevronDown,
  IconSquareRoundedArrowRightFilled,
  IconHome2,
} from '@tabler/icons-react';
import { forwardRef } from 'react';
import React from 'react';
import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';

interface UserButtonProps extends React.ComponentPropsWithoutRef<'button'> {
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
        display: 'block',
        width: '100%',
        padding: '0.8rem',
        color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
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

UserButton.displayName = 'UserButton';

const Search = () => {
  const { data: session } = useSession();
  const user = session ? session.user : null;

  return (
    <div className="flex items-center justify-between px-4 border-b">
      <div className="flex justify-center w-8/12">
        {/* <Input
          className="w-1/2 "
          icon={<IconSearch />}
          placeholder="Search"
          rightSection={
            <Button className=" hover:bg-sky-100 bg-neutral-400 rounded-l-none">Tìm kiếm</Button>
          }
        /> */}
      </div>

      <Group position="center">
        <Menu withArrow>
          <Menu.Target>
            <UserButton
              image={user?.image || ''}
              name={user?.name || ''}
              email={user?.email || ''}
            />
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Item
              onClick={() => signOut({ callbackUrl: '/admin/signin' })}
              icon={<IconSquareRoundedArrowRightFilled size={14} />}
            >
              Đăng xuất
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Group>
    </div>
  );
};

export default Search;
