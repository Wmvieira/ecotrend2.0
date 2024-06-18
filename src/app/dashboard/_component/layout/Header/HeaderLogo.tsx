import React from "react";
import { FaSeedling } from "react-icons/fa6";

const HeaderLogo: React.FC = () => {
  return (
    <div className="my-auto h-12 w-12 p-2 md:h-full md:w-20 md:p-3">
      <FaSeedling className="h-full w-full text-primary" />
    </div>
  );
};

export default HeaderLogo;
