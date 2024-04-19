import React from "react";
import { dark, light } from "@/assets/image";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { toggleTheme } from "@/redux/slices/theme.slice";

const Toggle: React.FC = (): React.JSX.Element => {
  const isDarkMode = useAppSelector((state) => state.theme.isDarkMode);
  const dispatch = useAppDispatch();

  return (
    <div
      className="btncolor w-[60px] center rounded-full p-[4px] cursor-pointer"
      onClick={() => dispatch(toggleTheme())}
    >
      <div
        className={`bg-white rounded-full h-[24px] w-[24px] center transform ${
          isDarkMode ? "translate-x-[15px]" : "translate-x-[-15px]"
        } transition ease-in duration-300 `}
      >
        {isDarkMode ? (
          <img
            src={dark}
            alt="check"
            loading="lazy"
            className="w-6 h-6 object-contain"
          />
        ) : (
          <img
            src={light}
            alt="check"
            loading="lazy"
            className="w-5 h-5 object-contain"
          />
        )}
      </div>
    </div>
  );
};

export default Toggle;
