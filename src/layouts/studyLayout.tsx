

import { Outlet } from "react-router-dom";
import Nav from "../components/layouts/nav";
import { useState } from "react";


export default function StudyLayout({pages}: any) {
  const [sideOpen, setSideOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden outfit-font bg-[#f9f7f3]">
      <main className="grow flex flex-col w-full lg:w-[79.5%]">
        <Nav hasBack pages={pages} {...{ sideOpen, setSideOpen }} />
        <div className="px-3 md:px-6 overflow-hidden grow overflow-y-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
