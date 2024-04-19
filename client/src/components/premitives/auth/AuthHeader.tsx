import { Button, Container, Toggle } from "@/components";
import React from "react";

const AuthHeader: React.FC = (): React.JSX.Element => {
  return (
    <Container>
      <div className="w-full py-4 end items-center">
        <div className="center">
          <Toggle />
          <Button className="ml-3 btncolor">Sign Up</Button>
          <Button className="ml-3 btncolor">Login</Button>
        </div>
      </div>
    </Container>
  );
};

export default AuthHeader;
