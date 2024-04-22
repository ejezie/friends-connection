import { useParams } from "react-router-dom";
import { PostCard, Shimmer } from "@/components";
import { useGetSingleUserQuery, useGetUserPostQuery } from "@/services";
import { frame, friend, team, userprofile } from "@/assets";
import moment from "moment";
import { ApiResponse } from "@/types";

const Profile = () => {
  const { id } = useParams();
  console.log(id);
  const { data, isLoading } = useGetSingleUserQuery(id);
  const { data: post, isLoading: loadingPost } = useGetUserPostQuery(id);

  return (
    <>
      <div className="w-full bg-primary flex flex-col items-center shadow mb-4  rounded-[29px] p-2 lg:p-5 bgcard ">
        <div className="shadow w-full p-5 rounded-xl">
          <div className="w-full flex items-center justify-between pb-5  ">
            <div className="flex gap-2 w-full">
              {isLoading ? (
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

              {isLoading ? (
                <div className="w-full">
                  <Shimmer className="h-5 mb-2" />
                  <Shimmer className="h-5" />
                </div>
              ) : (
                <div className="flex flex-col justify-center">
                  <p className="text-lg font-medium text-ascent-1">
                    {data?.user?.name}
                  </p>
                  <span className="cardtext">{data?.user?.email}</span>
                </div>
              )}
            </div>
          </div>
          {isLoading ? (
            <div className="w-full">
              <Shimmer className="h-[90px] rounded-xl" />
            </div>
          ) : (
            <div className="w-full flex flex-col gap-2 py-4 ">
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

          <div className="w-full flex flex-col gap-2 my-4 p-4 ">
            <div className="flex items-center">
              <img
                src={friend}
                alt="friends"
                className=" object-contain mb-4"
              />
              {/* <p className="text-xl text-ascent-1 font-semibold">Friends</p> */}
            </div>
            {isLoading ? (
              <div className="w-full">
                <Shimmer className="h-[90px] rounded-xl" />
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between">
                  <span className="cardtext">Total friends</span>
                  <span className="cardtext text-lg">
                    {data?.user?.friends?.length}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="cardtext">Joined</span>
                  <span className="cardtext">
                    {moment(data?.user?.createdAt).fromNow()}
                  </span>
                </div>
              </>
            )}
          </div>
        </div>
        <div className="mt-10 text-[20px] font-[600] w-full border-b mb-5">
          Friends
        </div>
        <div className="w-full start flex-wrap gap-10 ">
          {data?.user?.friends?.map((item: ApiResponse, idx: number) => (
            <div key={(item?._id as string) + idx}>
              {isLoading ? (
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

              {isLoading ? (
                <div className="w-full">
                  <Shimmer className="h-5 mb-2" />
                  <Shimmer className="h-5" />
                </div>
              ) : (
                <div className="flex flex-col justify-center">
                  <p className="text-lg font-medium text-ascent-1">
                    {item?.name as string}
                  </p>
                  <span className="cardtext">{item?.email as string}</span>
                </div>
              )}
            </div>
          ))}
        </div>
        {loadingPost ? (
          <div className="w-full shadow mt-4 bgcard p-5 rounded-[29px] ">
            {[1, 2, 3].map((_, idx) => (
              <div key={idx} className="mb-5">
                <Shimmer className="h-[30vh] w-full mb-4 rounded-lg" />
                <div className="between w-full">
                  <Shimmer className="h-[30px] w-[30px]" />
                  <Shimmer className="h-[30px] w-[30px]" />
                </div>
              </div>
            ))}
          </div>
        ) : !post?.data?.length ? (
          <div className="shadow mt-4 p-3 bgcard rounded-3xl">
            <img src={frame} alt="frame" />
            <h1 className="w-full text-center text-xl font-[700]">
              No post Yet
            </h1>
          </div>
        ) : (
          post?.data?.map((data: ApiResponse, idx: number) => (
            <div key={idx + (data?.id as string)}>
              <div className="mt-10 text-[20px] font-[600] w-full border-b mb-5">
                Posts
              </div>
              <PostCard data={data} />
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default Profile;
