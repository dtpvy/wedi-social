import React from "react";
import { useRouter } from "next/router";
import { UserDetail } from "@/components/Admin/User";

const User = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <div>
      {/* UserDetail: {id} */}
      <UserDetail />
    </div>
  );
};

export default User;
