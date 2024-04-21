import { userprofile } from "@/assets";
import { Button, Toggle } from "@/components";
import { useAppDispatch, useAuth } from "@/hooks";
import { openModal } from "@/redux/slices/modal.slice";
import { logoutUser } from "@/redux/slices/user.slice";
import React from "react";
import { Link } from "react-router-dom";
import { MdOutlineMenu } from "react-icons/md";
import { useGetNotificationsQuery } from "@/services";
import { LuBellRing } from "react-icons/lu";

interface AuthHeaderProps {
  setIsOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  open?: boolean;
}

const AuthHeader: React.FC<AuthHeaderProps> = ({
  setIsOpen,
  open,
}): React.JSX.Element => {
  const dispatch = useAppDispatch();

  const { auth } = useAuth();
  const { data } = useGetNotificationsQuery("", { skip: !auth });

  return (
    <div className="w-full text py-4 between items-center px-[3vw]">
      {auth && (
        <div
          className="block md:hidden"
          onClick={() => {
            if (setIsOpen) {
              setIsOpen(!open);
            }
          }}
        >
          <MdOutlineMenu />
        </div>
      )}
      <Link
        to={"/"}
        className="btncolor center font-[900] !text-white text-2xl p-1 rounded-full w-[50px]"
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
            <div
              className="center btncolor !text-white rounded-full w-8 h-8 ml-3 cursor-pointer relative"
              onClick={() => dispatch(openModal({ component: "Notification" }))}
            >
              {data?.data?.length || "-"}
              <span className="absolute top-[-10px] text">
                <LuBellRing />
              </span>
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
