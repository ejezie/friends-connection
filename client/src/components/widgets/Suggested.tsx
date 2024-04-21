/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link } from "react-router-dom";
import { BsPersonFillAdd } from "react-icons/bs";
import { useGetNotFriendQuery } from "@/services";
import Empty from "./Empty";

const Suggested = () => {
  const { data } = useGetNotFriendQuery("");

  return (
    <div className="w-full bg-primary shadow rounded-[20px] my-4 px-5 py-5 bgcard">
      <div className="flex items-center justify-between text-lg text-ascent-1 border-b border-[#66666645]">
        <span>Friend Suggestion</span>
      </div>
      <div className="w-full flex flex-col gap-4 pt-4">
        {data?.user?.map((data: any) => (
          <div className="flex items-center justify-between" key={data._id}>
            <Link
              to={"/profile/" + data?._id}
              key={data?._id}
              className="w-full flex gap-4 items-center cursor-pointer"
            >
              <div className="flex-1 ">
                <p className="text-base font-medium text-ascent-1">
                  {data?.name}
                </p>
                <span className="text-sm text-ascent-2">{data?.email}</span>
              </div>
            </Link>

            <div className="flex gap-1">
              <button
                className="bg-[#0444a430] text-sm text-white p-1 rounded"
                onClick={() => {}}
              >
                <BsPersonFillAdd size={20} className="text-[#0f52b6]" />
              </button>
            </div>
          </div>
        ))}
      </div>
      {!data?.user?.length && <Empty title="Nothing yet" />}
    </div>
  );
};

export default Suggested;
