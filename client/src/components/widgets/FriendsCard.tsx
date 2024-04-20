/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Link } from "react-router-dom";
import { userprofile } from "@/assets";

const FriendsCard: React.FC = (): React.JSX.Element => {
  const friends: any = [{ _id: "32", firstName: "John", lastName: "Doe" }];
  return (
    <div>
      <div className="w-full bg-primary shadow rounded-[29px] px-6 py-5  bgcard">
        <div className="flex items-center justify-between text-ascent-1 pb-2 border-b ">
          <span> Friends</span>
          <span>{friends?.length || 5}</span>
        </div>

        <div className="w-full flex flex-col gap-4 pt-4">
          {friends?.map((friend: any) => (
            <Link
              to={"/profile/" + friend?._id}
              key={friend?._id}
              className="w-full flex gap-4 items-center cursor-pointer"
            >
              <img
                src={friend?.profileUrl ?? userprofile}
                alt={friend?.firstName}
                className="w-10 h-10 object-cover rounded-full"
              />
              <div className="flex-1">
                <p className="text-base font-medium text-ascent-1">
                  {friend?.firstName} {friend?.lastName}
                </p>
                <span className="text-sm text-ascent-2">
                  {friend?.profession ?? "No Profession"}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FriendsCard;
