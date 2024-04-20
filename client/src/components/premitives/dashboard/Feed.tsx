import { AddPost, PostCard } from "@/components";
import React from "react";

const Feed = () => {
  return (
    <div>
      <AddPost />
      {new Array(6).fill(2).map((_, idx) => (
        <div key={idx}>
          <PostCard />
        </div>
      ))}
    </div>
  );
};

export default Feed;
