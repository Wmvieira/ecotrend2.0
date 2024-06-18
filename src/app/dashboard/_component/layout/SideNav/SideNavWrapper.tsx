import React from "react";

interface SideNavWrapperProps {
  children: React.ReactNode;
}

const SideNavWrapper: React.FC<SideNavWrapperProps> = ({ children }) => {
  return (
    <div className="flex w-full flex-row justify-around gap-3 rounded-full p-1 md:flex-col md:justify-center md:gap-5">
      {children}
    </div>
  );
};

export default SideNavWrapper;
