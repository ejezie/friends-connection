import { Link } from "react-router-dom";
import { BsPersonFillAdd } from "react-icons/bs";
import { useGetNotFriendQuery, useSendFriendReqMutation } from "@/services";
import Empty from "./Empty";
import { openModal } from "@/redux/slices/modal.slice";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { useEffect, useState } from "react";
import formatErrorResponse from "@/utils/formatErrorResponse";
import { Button, Shimmer } from ".";
import { rtkMutation } from "@/utils";
import { ApiResponse } from "@/types";

const Suggested = () => {
  const [id, setId] = useState("");

  // I ran out of time to implement sockets
  const { data, isLoading: isLoadingNot } = useGetNotFriendQuery("", {
    pollingInterval: 10000,
  });
  const [send, { isSuccess, isError, error, isLoading }] =
    useSendFriendReqMutation();

  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.user);

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
          message: "Request sent successfuly",
          success: true,
        })
      );
  }, [isSuccess, isError, error, dispatch]);

  return (
    <div className="w-full bg-primary shadow rounded-[20px] my-4 px-5 py-5 bgcard">
      <div className="flex items-center justify-between text-lg text-ascent-1 pb-2 border-b border-[#66666645]">
        <span>Friend Suggestion</span>
      </div>
      <div className="w-full flex flex-col gap-4 pt-4">
        {isLoadingNot ? (
          <div className="w-full">
            <Shimmer className="w-full h-[50px] mb-4 rounded-xl" />
            <Shimmer className="w-full h-[50px] mb-4 rounded-xl" />
          </div>
        ) : !data?.length ? (
          <Empty title="Nothing yet" />
        ) : (
          data?.user
            ?.filter((item: ApiResponse) => user?._id !== item?._id)
            .map((data: ApiResponse) => (
              <div
                className="flex items-center justify-between"
                key={data._id as string}
              >
                <Link
                  to={"/profile/" + data?._id}
                  key={data?._id as string}
                  className="w-full flex gap-4 items-center cursor-pointer"
                >
                  <div className="flex-1 ">
                    <p className="text-base font-medium text-ascent-1 textwrp w-[120px]">
                      {data?.name as string}
                    </p>
                    <div className="text-sm text-ascent-2 w-[150px] textwrp">
                      {data?.email as string}
                    </div>
                  </div>
                </Link>

                <div className="flex gap-1">
                  <Button
                    className="text-sm !w-10 text-white p-1 rounded-sm"
                    loading={isLoading && id === data?._id}
                    onClick={() => {
                      setId(data?._id as string);
                      rtkMutation(send, { requestTo: data?._id });
                    }}
                  >
                    {isSuccess && id === data?._id ? (
                      "sent"
                    ) : (
                      <BsPersonFillAdd size={20} className="" />
                    )}
                  </Button>
                </div>
              </div>
            ))
        )}
      </div>
    </div>
  );
};

export default Suggested;
