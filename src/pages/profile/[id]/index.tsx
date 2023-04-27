import { useRouter } from "next/router";
import React from "react";

const Profile = () => {
  const router = useRouter();
  router.push("/posts");
  return <></>;
};

export default Profile;
