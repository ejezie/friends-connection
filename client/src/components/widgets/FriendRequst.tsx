/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Button } from ".";
import { Link } from "react-router-dom";
import { userprofile } from "@/assets";

const FriendRequst = () => {
  const friendRequest: any = [];
  return (
    <div className="w-full bg-primary shadow px-6 py-5 rounded-[20px] bgcard">
      <div className="flex items-center justify-between text-xl text-ascent-1 pb-2 border-b border-[#66666645]">
        <span> Friend Request</span>
        <span>{friendRequest?.length}</span>
      </div>

      <div className="w-full flex flex-col gap-4 pt-4 ">
        {friendRequest?.map(({ _id, requestFrom: from }: any) => (
          <div key={_id} className="flex items-center justify-between">
            <Link
              to={"/profile/" + from._id}
              className="w-full flex gap-4 items-center cursor-pointer"
            >
              <img
                src={from?.profileUrl ?? userprofile}
                alt={from?.firstName || "Joy"}
                className="w-10 h-10 object-cover rounded-full"
              />
              <div className="flex-1">
                <p className="text-base font-medium text-ascent-1">
                  {from?.firstName} {from?.lastName}
                </p>
                <span className="text-sm text-ascent-2">
                  {from?.profession ?? "No Profession"}
                </span>
              </div>
            </Link>

            <div className="flex gap-1">
              <Button>Accept</Button>
              <Button>Reject</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FriendRequst;
