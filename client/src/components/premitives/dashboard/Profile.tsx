import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { FPostCard } from "@/components";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { useGetSingleUserQuery } from "@/services";
import Spinner from "@/components/widgets/Spinner";

const Profile = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetSingleUserQuery("");
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.user);

  return (
    <>
      <div className="home w-full px-0 lg:px-10 pb-20 2xl:px-40 bg-bgColor lg:rounded-lg h-screen overflow-hidden">
        <div className="w-full flex gap-2 lg:gap-4 md:pl-4 pt-5 pb-10 h-full">
          <div className=" flex-1 h-full bg-orimary px-4 flex flex-col gap-6 overflow-y-auto">
            {isLoading ? (
              <Spinner />
            ) : posts?.length > 0 ? (
              posts?.map((post) => (
                <PostCard
                  post={post}
                  key={post?._id}
                  user={user}
                  deletePost={handleDelete}
                  likePost={handleLikePost}
                />
              ))
            ) : (
              <div className="flex w-full h-full items-center justify-center">
                <p className="text-lg text-ascent-2">No Post Available</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
