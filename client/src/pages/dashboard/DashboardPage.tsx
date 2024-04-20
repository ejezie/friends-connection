import { DashboardBlock } from "@/blocks";
import { Feed } from "@/components";
import React from "react";

const DashboardPage = () => {
  return (
    <>
      <DashboardBlock component={Feed} />
    </>
  );
};

export default DashboardPage;
