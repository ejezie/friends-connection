/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import { userprofile } from "@/assets";
import { BiLike, BiSolidLike } from "react-icons/bi";
import { rtkMutation } from "@/utils";
import Spinner from "./Spinner";
import { useLikePostMutation } from "@/services";

interface ReplyCardProps {
  reply: { [key in string]: any };
  user: { [key in string]: any };
}

const ReplyCard: React.FC<ReplyCardProps> = ({
  reply,
  user,
}): React.JSX.Element => {
  const [likePost, { isLoading }] = useLikePostMutation();

  return (
    <div className="w-full py-3">
      <div className="flex gap-3 items-center mb-1">
        <Link to={"/profile/" + reply?.userId?._id}>
          <img
            src={reply?.userId?.profileUrl ?? userprofile}
            alt={reply?.userId?.name}
            className="w-10 h-10 rounded-full object-cover"
          />
        </Link>

        <div>
          <Link to={"/profile/" + reply?.userId?._id}>
            <p className="font-medium text-base text-ascent-1">
              {reply?.userId?.name}
            </p>
          </Link>
          <span className="text-ascent-2 text-sm">
            {moment(reply?.createdAt).fromNow()}
          </span>
        </div>
      </div>

      <div className="ml-12">
        <p className="text-ascent-2 ">{reply?.comment}</p>
        <div className="mt-2 flex gap-6">
          {isLoading ? (
            <div className="flex gap-2 items-center">
              <Spinner />
            </div>
          ) : (
            <p
              className="flex gap-2 items-center text-base text-ascent-2 cursor-pointer"
              onClick={() => rtkMutation(likePost, reply?._id)}
            >
              {reply?.likes?.includes(user?._id) ? (
                <BiSolidLike size={20} color="blue" />
              ) : (
                <BiLike size={20} />
              )}
              {reply?.likes?.length} Likes
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReplyCard;
