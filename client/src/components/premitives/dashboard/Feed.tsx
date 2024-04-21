/* eslint-disable @typescript-eslint/no-explicit-any */
import { AddPost, PostCard, Shimmer } from "@/components";
import React from "react";
import { useGetPostQuery } from "@/services";
import { frame } from "@/assets";

const Feed = () => {
  // I ran out of time to implement sockets
  const { data, isLoading } = useGetPostQuery("", { pollingInterval: 10000 });
  return (
    <div>
      <AddPost />
      {isLoading ? (
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
      ) : !data?.data?.length ? (
        <div className="shadow mt-4 p-3 bgcard rounded-3xl">
          <img src={frame} alt="frame" />
          <h1 className="w-full text-center text-xl font-[700]">No post Yet</h1>
        </div>
      ) : (
        data?.data?.map((data: any, idx: number) => (
          <div key={idx}>
            <PostCard data={data} />
          </div>
        ))
      )}
    </div>
  );
};

export default Feed;
