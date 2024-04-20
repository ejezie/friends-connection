import React from "react";
import { LiaEditSolid } from "react-icons/lia";
import { BsBriefcase, BsFacebook, BsInstagram } from "react-icons/bs";
import { FaTwitterSquare } from "react-icons/fa";
import { CiLocationOn } from "react-icons/ci";
import { userprofile } from "@/assets";

const ProfileCard: React.FC = (): React.JSX.Element => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const user: any = {};

  return (
    <div>
      <div className="w-full bg-primary flex flex-col items-center shadow mb-4  rounded-[29px] px-6 py-4 bgcard">
        <div className="w-full flex items-center justify-between pb-5 ">
          <div className="flex gap-2">
            <img
              src={user?.profileUrl ?? userprofile}
              alt={user?.email}
              className="w-14 h-14 object-cover rounded-full"
            />

            <div className="flex flex-col justify-center">
              <p className="text-lg font-medium text-ascent-1">
                {user?.firstName || "Chinedu"} {user?.lastName || "Ejexie"}
              </p>
              <span className="text-ascent-2">
                {user?.profession ?? "No Profession"}
              </span>
            </div>
          </div>

          <div className="text-blue cursor-pointer">
            <LiaEditSolid
              size={22}
              //   onClick={() => dispatch(UpdateProfile(true))}
            />
          </div>
        </div>

        <div className="w-full flex flex-col gap-2 py-4 rounded-xl p-4 shadowin">
          <div className="flex gap-2 items-center text-ascent-2">
            <CiLocationOn />
            <span>{user?.location ?? "Add Location"}</span>
          </div>

          <div className="flex gap-2 items-center text-ascent-2">
            <BsBriefcase />
            <span>{user?.profession ?? "Add Profession"}</span>
          </div>
        </div>

        <div className="w-full flex flex-col gap-2 my-4 p-4 shadowin rounded-xl">
          <p className="text-xl text-ascent-1 font-semibold">
            {user?.friends?.length} Friends
          </p>

          <div className="flex items-center justify-between">
            <span className="text-ascent-2">Pending request</span>
            <span className="text-ascent-1 text-lg">
              {user?.views?.length || "None"}
            </span>
          </div>

          <span className="text-base text-blue">
            {user?.verified ? "Verified Account" : "Not Verified"}
          </span>

          <div className="flex items-center justify-between">
            <span className="text-ascent-2">Joined</span>
            <span className="text-ascent-1 text-base">
              {/* {moment(user?.createdAt).fromNow()} */}
            </span>
          </div>
        </div>

        <div className="w-full flex flex-col gap-4 py-4 pb-6">
          <p className="text-ascent-1 text-lg font-semibold">Notifications</p>

          <div className="flex gap-2 items-center text-ascent-2">
            <BsInstagram />
            <span>Instagram</span>
          </div>
          <div className="flex gap-2 items-center text-ascent-2">
            <FaTwitterSquare />
            <span>Twitter</span>
          </div>
          <div className="flex gap-2 items-center text-ascent-2">
            <BsFacebook />
            <span>Facebook</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
