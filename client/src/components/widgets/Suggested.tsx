/* eslint-disable @typescript-eslint/no-explicit-any */
import { userprofile } from "@/assets";
import React from "react";
import { Link } from "react-router-dom";
import { BsPersonFillAdd } from "react-icons/bs";

const Suggested = () => {
  const suggestedFriends: any = [];
  return (
    <div className="w-full bg-primary shadow rounded-[20px] my-4 px-5 py-5 bgcard">
      <div className="flex items-center justify-between text-lg text-ascent-1 border-b border-[#66666645]">
        <span>Friend Suggestion</span>
      </div>
      <div className="w-full flex flex-col gap-4 pt-4">
        {suggestedFriends?.map((friend: any) => (
          <div className="flex items-center justify-between" key={friend._id}>
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
              <div className="flex-1 ">
                <p className="text-base font-medium text-ascent-1">
                  {friend?.firstName} {friend?.lastName}
                </p>
                <span className="text-sm text-ascent-2">
                  {friend?.profession ?? "No Profession"}
                </span>
              </div>
            </Link>

            <div className="flex gap-1">
              <button
                className="bg-[#0444a430] text-sm text-white p-1 rounded"
                onClick={() => {}}
              >
                <BsPersonFillAdd size={20} className="text-[#0f52b6]" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Suggested;
