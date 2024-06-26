/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from "react";
import { Button, Empty, Shimmer } from ".";
import { Link } from "react-router-dom";
import { userprofile } from "@/assets";
import { useGetAllReqQuery, useAcceptReqMutation } from "@/services";
import { rtkMutation } from "@/utils";
import Spinner from "./Spinner";
import { openModal } from "@/redux/slices/modal.slice";
import formatErrorResponse from "@/utils/formatErrorResponse";
import { useAppDispatch } from "@/hooks";

const FriendRequst = () => {
  // I ran out of time to implement sockets
  const { data, isLoading } = useGetAllReqQuery("", { pollingInterval: 10000 });
  const [
    handleReq,
    { data: datareq, isSuccess, isError, error, isLoading: isLoadingReq },
  ] = useAcceptReqMutation();

  const dispatch = useAppDispatch();

  useEffect(() => {
    isError &&
      dispatch(
        openModal({
          message: formatErrorResponse(error) || "Error Occured",
        })
      );
    isSuccess &&
      dispatch(
        openModal({
          message: datareq?.message,
          success: true,
        })
      );
  }, [isSuccess, isError, error, dispatch, datareq]);
  return (
    <div className="w-full bg-primary shadow px-6 py-5 rounded-[20px] bgcard">
      <div className="flex items-center justify-between text-xl text-ascent-1 pb-2 border-b border-[#66666645]">
        <span> Friend Request</span>
        <span>{data?.data?.length}</span>
      </div>

      <div className="w-full flex flex-col gap-4 pt-4 ">
        {isLoading ? (
          <div className="w-full">
            <div className="w-full">
              <Shimmer className="h-[50px] w-full mb-4 rounded-xl" />
              <Shimmer className="h-[50px] w-full mb-4 rounded-xl" />
            </div>
          </div>
        ) : !data?.data?.length ? (
          <Empty title="No friend requests at the moment" />
        ) : (
          data?.data?.map((req: any, idx: number) => (
            <div key={idx} className="start justify-between flex-col">
              <Link
                to={"/profile/" + req._id}
                className="w-full flex gap-1 items-center cursor-pointer m-3"
              >
                <img
                  src={(req?.requestFrom?.profileUrl as string) ?? userprofile}
                  alt={(req?.requestFrom?.name as string) || "Joy"}
                  className="w-10 h-10 object-cover rounded-full"
                />
                <div className="flex-1">
                  <p className="text-base font-medium text-ascent-1 textwrp w-[120px] xl:w-[100%]">
                    {req?.requestFrom?.name as any}
                  </p>
                  <div className="text-sm text-ascent-2 textwrp w-[120px] xl:w-[100%]">
                    {req?.requestFrom?.email as string}
                  </div>
                </div>
              </Link>

              {isLoadingReq ? (
                <div className="flex gap-1">
                  <Spinner />
                </div>
              ) : (
                <div className="flex gap-1">
                  <Button
                    onClick={() =>
                      rtkMutation(handleReq, {
                        rid: req?._id,
                        status: "Accepted",
                      })
                    }
                  >
                    Accept
                  </Button>
                  <Button
                    onClick={() =>
                      rtkMutation(handleReq, {
                        rid: req?._id,
                        status: "Rejected",
                      })
                    }
                  >
                    Reject
                  </Button>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default FriendRequst;
