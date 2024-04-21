import { AuthHeader, SideBar, Container, RightSideBar } from "@/components";
import React, { useEffect, useState } from "react";

interface DashboardBlockProps {
  component: React.ElementType<unknown>;
}

const DashboardBlock: React.FC<DashboardBlockProps> = ({
  component: Component,
}): React.JSX.Element => {
  const [open, setIsOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <div className="sticky top-0 w-[full] mb-4 z-10 shadowin bgcard">
        <AuthHeader setIsOpen={setIsOpen} open={open} />
      </div>
      <Container>
        <div className="w-full start md:center gap-4 relative min-h-[100vh]">
          <div
            className={`xl:w-[25%]  fixed h-[88vh] overflow-y-scroll transform ${
              open
                ? "translate-x-[0vw] bgcard left-0 w-[90%] shadow-2xl p-4"
                : "translate-x-[-100vw]"
            } xl:translate-x-[0vw] transition ease-in duration-300`}
          >
            <SideBar />
          </div>
          <div className="xl:w-[50%] xl:mx-[27.7%] md:w-[70%] w-[100%]">
            <Component />
          </div>
          <div className="xl:w-[25%] xl:fixed right-[3vw] h-[88vh] hidden md:block overflow-y-scroll">
            <RightSideBar />
          </div>
        </div>
      </Container>
    </>
  );
};

export default DashboardBlock;
