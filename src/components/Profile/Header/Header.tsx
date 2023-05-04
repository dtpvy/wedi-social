import { ProfileLayoutContext } from '@/components/Layout/ProfileLayout';
import { UserInfo } from '@/types/user';
import { calcFriend } from '@/utils/user';
import { Avatar, Image, Loader } from '@mantine/core';
import {
  IconBrandFacebookFilled,
  IconBrandInstagram,
  IconBrandTwitterFilled,
  IconPointFilled,
<<<<<<< HEAD
} from "@tabler/icons-react";
import dayjs from "dayjs";
import { useContext } from "react";
import useTranslation from "@/hooks/useTranslation"; 
=======
} from '@tabler/icons-react';
import dayjs from 'dayjs';
import { useContext } from 'react';

>>>>>>> 2f8308d4a445472f12d75e18f18f1f8757f8d31f
const Header = () => {
  const { data: user } = useContext(ProfileLayoutContext) || {};
  const { t } = useTranslation();
  if (!user) {
    return <Loader />;
  }
  return (
    <div className="bg-white pb-5">
      <div className="relative">
        {user.bgUrl ? (
          <Image alt="background" height={200} src={user.bgUrl} className="w-full" />
        ) : (
          <div className="h-[200px] bg-gray-100"></div>
        )}

        <div className="absolute -bottom-4 left-1/2 w-[150px] h-[150px] rounded-full shadow-md p-1 bg-white -translate-x-1/2">
          <Avatar src={user.imgUrl} className=" w-full h-full rounded-full" />
        </div>
      </div>
      <div className="font-bold pt-6 text-3xl text-center pb-3">{user.name || user.email}</div>
      <div className="flex justify-between font-medium text-md px-16 w-full">
        <div className="flex gap-3 flex-1">
          <div>
            <span className="font-bold mr-2">{user.posts.length}</span>
            <span className="text-gray-400">{t("postText")}</span>
          </div>
          <div>
            <span className="font-bold mr-2">{calcFriend(user)}</span>
            <span className="text-gray-400">{t("friendText")}</span>
          </div>
        </div>
        <div className="flex gap-3 items-center text-gray-400 text-center flex-1 justify-center">
          {user.bio && (
            <>
              <span>{user.bio}</span>
              <IconPointFilled size={16} />
            </>
          )}
          <span>{`Joined ${dayjs(user.createdAt).format('MMM YYYY')}`}</span>
        </div>
        <div className="flex gap-3 flex-1 justify-end">
          <IconBrandFacebookFilled size={20} />
          <IconBrandInstagram size={20} />
          <IconBrandTwitterFilled size={20} />
        </div>
      </div>
    </div>
  );
};

export default Header;
