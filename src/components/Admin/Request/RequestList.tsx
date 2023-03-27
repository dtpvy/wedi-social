import React from "react";
import RequestBox from "./RequestBox";

const RequestList = () => {
  const requests = [
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
      status: "DONE",
    },
    {
      id: 3,
      title: "App bị lỗi",
      content: "Không thể đăng nhập được",
      imgUrl:
        "https://icdn.dantri.com.vn/thumb_w/680/2022/06/18/z35016410045426f3dfb5ed82d1f49408a69d555b1f720-1655531587436.jpg",
      user: "Quang",
      status: "DONE",
    },
  ];

  return (
    <div>
      <div className="text-xl py-3 pl-5">Danh sách các request:</div>
      {requests.map((request) => (
        <div key={request.id} className="flex-1 m-1">
          <RequestBox request={request} />
        </div>
      ))}
    </div>
  );
};

export default RequestList;
