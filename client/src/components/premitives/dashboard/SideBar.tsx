import {
  ProfileCard,
  FriendsCard,
  FriendRequst,
  Suggested,
} from "@/components";
import React from "react";

const SideBar: React.FC = (): React.JSX.Element => {
  return (
    <div>
      <ProfileCard />
      <FriendsCard />
      <div className="block md:hidden">
        <div className="my-4">
          <FriendRequst />
        </div>
        <Suggested />
      </div>
    </div>
  );
};

export default SideBar;
