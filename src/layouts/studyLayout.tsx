

import { Outlet } from "react-router-dom";
import Nav from "../components/layouts/nav";
import { useState } from "react";


export default function StudyLayout({pages}: any) {
  const [sideOpen, setSideOpen] = useState(false);

  return (
    <div className="flex min-h-screen outfit-font bg-[#f9f7f3]">
      <main className="flex flex-col w-full">
        <Nav hasBack pages={pages} {...{ sideOpen, setSideOpen }} />
        <div className="px-0 lg:px-6 relative w-full">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
