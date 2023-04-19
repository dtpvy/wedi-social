import useUserStore from "@/stores/user";
import { trpc } from "@/utils/trpc";
import {
  ActionIcon,
  Avatar,
  Badge,
  Button,
  Image,
  Input,
  Popover,
} from "@mantine/core";
import {
  IconBellFilled,
  IconDots,
  IconMessageCircle2Filled,
  IconSearch,
} from "@tabler/icons-react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { useMemo, useState } from "react";
import Message from "./Message";
import Notification from "./Notification";

const Search = () => {
  const router = useRouter();

  const user = useUserStore.use.user();
  const seeAll = trpc.notification.seenAll.useMutation();
  const seeAllMess = trpc.message.seenAll.useMutation();
  const [see, setSee] = useState({ noti: false, mess: false });
  const utils = trpc.useContext();

  const mess = useMemo(() => {
    return user?.receiveMessages.filter((d) => d.createdAt === d.updatedAt);
  }, [user]);

  const handleSeeAll = () => {
    if (see.noti) return;
    user?.notification.length && seeAll.mutate({});
    setSee((prev) => ({ ...prev, noti: true }));
    utils.user.findUser.refetch();
  };

  const handleSeeAllMess = () => {
    if (see.mess) return;
    mess?.length && seeAllMess.mutate({});
    setSee((prev) => ({ ...prev, mess: true }));
    utils.user.findUser.refetch();
  };

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
        <Popover
          onChange={handleSeeAllMess}
          position="bottom"
          withArrow
          shadow="md"
        >
          <Popover.Target>
            <ActionIcon
              color="blue"
              radius="xl"
              size="xl"
              variant="filled"
              className="relative"
            >
              <IconMessageCircle2Filled />
              {!!mess?.length && (
                <Badge
                  color="red"
                  className="absolute top-0 -left-[20px] rounded-full"
                >
                  {mess.length}
                </Badge>
              )}
            </ActionIcon>
          </Popover.Target>
          <Popover.Dropdown>
            <Message />
          </Popover.Dropdown>
        </Popover>

        <Popover
          onChange={handleSeeAll}
          position="bottom"
          withArrow
          shadow="md"
        >
          <Popover.Target>
            <ActionIcon
              color="green"
              radius="xl"
              size="xl"
              variant="filled"
              className="relative"
            >
              <IconBellFilled />
              {!!user?.notification.length && (
                <Badge
                  color="red"
                  className="absolute top-0 -left-[20px] rounded-full"
                >
                  {user?.notification.length}
                </Badge>
              )}
            </ActionIcon>
          </Popover.Target>
          <Popover.Dropdown>
            <Notification />
          </Popover.Dropdown>
        </Popover>

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
          <Avatar
            className="border shadow"
            radius="xl"
            size="lg"
            src={user?.imgUrl}
          />
        </ActionIcon>
      </div>
    </div>
  );
};

export default Search;
