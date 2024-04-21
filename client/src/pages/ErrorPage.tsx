import { frame } from "@/assets";
import React from "react";

const ErrorPage = () => {
  return (
    <div className="center flex-col p-10">
      <img src={frame} alt="frame" />
      <h1 className="lg:text-[40px] text-[25px] mt-10">OPPS! NOTHING HERE</h1>
    </div>
  );
};

export default ErrorPage;
