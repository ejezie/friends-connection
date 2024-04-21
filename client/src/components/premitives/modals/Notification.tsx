import React, { useEffect, useState } from "react";
import { IoMdCheckmark } from "react-icons/io";
import {
  useGetNotificationsQuery,
  useMarkNotificationMutation,
} from "@/services";
import { MdCancelScheduleSend } from "react-icons/md";
import { Empty, Shimmer, Button } from "@/components/widgets";
import { ApiResponse } from "@/types";
import { closeComponentModal, openModal } from "@/redux/slices/modal.slice";
import { useAppDispatch } from "@/hooks";
import formatErrorResponse from "@/utils/formatErrorResponse";
import { rtkMutation } from "@/utils";

const Notification = () => {
  const [id, setId] = useState("");

  // I ran out of time to implement sockets
  const { data, isLoading } = useGetNotificationsQuery("", {
    pollingInterval: 10000,
  });
  const [markRead, { isSuccess, error, isError }] =
    useMarkNotificationMutation();

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
          message: "Request sent successfuly",
          success: true,
        })
      );
  }, [isSuccess, isError, error, dispatch]);

  return (
    <div className="relative w-[90vw] lg:w-[35vw] pb-4">
      <div
        className="absolute top-6 right-3 cursor-pointer bgcard p-2 rounded-xl shadow-lg"
        onClick={() => dispatch(closeComponentModal())}
      >
        <MdCancelScheduleSend />
      </div>
      <div className="w-full bg-primary shadow rounded-[20px] my-4 px-5 py-5 bgcard h-[80vh] overflow-scroll">
        <div className="flex items-center justify-between text-lg text-ascent-1 pb-2 border-b border-[#66666645]">
          <span>Notifacations</span>
        </div>
        <div className="w-full flex flex-col gap-4 pt-4">
          {isLoading ? (
            <div className="w-full">
              <Shimmer className="w-full h-[50px] mb-4 rounded-xl" />
              <Shimmer className="w-full h-[50px] mb-4 rounded-xl" />
              <Shimmer className="w-full h-[50px] mb-4 rounded-xl" />
              <Shimmer className="w-full h-[50px] mb-4 rounded-xl" />
              <Shimmer className="w-full h-[50px] mb-4 rounded-xl" />
              <Shimmer className="w-full h-[50px] mb-4 rounded-xl" />
              <Shimmer className="w-full h-[50px] mb-4 rounded-xl" />
              <Shimmer className="w-full h-[50px] mb-4 rounded-xl" />
              <Shimmer className="w-full h-[50px] mb-4 rounded-xl" />
              <Shimmer className="w-full h-[50px] mb-4 rounded-xl" />
            </div>
          ) : !data?.data?.length ? (
            <Empty title="Nothing yet" />
          ) : (
            data?.data?.map((data: ApiResponse) => (
              <div
                className="w-full flex items-center justify-between rounded-[20px] shadowin p-2 flex-col lg:flex-row"
                key={data._id as string}
              >
                <div
                  key={data?._id as string}
                  className="w-full flex gap-4 items-center cursor-pointer"
                >
                  <div className="flex-1 ">
                    <p className="xl:text-base text-[12px] font-medium text-ascent-1 textwrp lg:w-[300px] w-[270px] mr-2">
                      {data?.message as string}
                    </p>
                  </div>
                </div>

                <div className="flex gap-1">
                  <Button
                    className="text-sm !w-10 text-white p-1 rounded-2xl"
                    loading={isLoading && id === data?._id}
                    onClick={() => {
                      setId(data?._id as string);
                      rtkMutation(markRead, { data: data?._id });
                    }}
                  >
                    {isSuccess && id === data?._id ? (
                      <IoMdCheckmark />
                    ) : (
                      <div>mark</div>
                    )}
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Notification;
