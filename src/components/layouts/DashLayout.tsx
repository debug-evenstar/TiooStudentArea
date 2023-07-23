import React from "react";
import Header from "./sections/Header";
import AddAuth from "./AddAuth";

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

export default AddAuth(DashLayout);