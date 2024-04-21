/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import { BiComment, BiLike, BiSolidLike } from "react-icons/bi";
// import { MdOutlineDeleteOutline } from "react-icons/md";
import { CommentForm, ReplyCard } from "@/components";
import { frame, userprofile } from "@/assets";
import { useAppSelector } from "@/hooks";
import Spinner from "@/components/widgets/Spinner";
import { useGetPostCommentsQuery, useLikePostMutation } from "@/services";
import { rtkMutation } from "@/utils";

const PostCard: React.FC<any> = ({ data }): React.JSX.Element => {
  const [showAll, setShowAll] = useState(0);
  const [showReply, setShowReply] = useState(0);
  const [replyComments, setReplyComments] = useState(0);
  const [showComments, setShowComments] = useState(0);

  const user = useAppSelector((state) => state.user.user);
  const { data: comments } = useGetPostCommentsQuery(data?._id);
  const [likePost, { isLoading }] = useLikePostMutation();

  return (
    <div className="my-4 bg-primary p-4 rounded-[29px] shadow bgcard">
      <div className="flex gap-3 items-center mb-2">
        <Link to={"/profile/" + data?.userId?._id}>
          <img
            src={userprofile}
            alt={data?.userId?.name}
            className="w-14 h-14 object-cover rounded-full"
          />
        </Link>

        <div className="w-full flex justify-between">
          <div className="">
            <Link to={"/profile/" + data?.userId?._id}>
              <p className="font-medium text-lg text-ascent-1">
                {data?.userId?.name}
              </p>
            </Link>
            <span className="text-ascent-2">{data?.userId?.location}</span>
          </div>

          <span className="text-ascent-2">
            {moment(data?.createdAt ?? "2024-06-25").fromNow()}
          </span>
        </div>
      </div>

      <div>
        <p className="text-ascent-2">
          {showAll === data?._id
            ? data?.description
            : data?.description.slice(0, 300)}

          {data?.description?.length > 301 &&
            (showAll === data?._id ? (
              <span
                className="text-blue ml-2 font-mediu cursor-pointer"
                onClick={() => setShowAll(0)}
              >
                Show Less
              </span>
            ) : (
              <span
                className="text-blue ml-2 font-medium cursor-pointer"
                onClick={() => setShowAll(data?._id)}
              >
                Show More
              </span>
            ))}
        </p>

        {/* {data?.image && ( */}
        <img
          src={data?.image?.length ? data?.image : frame}
          alt="data image"
          className="w-full mt-2 rounded-lg"
          loading="lazy"
        />
        {/* )} */}
      </div>

      <div
        className="mt-4 flex justify-between items-center px-3 py-2 text-ascent-2
      text-base "
      >
        {isLoading ? (
          <div className="flex gap-2 items-center">
            <Spinner />
          </div>
        ) : (
          <p
            className="flex gap-2 items-center text-base cursor-pointer"
            onClick={() => rtkMutation(likePost, data?._id)}
          >
            {data?.likes?.includes(user?._id) ? (
              <BiSolidLike size={20} color="blue" />
            ) : (
              <BiLike size={20} />
            )}
            {data?.likes?.length} Likes
          </p>
        )}

        <p
          className="flex gap-2 items-center text-base cursor-pointer"
          onClick={() => {
            setShowComments(showComments === data._id ? null : data._id);
            // getComments(data?._id);
          }}
        >
          <BiComment size={20} />
          {data?.comments?.length} Comments
        </p>

        {/* {user?._id === data?.userId?._id && (
          <div
            className="flex gap-1 items-center text-base text-ascent-1 cursor-pointer"
            // onClick={() => deletedata(data?._id)}
          >
            <MdOutlineDeleteOutline size={20} />
            <span>Delete</span>
          </div>
        )} */}
      </div>

      {/* COMMENTS */}
      {showComments === data?._id && (
        <div className="w-full mt-4  ">
          <CommentForm postId={data?._id} />

          {!comments?.data?.length ? (
            <Spinner />
          ) : comments?.data?.length > 0 ? (
            comments?.data?.map((comment: any) => (
              <div
                className="w-full py-2 shadow rounded-[29px] p-8 mt-5"
                key={comment?._id}
              >
                <div className="flex gap-3 items-center mb-1">
                  <Link to={"/profile/" + comment?.userId?._id}>
                    <img
                      src={comment?.userId?.profileUrl ?? userprofile}
                      alt={comment?.userId?.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  </Link>
                  <div>
                    <Link to={"/profile/" + comment?.userId?._id}>
                      <p className="font-medium text-base text-ascent-1">
                        {comment?.userId?.name}
                      </p>
                    </Link>
                    <span className="text-ascent-2 text-sm">
                      {moment(comment?.createdAt ?? "2023-05-25").fromNow()}
                    </span>
                  </div>
                </div>

                <div className="ml-12">
                  <p className="text-ascent-2">{comment?.comment}</p>

                  <div className="mt-2 flex gap-6">
                    {isLoading ? (
                      <div className="flex gap-2 items-center">
                        <Spinner />
                      </div>
                    ) : (
                      <p
                        className="flex gap-2 items-center text-base text-ascent-2 cursor-pointer"
                        onClick={() => rtkMutation(likePost, comment?._id)}
                      >
                        {comment?.likes?.includes(user?._id) ? (
                          <BiSolidLike size={20} color="blue" />
                        ) : (
                          <BiLike size={20} />
                        )}
                        {comment?.likes?.length} Likes
                      </p>
                    )}
                    <span
                      className="text-blue cursor-pointer"
                      onClick={() => setReplyComments(comment?._id)}
                    >
                      Reply
                    </span>
                  </div>

                  {replyComments === comment?._id && (
                    <CommentForm commentId={comment?._id} />
                  )}
                </div>

                {/* REPLIES */}

                <div className="py-2 px-8 mt-6">
                  {comment?.replies?.length > 0 && (
                    <p
                      className="text-base text-ascent-1 cursor-pointer"
                      onClick={() =>
                        setShowReply(
                          showReply === comment?.replies?._id
                            ? 0
                            : comment?.replies?._id
                        )
                      }
                    >
                      Show Replies ({comment?.replies?.length})
                    </p>
                  )}

                  {showReply === comment?.replies?._id &&
                    comment?.replies?.map((reply: any) => (
                      <ReplyCard reply={reply} user={user!} key={reply?._id} />
                    ))}
                </div>
              </div>
            ))
          ) : (
            <span className="flex text-sm py-4 text-ascent-2 text-center">
              No Comments, be first to comment
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default PostCard;
