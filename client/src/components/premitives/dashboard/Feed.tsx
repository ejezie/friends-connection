import { AddPost, PostCard } from "@/components";
import React from "react";
import { useGetPostQuery } from "@/services";

const Feed = () => {
  const { data, isSuccess, isLoading } = useGetPostQuery("");
  return (
    <div>
      <AddPost />
      {data?.data?.map((data: any, idx: number) => (
        <div key={idx}>
          <PostCard data={data} />
        </div>
      ))}
    </div>
  );
};

export default Feed;
