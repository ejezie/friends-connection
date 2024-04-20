import { Button, Toggle } from "@/components";
import React from "react";

const AuthHeader: React.FC = (): React.JSX.Element => {
  return (
    <div className="w-full py-4 end items-center px-[3vw]">
      <div className="center">
        <Toggle />
        <Button className="ml-3">Sign Up</Button>
        <Button className="ml-3">Login</Button>
      </div>
    </div>
  );
};

export default AuthHeader;
