/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { userprofile } from "@/assets";
import { useGetAllUsersQuery, useGetNotFriendQuery } from "@/services";
import Shimmer from "./Shimmer";
import Empty from "./Empty";
import { ApiResponse } from "@/types";

const FriendsCard: React.FC = (): React.JSX.Element => {
  const [friends, setFriends] = useState<ApiResponse[]>([]);
  const { data: notFriends, isLoading } = useGetNotFriendQuery("");
  const { data: allUsers, isLoading: isLoadingAll } = useGetAllUsersQuery("", {
    pollingInterval: 10000,
  });

  useEffect(() => {
    if (allUsers?.user && notFriends?.user) {
      const filteredFriends = allUsers.user.filter((user: ApiResponse) => {
        return !notFriends.user.some(
          (nonFriend: ApiResponse) => nonFriend._id === user._id
        );
      });
      setFriends(filteredFriends);
      console.log(friends);
    }
  }, [allUsers, notFriends]);

  console.log(friends);

  return (
    <div>
      <div className="w-full bg-primary shadow rounded-[29px] px-6 py-5  bgcard">
        <div className="flex items-center justify-between text-ascent-1 pb-2 border-b ">
          <span> Friends</span>
          <span>{friends?.length || 0}</span>
        </div>

        <div className="w-full flex flex-col gap-4 pt-4">
          {isLoading || isLoadingAll ? (
            <div className="w-full">
              <Shimmer className="h-[100px] rounded-lg" />
            </div>
          ) : !friends?.length ? (
            <Empty title="No friends Yet, add Some!" />
          ) : (
            friends.map((friend: ApiResponse) => (
              <Link
                to={"/profile/" + friend._id}
                key={friend._id as string}
                className="w-full flex gap-4 items-center cursor-pointer"
              >
                <img
                  src={(friend.profileUrl as string) ?? userprofile}
                  alt={friend.name as string}
                  className="w-10 h-10 object-cover rounded-full"
                />
                <div className="flex-1">
                  <p className="text-base font-medium text-ascent-1 textwrp w-[120px]">
                    {friend.name as string}
                  </p>
                  <div className="text-sm text-ascent-2 textwrp w-[120px]">
                    {friend.email as string}
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default FriendsCard;
