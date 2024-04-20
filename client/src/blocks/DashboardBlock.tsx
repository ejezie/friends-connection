import { AuthHeader, SideBar, Container, RightSideBar } from "@/components";
import React from "react";

interface DashboardBlockProps {
  component: React.ElementType<unknown>;
}

const DashboardBlock: React.FC<DashboardBlockProps> = ({
  component: Component,
}): React.JSX.Element => {
  return (
    <>
      <div className="sticky top-0 w-[full] mb-4 z-10 shadowin bgcard">
        <AuthHeader />
      </div>
      <Container>
        <div className="w-full start gap-4 relative">
          <div className="w-[25%] fixed h-[88vh] overflow-y-scroll">
            <SideBar />
          </div>
          <div className="w-[50%] mx-[27.7%]">
            <Component />
          </div>
          <div className="w-[25%] fixed right-[3vw] h-[88vh] overflow-y-scroll">
            <RightSideBar />
          </div>
        </div>
      </Container>
    </>
  );
};

export default DashboardBlock;
