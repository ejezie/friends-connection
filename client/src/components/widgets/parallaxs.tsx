import { useRef } from "react";
import { MouseParallax, ScrollEfect } from "../animation";
import { avatar1, avatar2, avatar3, avatar4 } from "@/assets/image";
import { useAppSelector } from "@/hooks";

const Blob = () => {
  const isDarkMode = useAppSelector((state) => state.theme.isDarkMode);

  return (
    <svg viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <clipPath id="a">
          <path
            fill="currentColor"
            d="M773.5 595q-47.5 95-121 224t-203 61Q320 812 182 739t-36-202q102-129 121.5-268T428 120q141-10 212 96.5t126 195q55 88.5 7.5 183.5Z"
          />
        </clipPath>
      </defs>
      <g clipPath="url(#a)">
        <path
          fill={`${isDarkMode ? "#444cf7" : "#F0F0F0"}`}
          d="M773.5 595q-47.5 95-121 224t-203 61Q320 812 182 739t-36-202q102-129 121.5-268T428 120q141-10 212 96.5t126 195q55 88.5 7.5 183.5Z"
        />
      </g>
    </svg>
  );
};

export const BlobParallax = () => {
  const parallaxRefTwo = useRef(null);

  return (
    <MouseParallax
      strength={12}
      parallaxContainerRef={parallaxRefTwo}
      enableOnTouchDevice={true}
      lerpEase={0.05}
      isAbsolutelyPositioned={true}
      zIndex={-10}
    >
      <ScrollEfect
        className="w-[150vw] h-[400px] ml-[10vw] mt-[40vh] xl:mt-[20vh] "
        animationSpeed={0.1}
        inViewProperties={{
          opacity: [0, 1],
        }}
        properties={{
          y: ["0vh", "-50vh"],
          transform: ["rotate(40deg)"],
        }}
        inViewDelay={1}
        inViewTransitionTime={1.4}
        transformOrigin="center center"
      >
        <Blob />
      </ScrollEfect>
    </MouseParallax>
  );
};

export const TextParallax = () => {
  const parallaxRefOne = useRef(null);

  return (
    <MouseParallax
      strength={2}
      parallaxContainerRef={parallaxRefOne}
      enableOnTouchDevice={true}
      lerpEase={0.01}
      isAbsolutelyPositioned={true}
      zIndex={10}
    >
      <ScrollEfect
        className="font-[400] ml-[10vw] whitespace-nowrap xl:py-[15vh] py-[20vh]"
        animationSpeed={0.1}
        // shouldPause={intersection?.isIntersecting ? true : false}
        inViewProperties={
          {
            // opacity: [0, 1],
          }
        }
        properties={{
          scale: [2.3],
          opacity: [0, 0, 0, 1],
        }}
        inViewDelay={1}
        inViewTransitionTime={1.4}
        transformOrigin="center center"
      >
        <span className="dec text-[6px] lg:text-[15px]">
          "Hello! welcome to"
        </span>
      </ScrollEfect>
    </MouseParallax>
  );
};

export const AvatarParallaxOne = () => {
  const parallaxRefAvOne = useRef(null);

  return (
    <MouseParallax
      strength={5}
      parallaxContainerRef={parallaxRefAvOne}
      enableOnTouchDevice={true}
      lerpEase={0.01}
      isAbsolutelyPositioned={true}
      zIndex={-10}
    >
      <ScrollEfect
        // className="font-[400] whitespace-nowrap xl:py-[15vh] py-[20vh]"
        animationSpeed={0.1}
        // shouldPause={intersection?.isIntersecting ? true : false}
        inViewProperties={{
          opacity: [0, 1],
        }}
        properties={{
          x: ["60vw", "70vw"],
        }}
        inViewDelay={1}
        inViewTransitionTime={1.4}
        transformOrigin="center center"
      >
        <img
          loading="lazy"
          src={avatar1}
          className="text-[] left-[60vw] mt-[12vh] h-[60px] w-[60px] lg:h-[100px] lg:w-[100px] object-contain"
        ></img>
      </ScrollEfect>
    </MouseParallax>
  );
};
export const AvatarParallaxTwo = () => {
  const parallaxRefAvTwo = useRef(null);

  return (
    <MouseParallax
      strength={4}
      parallaxContainerRef={parallaxRefAvTwo}
      enableOnTouchDevice={true}
      lerpEase={0.01}
      isAbsolutelyPositioned={true}
      zIndex={-10}
    >
      <ScrollEfect
        // className="font-[400] whitespace-nowrap xl:py-[15vh] py-[20vh]"
        animationSpeed={0.05}
        // shouldPause={intersection?.isIntersecting ? true : false}
        inViewProperties={{
          opacity: [0, 1],
        }}
        properties={{
          x: ["0vw", "-10vw"],
          y: ["0vh", "-10vh"],
        }}
        inViewDelay={1}
        inViewTransitionTime={1.4}
        transformOrigin="center center"
      >
        <img
          loading="lazy"
          src={avatar2}
          className="ml-[15vw] mt-[60vh] h-[100px] w-[100px]"
        ></img>
      </ScrollEfect>
    </MouseParallax>
  );
};
export const AvatarParallaxThree = () => {
  const parallaxRefAvThree = useRef(null);

  return (
    <MouseParallax
      strength={5}
      parallaxContainerRef={parallaxRefAvThree}
      enableOnTouchDevice={true}
      lerpEase={0.01}
      isAbsolutelyPositioned={true}
      zIndex={-10}
    >
      <ScrollEfect
        // className="font-[400] whitespace-nowrap xl:py-[15vh] py-[20vh]"
        animationSpeed={0.1}
        // shouldPause={intersection?.isIntersecting ? true : false}
        inViewProperties={{
          opacity: [0, 1],
        }}
        properties={{
          scale: [1.2, 1],
          x: ["0vw", "20vw"],
        }}
        inViewDelay={1}
        inViewTransitionTime={1.4}
        transformOrigin="center center"
      >
        <img
          loading="lazy"
          src={avatar3}
          className="dec text-[] ml-[70vw] mt-[60vh] h-[40px] w-[40px]"
        ></img>
      </ScrollEfect>
    </MouseParallax>
  );
};
export const AvatarParallaxFive = () => {
  const parallaxRefAvFour = useRef(null);

  return (
    <MouseParallax
      strength={2}
      parallaxContainerRef={parallaxRefAvFour}
      enableOnTouchDevice={true}
      lerpEase={0.01}
      isAbsolutelyPositioned={true}
      zIndex={-10}
    >
      <ScrollEfect
        // className="font-[400] whitespace-nowrap xl:py-[15vh] py-[20vh]"
        animationSpeed={0.1}
        // shouldPause={intersection?.isIntersecting ? true : false}
        inViewProperties={{
          opacity: [0, 1],
        }}
        properties={{
          x: ["0vw", "-10vw"],
          y: ["0vh", "-4vh"],
        }}
        inViewDelay={1}
        inViewTransitionTime={1.4}
        transformOrigin="center center"
      >
        <img
          loading="lazy"
          src={avatar4}
          className="dec text-[] ml-[50vw] mt-[80vh] h-[60px] w-[60px]"
        ></img>
      </ScrollEfect>
    </MouseParallax>
  );
};
export const AvatarParallaxSix = () => {
  const parallaxRefAvFour = useRef(null);

  return (
    <MouseParallax
      strength={30}
      parallaxContainerRef={parallaxRefAvFour}
      enableOnTouchDevice={true}
      lerpEase={0.01}
      isAbsolutelyPositioned={true}
      zIndex={-10}
    >
      <ScrollEfect
        // className="font-[400] whitespace-nowrap xl:py-[15vh] py-[20vh]"
        animationSpeed={0.1}
        // shouldPause={intersection?.isIntersecting ? true : false}
        inViewProperties={{
          opacity: [0, 1],
        }}
        properties={{
          x: ["0vw", "-10vw"],
          y: ["0vh", "-4vh"],
        }}
        inViewDelay={1}
        inViewTransitionTime={1.4}
        transformOrigin="center center"
      >
        <img
          loading="lazy"
          src={avatar2}
          className="dec text-[] ml-[50vw] mt-[30vh] h-[30px] w-[30px]"
        ></img>
      </ScrollEfect>
    </MouseParallax>
  );
};
export const AvatarParallaxFour = () => {
  const parallaxRefAvFour = useRef(null);

  return (
    <MouseParallax
      strength={2}
      parallaxContainerRef={parallaxRefAvFour}
      enableOnTouchDevice={true}
      lerpEase={0.01}
      isAbsolutelyPositioned={true}
      zIndex={-10}
    >
      <ScrollEfect
        // className="font-[400] whitespace-nowrap xl:py-[15vh] py-[20vh]"
        animationSpeed={0.1}
        // shouldPause={intersection?.isIntersecting ? true : false}
        inViewProperties={{
          opacity: [0, 1],
        }}
        properties={{
          x: ["0vw", "-10vw"],
          y: ["0vh", "-4vh"],
        }}
        inViewDelay={1}
        inViewTransitionTime={1.4}
        transformOrigin="center center"
      >
        <img
          loading="lazy"
          src={avatar4}
          className="dec text-[] ml-[10vw] mt-[2vh] h-[60px] w-[60px]"
        ></img>
      </ScrollEfect>
    </MouseParallax>
  );
};
