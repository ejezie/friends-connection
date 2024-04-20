import React, { useState } from "react";
import { userprofile } from "@/assets";
import { useAppSelector } from "@/hooks";
import { Button, Input } from ".";

const CommentForm: React.FC = (): React.JSX.Element => {
  const [errMsg, setErrMsg] = useState("");

  const user = useAppSelector((state) => state.user);

  return (
    <div className="w-full border-b border-[#66666645]">
      <div className="w-full flex items-center gap-2 py-4">
        <img
          src={user?.profileUrl ?? userprofile}
          alt="User Image"
          className="w-10 h-10 rounded-full object-cover"
        />

        <Input
          type=""
          label=""
          labelStyles=""
          name="comment"
          className="w-full rounded-full py-3"
          placeholder={"Comment this post"}
          error={""}
        />
      </div>
      {errMsg && (
        <span
          role="alert"
          className={`text-sm ${
            errMsg === "failed" ? "text-[#f64949fe]" : "text-[#2ba150fe]"
          } mt-0.5`}
        >
          {errMsg}
        </span>
      )}

      <div className="flex items-end justify-end pb-2">
        <Button />
      </div>
    </div>
  );
};

export default CommentForm;
