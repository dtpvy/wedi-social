import React from "react";
import Request from "./Request";

const Header = () => {
  const request = [
    {
      id: 1,
      title: "App bị lỗi",
      content: "Không thể đăng nhập được",
      imgUrl: "",
      user: "Quang",
      status: "PENDING",
    },
    {
      id: 2,
      title: "App bị lỗi",
      content: "Không thể đăng nhập được",
      imgUrl:
        "https://icdn.dantri.com.vn/thumb_w/680/2022/06/18/z35016410045426f3dfb5ed82d1f49408a69d555b1f720-1655531587436.jpg",
      user: "Quang",
      status: "PENDING",
    },
    {
      id: 2,
      title: "App bị lỗi",
      content: "Không thể đăng nhập được",
      imgUrl:
        "https://icdn.dantri.com.vn/thumb_w/680/2022/06/18/z35016410045426f3dfb5ed82d1f49408a69d555b1f720-1655531587436.jpg",
      user: "Quang",
      status: "PENDING",
    },
  ];
  return (
    <div className="flex p-4 gap-4  border-b">
      {request.map((request) => (
        <div key={request.id} className="flex-1">
          <Request request={request} />
        </div>
      ))}
    </div>
  );
};

export default Header;
