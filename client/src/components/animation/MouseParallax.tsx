/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useRef, useEffect, useCallback } from "react";

interface MouseParallax {
  strength?: number;
  children?: React.ReactNode;
  parallaxContainerRef?: React.MutableRefObject<any> | null;
  scrollContainerRef?: React.MutableRefObject<any> | null;
  enableOnTouchDevice?: boolean;
  lerpEase?: number;
  isAbsolutelyPositioned?: boolean;
  zIndex?: number;
  shouldPause?: boolean;
}

const MouseParallax: React.FC<MouseParallax> = ({
  strength = 10,
  children,
  parallaxContainerRef,
  scrollContainerRef,
  enableOnTouchDevice = false,
  lerpEase = 0.1,
  isAbsolutelyPositioned = false,
  zIndex = 1,
  shouldPause = false,
}) => {
  const requestRef = useRef<number>();

  const targetPosition = useRef({ x: 0, y: 0 });
  const currentPosition = useRef({ x: 0, y: 0 });

  const animate = useCallback(() => {
    if (shouldPause) {
      return;
    }

    const lerp = (start: number, end: number, t: number) => {
      return start * (1 - t) + end * t;
    };

    currentPosition.current.x = lerp(
      currentPosition.current.x,
      targetPosition.current.x,
      lerpEase
    );
    currentPosition.current.y = lerp(
      currentPosition.current.y,
      targetPosition.current.y,
      lerpEase
    );

    if (parallaxContainerRef?.current) {
      parallaxContainerRef.current.style.willChange = "transform";
      parallaxContainerRef.current.style.transform = `translate3d(${currentPosition.current.x}px, ${currentPosition.current.y}px, 0)`;
    }

    requestRef.current = requestAnimationFrame(animate);
  }, [lerpEase, parallaxContainerRef, shouldPause]);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (!enableOnTouchDevice && "ontouchstart" in window) {
        return;
      }

      const rect = parallaxContainerRef?.current.getBoundingClientRect();
      const scrollY = scrollContainerRef?.current
        ? scrollContainerRef.current.scrollTop
        : window.scrollY;

      targetPosition.current.x =
        ((event.clientX - rect.left) / rect.width - 0.5) * strength;
      targetPosition.current.y =
        ((event.clientY - rect.top - scrollY) / rect.height - 0.5) * strength;
    };

    window.addEventListener("mousemove", handleMouseMove);

    requestRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [
    strength,
    enableOnTouchDevice,
    parallaxContainerRef,
    scrollContainerRef,
    animate,
  ]);

  const containerStyle: React.CSSProperties = {
    position: isAbsolutelyPositioned ? "absolute" : "relative",
    zIndex,
  };

  return (
    <div ref={parallaxContainerRef} style={containerStyle}>
      {children}
    </div>
  );
};

export default MouseParallax;
