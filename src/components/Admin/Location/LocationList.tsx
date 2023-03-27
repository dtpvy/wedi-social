import React from "react";
import LocationBox from "./LocationBox";

const LocationList = () => {
  const locations = [
    {
      id: 1,
      name: "App bị lỗi",
      content: "Không thể đăng nhập được",
      review: "",
      ward: "1",
      district: "1",
      city: "HCM",
      nation: "Vietnam",
    },
    {
      id: 3,
      name: "App bị lỗi",
      content: "Không thể đăng nhập được",
      review: "",
      ward: "1",
      district: "1",
      city: "HCM",
      nation: "Vietnam",
    },
    {
      id: 2,
      name: "App bị lỗi",
      content: "Không thể đăng nhập được",
      review: "",
      ward: "1",
      district: "1",
      city: "HCM",
      nation: "Vietnam",
    },
  ];

  return (
    <div>
      <div className="text-xl py-3 pl-5">Danh sách các địa điểm du lịch:</div>
      {locations.map((location) => (
        <div key={location.id} className="flex-1">
          <LocationBox location={location} />
        </div>
      ))}
    </div>
  );
};

export default LocationList;
