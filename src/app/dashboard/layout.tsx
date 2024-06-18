import React, { type ReactNode } from "react";
import SideNav from "./_component/layout/SideNav/SideNav";
import Header from "./_component/layout/Header/Header";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="h-screen w-screen">
      <Header />
      <div className="flex h-[calc(100%-4em)] w-full flex-col md:h-[calc(100%-6em)] md:flex-row-reverse">
        <main className="h-full w-full grow overflow-scroll p-2">
          {children}
        </main>
        <SideNav />
      </div>
    </div>
  );
};

export default Layout;
