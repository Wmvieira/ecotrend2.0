import React from "react";
import HeaderSearchMobile from "./HeaderSearchMobile";
import HeaderSearch from "./HeaderSearch";

const HeaderInteraction: React.FC = () => {
  return (
    <div className="my-auto">
      <div className="md:hidden">
        <HeaderSearchMobile />
      </div>
      <div className="hidden md:block">
        <HeaderSearch />
      </div>
    </div>
  );
};

export default HeaderInteraction;
