import React from "react";
import Header from "./sections/Header";
// import Header from "../components/Header";
// import Sidebar from "../components/Sidebar";

interface DashLayoutProps {
  children?: React.ReactNode;
  title?: string;
}

const DashLayout: React.FC<DashLayoutProps> = ({ children, title }) => {
  return (
    <div className="">
      <Header/>
      <main className="relative w-full max-w-full min-h-screen overflow-auto">
        <div className="content">{children}</div>
      </main>
    </div>
  );
};

export default DashLayout;