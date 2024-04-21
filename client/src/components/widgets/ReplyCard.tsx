/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import { userprofile } from "@/assets";

interface ReplyCardProps {
  reply: { [key in string]: any };
}

const ReplyCard: React.FC<ReplyCardProps> = ({ reply }): React.JSX.Element => {
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
        <p className="text-ascent-2 text-[12px] lg:text-[14px]">
          {reply?.comment}
        </p>
      </div>
    </div>
  );
};

export default ReplyCard;
