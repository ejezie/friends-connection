import { userprofile } from "@/assets";
import { Button, Toggle } from "@/components";
import { useAppDispatch, useAuth } from "@/hooks";
import { openModal } from "@/redux/slices/modal.slice";
import { logoutUser } from "@/redux/slices/user.slice";
import React from "react";
import { Link } from "react-router-dom";

const AuthHeader: React.FC = (): React.JSX.Element => {
  const dispatch = useAppDispatch();

  const { auth } = useAuth();

  return (
    <div className="w-full text py-4 between items-center px-[3vw]">
      <Link
        to={"/"}
        className="btncolor center text font-[900] text-2xl p-1 rounded-full w-[50px]"
      >
        F
      </Link>
      <div className="center">
        <Toggle />
        {auth ? (
          <div className="center">
            <div className="ml-3 w-8 h-8 ">
              <img src={userprofile} alt="profile" />
            </div>
            <div className="center text btncolor rounded-full w-8 h-8 ml-3">
              3
            </div>
            <Button
              className=" ml-3"
              onClick={() => {
                dispatch(logoutUser());
              }}
            >
              Log Out
            </Button>
          </div>
        ) : (
          <div className="center">
            <Button
              onClick={() => {
                window.scrollTo(0, 1800);
                dispatch(openModal({ component: "AuthModal" }));
              }}
              className="ml-3"
            >
              Sign Up
            </Button>
            <Button
              className="ml-3"
              onClick={() => {
                window.scrollTo(0, 1800);
                dispatch(openModal({ component: "AuthModal", data: "login" }));
              }}
            >
              Login
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthHeader;
