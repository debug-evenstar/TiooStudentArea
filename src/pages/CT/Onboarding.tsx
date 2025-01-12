import React, { useState } from "react";
import { studentPages } from "../../constants/sidelinks";
import Nav from "../../components/layouts/nav";
import StudentInfoModal from "../../components/dashboard/common/StudentInfoModal";

export default function CTOnboarding() {
  const [ sideOpen, setSideOpen] = useState(false);
  const [ isOpen, setOpen ] = useState(false);
  return (
    <div className="flex min-h-screen outfit-font bg-[#f9f7f3]">
      <main className="flex flex-col w-full">
        <Nav hasBack pages={studentPages} {...{ sideOpen, setSideOpen }} />
        <div className="px-0 lg:px-20 relative w-full pb-10 py-10">
          <button onClick={() => setOpen(!isOpen)}>open</button>
        { isOpen && <StudentInfoModal/> }
        </div>
      </main>
    </div>
  );
}
