/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { motion, MotionStyle, transform } from "framer-motion";
import { useLenis, ReactLenis } from "@studio-freight/react-lenis";
import { useRect } from "@studio-freight/hamo";
import { useWindowSize } from "react-use";
import gsap from "gsap";

interface StaticRenderProps {
  properties?: {
    [key in keyof MotionStyle]: (string | number)[];
  };
  inViewProperties?: {
    [key in keyof MotionStyle]: (string | number)[];
  };
  children: React.ReactNode | React.ReactNode[];
  transformOrigin?: string;
  inViewTransitionTime?: number;
  inViewDelay?: number;
  runOnce?: boolean;
  isPast?: boolean;
  shouldPause?: boolean;
  animationSpeed?: number;
  scrollYtoStop?: number | null;
}

type ScrollEffectProps = Omit<StaticRenderProps, "scrollY" | "isPast"> & {
  longThrow?: boolean;
  className?: string;
};

const ScrollEffect = ({
  transformOrigin,
  properties = {},
  inViewProperties = {},
  inViewTransitionTime = 0.4,
  inViewDelay = 0,
  children,
  runOnce = false,
  longThrow = false, // used for when scroll should end after element has exited (good for parallax imgs)
  animationSpeed = 1,
  scrollYtoStop = null,
  shouldPause = false,
  className,
  ...props
}: ScrollEffectProps): JSX.Element => {
  const [setRef, selfRect] = useRect();
  const { height: windowHeight } = useWindowSize();
  const element = React.useRef<HTMLDivElement>(null);
  const [past, setPast] = React.useState(false);

  useLenis(
    ({ scroll }: any) => {
      console.log(scroll, "sc");
      if ((scrollYtoStop && scrollYtoStop <= scroll) || shouldPause) {
        return;
      }
      const rect = selfRect;
      const start = Math.max(
        rect.top - windowHeight * (longThrow ? 1 : 0.5),
        0
      );
      const end = rect.top + rect.height + (longThrow ? windowHeight : 0);

      if (animationSpeed > 1) {
        animationSpeed = 1;
      }

      const scrollAmt = transform(
        [start, end],
        [0, 1]
      )(scroll * animationSpeed);

      if (scrollAmt === 1 && !past) {
        setPast(true);
      }

      const data = Object.fromEntries(
        Object.entries(properties).map(([key, valArr]: any) => {
          // need to create 'points' that framer can map our array of vals to.
          // Just split the number 1 (for 0-1) and divide by the amount of properties we're moving thru
          const arr = valArr.map(
            (_: unknown, i: number) => (1 / valArr.length) * i
          );
          const transformer = transform(arr, valArr)(scrollAmt);
          return [key, transformer];
        })
      );
      // console.log(data, "data");
      gsap.to(element?.current, {
        ...data,
      });
    },
    [selfRect]
  );

  return (
    <ReactLenis root>
      <motion.div
        ref={(node) => {
          setRef(node);
        }}
        initial={
          !past || !runOnce
            ? {
                ...Object.fromEntries(
                  Object.entries(inViewProperties).map(([k, v]: any) => [
                    k,
                    v[0],
                  ])
                ),
              }
            : {
                ...Object.fromEntries(
                  Object.entries(inViewProperties).map(([k, v]: any) => [
                    k,
                    v[1],
                  ])
                ),
              }
        }
        whileInView={
          !past || !runOnce
            ? {
                ...Object.fromEntries(
                  Object.entries(inViewProperties).map(([k, v]: any) => [
                    k,
                    v[1],
                  ])
                ),
                transition: {
                  duration: inViewTransitionTime,
                  delay: inViewDelay,
                },
              }
            : {}
        }
        viewport={{
          once: runOnce,
        }}
        {...props}
      >
        <div
          ref={element}
          style={{
            transformOrigin,
          }}
          className={className}
        >
          {children}
        </div>
      </motion.div>
    </ReactLenis>
  );
};

export default ScrollEffect;
