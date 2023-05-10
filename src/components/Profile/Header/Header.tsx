import useTranslation from '@/hooks/useTranslation';
import useProfileStore from '@/stores/store';
import { calcFriend } from '@/utils/user';
import { Avatar, Image } from '@mantine/core';
import {
  IconBrandFacebookFilled,
  IconBrandInstagram,
  IconBrandTwitterFilled,
  IconPointFilled,
} from '@tabler/icons-react';
import dayjs from 'dayjs';

const Header = () => {
  const { t } = useTranslation();
  const { user: profile } = useProfileStore.use.profile();
  const { bgUrl, imgUrl, name, email, posts, bio, createdAt } = profile || {};

  return (
    <div className="bg-white pb-5">
      <div className="relative">
        {bgUrl ? (
          <Image alt="background" height={200} src={bgUrl} className="w-full" />
        ) : (
          <div className="h-[200px] bg-gray-100"></div>
        )}

        <div className="absolute -bottom-4 left-1/2 w-[150px] h-[150px] rounded-full shadow-md p-1 bg-white -translate-x-1/2">
          <Avatar src={imgUrl} className=" w-full h-full rounded-full" />
        </div>
      </div>
      <div className="font-bold pt-6 text-3xl text-center pb-3">{name || email}</div>
      <div className="flex justify-between font-medium text-md px-16 w-full">
        <div className="flex gap-3 flex-1">
          <div>
            <span className="font-bold mr-2">{posts?.length}</span>
            <span className="text-gray-400">{t('postText')}</span>
          </div>
          <div>
            <span className="font-bold mr-2">{profile ? calcFriend(profile) : 0}</span>
            <span className="text-gray-400">{t('friendText')}</span>
          </div>
        </div>
        <div className="flex gap-3 items-center text-gray-400 text-center flex-1 justify-center">
          {bio && (
            <>
              <span>{bio}</span>
              <IconPointFilled size={16} />
            </>
          )}
          <span>{`${t('joinedGroupText')} ${dayjs(createdAt).format('MMM YYYY')}`}</span>
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
