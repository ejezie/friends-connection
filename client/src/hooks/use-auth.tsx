import React from "react";
import { useAppSelector } from ".";

const useAuth = () => {
  const token = useAppSelector((state) => state.user.token);

  return token ? { auth: true } : { auth: false };
};

export default useAuth;
