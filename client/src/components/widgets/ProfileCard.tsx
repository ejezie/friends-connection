import React from "react";
import { friend, team, userprofile, postdefault } from "@/assets";
import { useAppSelector } from "@/hooks";
import {
  useGetAllReqQuery,
  useGetUserPostQuery,
  useGetMeQuery,
} from "@/services";
import moment from "moment";
import Empty from "./Empty";
import Shimmer from "./Shimmer";
import { ApiResponse } from "@/types";
// import useGetuser

const ProfileCard: React.FC = (): React.JSX.Element => {
  const user = useAppSelector((state) => state.user.user);
  const { data } = useGetAllReqQuery("");
  const { data: post, isLoading } = useGetUserPostQuery(user!._id);
  const { data: me, isLoading: isLoadingMe } = useGetMeQuery("");

  return (
    <div>
      <div className="w-full bg-primary flex flex-col items-center shadow mb-4  rounded-[29px] px-6 py-4 bgcard">
        <div className="w-full flex items-center justify-between pb-5 ">
          <div className="flex gap-2 w-full">
            {isLoadingMe ? (
              <div className="w-[30%]">
                <Shimmer className="h-[50px] rounded-full w-[50px] mr-2" />
              </div>
            ) : (
              <img
                src={userprofile}
                alt={"profile"}
                className="w-14 h-14 object-cover rounded-full"
              />
            )}

            {isLoadingMe ? (
              <div className="w-full">
                <Shimmer className="h-5 mb-2" />
                <Shimmer className="h-5" />
              </div>
            ) : (
              <div className="flex flex-col justify-center">
                <p className="text-lg font-medium text-ascent-1">
                  {me?.user?.name ?? user?.name}
                </p>
                <span className="cardtext">
                  {me?.user?.email ?? user?.email}
                </span>
              </div>
            )}
          </div>

          {/* <div className="text-blue cursor-pointer">
            <LiaEditSolid
              size={22}
              //   onClick={() => dispatch(UpdateProfile(true))}
            />
          </div> */}
        </div>
        {isLoadingMe ? (
          <div className="w-full">
            <Shimmer className="h-[90px] rounded-xl" />
          </div>
        ) : (
          <div className="w-full flex flex-col gap-2 py-4 rounded-xl p-4 shadowin">
            <div className="center gap-2">
              <span className="lg:text-[20px] text-[14px] font-dancing-script">
                {"Member"}
              </span>
              <img src={team} alt="team" className="w-[20%] h-[20%]" />
              <span className="lg:text-[20px] text-[15px] font-dancing-script">
                {"Badge"}
              </span>
            </div>
          </div>
        )}

        <div className="w-full flex flex-col gap-2 my-4 p-4 shadowin rounded-xl">
          <div className="flex items-center">
            <img src={friend} alt="friends" className=" object-contain mb-4" />
            {/* <p className="text-xl text-ascent-1 font-semibold">Friends</p> */}
          </div>
          {isLoadingMe ? (
            <div className="w-full">
              <Shimmer className="h-[90px] rounded-xl" />
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between">
                <span className="cardtext">Pending request</span>
                <span className="cardtext">{data?.data?.length || "None"}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="cardtext">Total friends</span>
                <span className="cardtext text-lg">
                  {me?.user?.friends?.length || "0"}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="cardtext">Joined</span>
                <span className="cardtext">
                  {moment(me?.user?.createdAt).fromNow()}
                </span>
              </div>
            </>
          )}
        </div>
        <div className="w-full flex flex-col gap-4 py-4 pb-6">
          <p className="text-ascent-1 text-lg font-semibold">Recent Posts</p>
          {isLoading ? (
            [1, 2, 3].map((_, idx) => (
              <div key={idx} className="w-full">
                <Shimmer className="h-8" />
              </div>
            ))
          ) : !post?.data?.length ? (
            <Empty title="No Post Yet" />
          ) : (
            post?.data?.slice(0, 3)?.map((item: ApiResponse, idx: number) => (
              <div className="flex items-center justify-between" key={idx}>
                <div className="center w-fit">
                  <img
                    src={
                      (item?.image as string)?.length
                        ? (item?.image as string)
                        : (postdefault as string)
                    }
                    alt=""
                    loading="lazy"
                    className="w-[40px] h-[40px] mr-2"
                  />
                  <div className="text-sm font-[400]">
                    {(item?.description as [])?.slice(0, 15)}...
                  </div>
                </div>
                <span className="cardtext">
                  {moment(item?.createdAt as string).fromNow()}
                </span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
