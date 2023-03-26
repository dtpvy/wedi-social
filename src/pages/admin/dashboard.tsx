import { Header, Diagrams } from "@/components/Admin/Dashboard";

import React from "react";

const Dashboard = () => {
  return (
    <div>
      <p className="text-lg font-medium pt-4 pl-6">Pending requests:</p>
      <Header />
      <Diagrams />
    </div>
  );
};

export default Dashboard;
