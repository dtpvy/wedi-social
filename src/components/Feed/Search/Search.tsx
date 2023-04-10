import useUserStore from "@/stores/user";
import {
  ActionIcon,
  Avatar,
  Badge,
  Button,
  Image,
  Input,
  Popover,
  Text,
} from "@mantine/core";
import {
  IconBellFilled,
  IconDots,
  IconLogout,
  IconMessageCircle2Filled,
  IconSearch,
} from "@tabler/icons-react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/router";

const Search = () => {
  const router = useRouter();
  const user = useUserStore.use.user();

  return (
    <div className="flex items-center justify-between bg-white pr-8">
      <button
        onClick={() => router.push("/feed")}
        className="flex items-center bg-white"
      >
        <Image src="/logo.png" alt="logo" width={70} height={70} />
        <div className="font-bold uppercase text-green-700 text-2xl">wedi</div>
      </button>
      <Input
        icon={<IconSearch />}
        placeholder="Search..."
        radius="xl"
        size="md"
        className="w-1/2"
      />
      <div className="flex items-center gap-6">
        <ActionIcon
          color="blue"
          radius="xl"
          size="xl"
          variant="filled"
          className="relative"
        >
          <IconMessageCircle2Filled />
          <Badge
            color="red"
            className="absolute top-0 -left-[20px] rounded-full"
          >
            10
          </Badge>
        </ActionIcon>
        <ActionIcon
          color="green"
          radius="xl"
          size="xl"
          variant="filled"
          className="relative"
        >
          <IconBellFilled />
          <Badge
            color="red"
            className="absolute top-0 -left-[20px] rounded-full"
          >
            10
          </Badge>
        </ActionIcon>
        <Popover position="bottom" withArrow shadow="md">
          <Popover.Target>
            <ActionIcon size="xl" radius="xl">
              <IconDots />
            </ActionIcon>
          </Popover.Target>
          <Popover.Dropdown>
            <Button onClick={() => signOut()}>Đăng xuất</Button>
          </Popover.Dropdown>
        </Popover>

        <ActionIcon
          onClick={() => router.push(`/profile/${user?.id}`)}
          radius="xl"
        >
          <Avatar radius="xl" size="lg" src={user?.imgUrl} />
        </ActionIcon>
      </div>
    </div>
  );
};

export default Search;
