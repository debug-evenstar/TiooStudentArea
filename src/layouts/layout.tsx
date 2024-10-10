import { Outlet, useNavigate } from "react-router-dom";
import Nav from "../components/layouts/nav";
import Sidebar from "../components/layouts/sidebar";
import { useEffect, useState } from "react";
import { studentPages, parentPages } from "../constants/sidelinks";
import { dashboardApiSlice } from "../services/api/dashboardSlice";

export default function DashboardLayout({pages}: any) {

  const [sideOpen, setSideOpen] = useState(false);
  const { data, isLoading,isSuccess } = dashboardApiSlice.useGetMetaDataQuery();
  const navigate = useNavigate();
  

  useEffect(() => {
    // check if the student has gone through exam onboarding
    if(isSuccess && !isLoading){
      console.log(data);
      if(!data.data.exam_data){
        navigate('/student/dashboard');
      }
    }
  },[data,isLoading, isSuccess]);

  return (
    <div className="flex h-screen overflow-hidden outfit-font bg-[#f9f7f3]s bg-[#f9f7f3]">
      <Sidebar pages={pages} {...{ sideOpen, setSideOpen }} />
      <main className="grow flex flex-col w-full lg:w-[79.5%]">
        <Nav pages={pages} {...{ sideOpen, setSideOpen }} />
        <div className="px-3 md:px-6 overflow-hidden grow overflow-y-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
