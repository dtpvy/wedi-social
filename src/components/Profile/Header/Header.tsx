import { Avatar, Image } from "@mantine/core";
import {
  IconBrandFacebookFilled,
  IconBrandInstagram,
  IconBrandTwitterFilled,
  IconPointFilled,
} from "@tabler/icons-react";
import dayjs from "dayjs";

const Header = () => {
  const user = {
    name: "Quang Nguyen",
    posts: 100,
    trips: 10,
    username: "nvquang",
    createdAt: new Date(),
  };

  return (
    <div className="bg-white pb-5">
      <div className="relative">
        <Image
          alt="background"
          height={200}
          src="https://wallpaperaccess.com/full/6264342.jpg"
          className="w-full"
        />
        <div className="absolute -bottom-4 left-1/2 w-[150px] h-[150px] rounded-full shadow-md p-1 bg-white -translate-x-1/2">
          <Avatar className=" w-full h-full rounded-full" />
        </div>
      </div>
      <div className="font-bold pt-6 text-3xl text-center pb-3">
        {user.name}
      </div>
      <div className="flex justify-between font-medium text-md px-16">
        <div className="flex gap-3">
          <div>
            <span className="font-bold mr-2">{user.posts}</span>
            <span className="text-gray-400">posts</span>
          </div>
          <div>
            <span className="font-bold mr-2">{user.trips}</span>
            <span className="text-gray-400">trips</span>
          </div>
        </div>
        <div className="flex gap-3 items-center text-gray-400">
          <span>{`@${user.username}`}</span>
          <IconPointFilled size={16} />
          <span>{dayjs(user.createdAt).format("Joined MMM YYYY")}</span>
        </div>
        <div className="flex gap-3">
          <IconBrandFacebookFilled size={20} />
          <IconBrandInstagram size={20} />
          <IconBrandTwitterFilled size={20} />
        </div>
      </div>
    </div>
  );
};

export default Header;
