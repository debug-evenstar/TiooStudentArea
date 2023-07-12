import React from "react";
// import Header from "../components/Header";
// import Sidebar from "../components/Sidebar";

interface DashLayoutProps {
  children?: React.ReactNode;
  title?: string;
}

const DashLayout: React.FC<DashLayoutProps> = ({ children, title }) => {
  return (
    <div className="h-screen top-0 overflow-hidden relative grid w-full grid-cols-[220px,1fr] 2xl:grid-cols-[250px,1fr] gap-0 max-w-full">
      {/* <Sidebar /> */}
      <main className="relative w-full max-w-full min-h-screen overflow-auto">
        {/* <Header title={title} /> */}
        <div className="content max-w-screen-2xl">{children}</div>
      </main>
    </div>
  );
};

export default DashLayout;