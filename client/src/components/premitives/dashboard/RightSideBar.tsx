import { Suggested, FriendRequst } from "@/components";
import React from "react";

const RightSideBar: React.FC = (): React.JSX.Element => {
  return (
    <div>
      <FriendRequst />
      <Suggested />
    </div>
  );
};

export default RightSideBar;
