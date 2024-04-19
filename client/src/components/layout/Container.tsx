import React from "react";

interface ContainerProps {
  children: React.ReactNode | React.ReactNode[];
}

const Container: React.FC<ContainerProps> = ({
  children,
}): React.JSX.Element => {
  return (
    <div className="w-full">
      <div className="px-[3vw] mx-auto">{children}</div>
    </div>
  );
};

export default Container;
