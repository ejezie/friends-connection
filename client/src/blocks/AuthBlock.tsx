import {
  AuthHeader,
  AvatarParallaxSix,
  AvatarParallaxFive,
  AvatarParallaxFour,
  AvatarParallaxOne,
  AvatarParallaxThree,
  AvatarParallaxTwo,
  BlobParallax,
  Container,
  ScrollEfect,
  TextParallax,
} from "@/components";
import React from "react";
import { useWindowSize } from "react-use";

const AuthBlock: React.FC = (): React.JSX.Element => {
  const { width, height } = useWindowSize();

  return (
    <>
      <div
        className={`w-full relative `}
        style={{
          height: height * 3.8,
        }}
      >
        <div className="sticky top-0  overflow-x-hidden h-[100vh]">
          <AuthHeader />
          <BlobParallax />
          <TextParallax />
          <AvatarParallaxOne />
          <AvatarParallaxTwo />
          <AvatarParallaxThree />
          <AvatarParallaxFour />
          <AvatarParallaxFive />
          <AvatarParallaxSix />
          <Container>
            <ScrollEfect
              className="font-[900] italic whitespace-nowrap xl:py-[18vh] py-[30vh]"
              animationSpeed={0.2}
              // shouldPause={intersection?.isIntersecting ? true : false}
              inViewProperties={{
                opacity: [0, 1],
                y: [10, 0],
              }}
              properties={{
                x: ["0vw", "-97.5vw"],
                opacity: [0.7, 0.93],
              }}
              inViewDelay={0.5}
              inViewTransitionTime={1}
              transformOrigin="center center"
            >
              <span style={{ fontSize: width * 0.155 }} className="gradtext ">
                <span className="mr-[21vw] pl-[7vw]">CONNECT</span>{" "}
                <span>FRIENDS</span>
              </span>
            </ScrollEfect>
          </Container>
        </div>
      </div>
    </>
  );
};

export default AuthBlock;
