import React from "react";
import LocationBox from "./LocationBox";

const LocationList = () => {
  const locations = [
    {
      id: 1,
      name: "Quán ăn 1",
      review: 3.5,
      ward: "1",
      district: "1",
      city: "HCM",
      nation: "Vietnam",
      image:
        "https://images.unsplash.com/photo-1511216335778-7cb8f49fa7a3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80",
    },
    {
      id: 3,
      name: "Quán lẩu 2",
      review: 4,
      ward: "1",
      district: "1",
      city: "HCM",
      nation: "Vietnam",
      image:
        "https://images.unsplash.com/photo-1511216335778-7cb8f49fa7a3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80",
    },
    {
      id: 2,
      name: "Quán nước 3",
      review: 2.2,
      ward: "1",
      district: "1",
      city: "HCM",
      nation: "Vietnam",
      image:
        "https://images.unsplash.com/photo-1511216335778-7cb8f49fa7a3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80",
    },
  ];

  return (
    <div className="flex flex-wrap justify-center">
      {locations.map((location) => (
        <div key={location.id} className="w-5/12 mx-5 my-3">
          <LocationBox location={location} />
        </div>
      ))}
    </div>
  );
};

export default LocationList;
