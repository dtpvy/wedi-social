import useUserStore from "@/stores/user";
import { trpc } from "@/utils/trpc";
import {
  ActionIcon,
  Avatar,
  Badge,
  Box,
  Button,
  Image,
  Input,
  LoadingOverlay,
  Popover,
} from "@mantine/core";
import {
  IconBellFilled,
  IconDots,
  IconLanguage,
  IconMessageCircle2Filled,
  IconSearch,
} from "@tabler/icons-react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { useMemo, useState, useTransition } from "react";
import Message from "./Message";
import Notification from "./Notification";
import { LanguageConfig } from "@/constants/default";
import useTranslator from "@/stores/translator";
import useTranslation from "@/hooks/useTranslation";

const Search = () => {
  const router = useRouter();
  const utils = trpc.useContext();
  const { t, locale: language } = useTranslation();
  const [see, setSee] = useState({ noti: false, mess: false });
  const [opened, setOpened] = useState(false);
  const [loading, setLoading] = useState(false);

  const user = useUserStore.use.user();
  const seeAll = trpc.notification.seenAll.useMutation();
  const seeAllMess = trpc.message.seenAll.useMutation();
  const { data: languages } = trpc.location.languages.useQuery({});
  const updateLanguage = trpc.user.updateLanguage.useMutation();

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

  const handleChangeLanguage = async (languageId: number) => {
    setLoading(true);
    await updateLanguage.mutateAsync({ languageId });
    setOpened((o) => !o);
    setLoading(false);
    utils.user.findUser.refetch();
  };

  return (
    <>
      <LoadingOverlay
        visible={loading}
        className="absolute top-0 left-0 w-screen h-screen"
        overlayBlur={2}
      />
      <div className="flex items-center justify-between bg-white pr-8">
        <button
          onClick={() => router.push("/feed")}
          className="flex items-center bg-white"
        >
          <Image src="/logo.png" alt="logo" width={70} height={70} />
          <div className="font-bold uppercase text-green-700 text-2xl">
            wedi
          </div>
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

          <Popover opened={opened} position="bottom" withArrow shadow="md">
            <Popover.Target>
              <ActionIcon
                onClick={() => setOpened((o) => !o)}
                size="xl"
                radius="xl"
              >
                <IconDots />
              </ActionIcon>
            </Popover.Target>
            <Popover.Dropdown>
              <Popover width={200} position="bottom" withArrow shadow="md">
                <Popover.Target>
                  <div className="flex items-center gap-2 cursor-pointer rounded p-2 mb-2">
                    <IconLanguage />
                    {`${LanguageConfig[language].flag} ${t(
                      LanguageConfig[language].label
                    )}`}
                  </div>
                </Popover.Target>
                <Popover.Dropdown className="p-1">
                  <div>
                    {languages?.map((language) => (
                      <div
                        key={language.id}
                        onClick={() => handleChangeLanguage(language.id)}
                        className="hover:bg-gray-100 p-2 cursor-pointer"
                      >
                        {`${
                          LanguageConfig[
                            language.code as keyof typeof LanguageConfig
                          ].flag
                        } ${t(
                          LanguageConfig[
                            language.code as keyof typeof LanguageConfig
                          ].label
                        )}`}
                      </div>
                    ))}
                  </div>
                </Popover.Dropdown>
              </Popover>
              <Button onClick={() => signOut()} className="w-full">
                {t("signoutText")}
              </Button>
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
    </>
  );
};

export default Search;