import { ProfileCard, FriendsCard } from "@/components";
import React from "react";

const SideBar: React.FC = (): React.JSX.Element => {
  return (
    <div>
      <ProfileCard />
      <FriendsCard />
    </div>
  );
};

export default SideBar;
