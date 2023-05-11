import { LanguageConfig } from '@/constants/default';
import useTranslation from '@/hooks/useTranslation';

import useAppStore from '@/stores/store';
import { trpc } from '@/utils/trpc';
import { ActionIcon, Avatar, Badge, Button, Image, LoadingOverlay, Popover } from '@mantine/core';
import { useDebouncedState } from '@mantine/hooks';
import type { Language } from '@prisma/client';
import {
  IconBellFilled,
  IconDots,
  IconLanguage,
  IconMessageCircle2Filled,
  IconSearch,
} from '@tabler/icons-react';
import { signOut } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useMemo, useState } from 'react';
import Message from './Message';
import Notification from './Notification';

const Search = () => {
  const router = useRouter();
  const utils = trpc.useContext();
  const { t, locale, languages, update } = useTranslation();
  const [search, setSearch] = useDebouncedState('', 200);

  const { flag, label } = LanguageConfig[locale as keyof typeof LanguageConfig] || {};

  const [opened, setOpened] = useState(false);
  const [loading, setLoading] = useState(false);

  const user = useAppStore.use.user();
  const seeAll = trpc.notification.seenAll.useMutation();
  const seeAllMess = trpc.message.seenAll.useMutation();

  const mess = useMemo(() => {
    return user?.receiveMessages.filter((d) => d.createdAt === d.updatedAt);
  }, [user]);

  const handleSeeAll = () => {
    user?.notification.length && seeAll.mutate({});
    utils.user.findUser.refetch();
  };

  const handleSeeAllMess = () => {
    mess?.length && seeAllMess.mutate({});
    utils.user.findUser.refetch();
  };

  const handleChangeLanguage = async (language: Language) => {
    setLoading(true);
    console.log({ language });
    update(language);
    setOpened((o) => !o);
    setLoading(false);
    utils.user.findUser.refetch();
  };

  const handleSearch = () => {
    router.push({ pathname: '/search/post', query: { search: search.trim() } });
    return;
  };

  return (
    <div className="w-full fixed shadow-md mb-4 z-10">
      <LoadingOverlay
        visible={loading}
        className="absolute top-0 left-0 w-screen h-screen"
        overlayBlur={2}
      />
      <div className="flex items-center justify-between bg-white px-8 py-[5px]">
        <Link href={'/feed'} className="flex items-center bg-white no-underline">
          <Image src="/logo.png" alt="logo" width={60} height={60} />
          <div className="font-bold uppercase text-green-700 text-2xl">wedi</div>
        </Link>
        <div className="flex gap-2 w-1/2 items-center border rounded-full pl-2">
          <IconSearch />
          <input
            onChange={(e) => setSearch(e.target.value)}
            placeholder={`${t('searchText')}...`}
            className="w-full outline-none text-sm"
          />
          <Button onClick={() => handleSearch()} color="teal" className="rounded-full">
            {t('searchText')}
          </Button>
        </div>
        <div className="flex items-center gap-6">
          <Popover onChange={handleSeeAllMess} position="bottom" withArrow shadow="md">
            <Popover.Target>
              <ActionIcon color="blue" radius="xl" size="xl" variant="filled" className="relative">
                <IconMessageCircle2Filled />
                {!!mess?.length && (
                  <Badge color="red" className="absolute top-0 -left-[20px] rounded-full">
                    {mess.length}
                  </Badge>
                )}
              </ActionIcon>
            </Popover.Target>
            <Popover.Dropdown>
              <Message />
            </Popover.Dropdown>
          </Popover>

          <Popover onChange={handleSeeAll} position="bottom" withArrow shadow="md">
            <Popover.Target>
              <ActionIcon color="green" radius="xl" size="xl" variant="filled" className="relative">
                <IconBellFilled />
                {!!user?.notification.length && (
                  <Badge color="red" className="absolute top-0 -left-[20px] rounded-full">
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
              <ActionIcon onClick={() => setOpened((o) => !o)} size="xl" radius="xl">
                <IconDots />
              </ActionIcon>
            </Popover.Target>
            <Popover.Dropdown>
              <Popover width={200} position="bottom" withArrow shadow="md">
                <Popover.Target>
                  <div className="flex items-center gap-2 cursor-pointer rounded p-2 mb-2">
                    <IconLanguage />
                    {`${flag} ${t(label)}`}
                  </div>
                </Popover.Target>
                <Popover.Dropdown className="p-1">
                  <div>
                    {languages?.map((language) => (
                      <div
                        key={language.id}
                        onClick={() => handleChangeLanguage(language)}
                        className="hover:bg-gray-100 p-2 cursor-pointer"
                      >
                        {`${LanguageConfig[language.code as keyof typeof LanguageConfig].flag} ${t(
                          LanguageConfig[language.code as keyof typeof LanguageConfig].label
                        )}`}
                      </div>
                    ))}
                  </div>
                </Popover.Dropdown>
              </Popover>
              <Button onClick={() => signOut({ callbackUrl: '/signin' })} className="w-full">
                {t('signoutText')}
              </Button>
            </Popover.Dropdown>
          </Popover>

          <ActionIcon onClick={() => router.push(`/profile/${user?.id}`)} radius="xl">
            <Avatar className="border shadow" radius="xl" size={45} src={user?.imgUrl} />
          </ActionIcon>
        </div>
      </div>
    </div>
  );
};

export default Search;
