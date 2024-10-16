import { Outlet, useNavigate } from "react-router-dom";
import Nav from "../components/layouts/nav";
import Sidebar from "../components/layouts/sidebar";
import { useEffect, useState } from "react";
import { studentPages, parentPages } from "../constants/sidelinks";
import { dashboardApiSlice } from "../services/api/dashboardSlice";
import { useDispatch, useSelector } from "react-redux";
import { selectSidebar, setExamFlag } from "../redux/reducers/sidebarReducer";
import { ExamIcon } from "../components/Icons";
import BannerAnnouncement from "../components/Common/Announcement";

export default function DashboardLayout({ pages }: any) {
  const [sideOpen, setSideOpen] = useState(false);
  const { data, isLoading, isSuccess } =
    dashboardApiSlice.useGetMetaDataQuery();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    // check if the student has gone through exam onboarding
    if (isSuccess && !isLoading) {
      if (!data.data.exam_data) {
        navigate("/student/dashboard");
      } else {
        dispatch(setExamFlag(true));
      }
    }
  }, [data, isLoading, isSuccess]);

  const [links, setLinks] = useState(pages);
  const sidebar = useSelector(selectSidebar);

  const examLink = {
    name: "Exam prep",
    Icon: ExamIcon,
    route: "/student/dashboard",
    submenu: [
      {
        name: "JAMB",
        route: "/student/dashboard/home",
      },
    ],
  };

  useEffect(() => {
    setLinks(pages);
  }, [pages]);

  useEffect(() => {
    setTimeout(() => {
      if (sidebar.examFlag) {
        const copied = [...pages];
        copied.splice(1, 0, examLink);
        setLinks(copied);
      }
    }, 2000);
  }, [sidebar.examFlag]);

  return (
    <div className="flex h-screen overflow-hidden outfit-font bg-[#f9f7f3]s bg-[rgb(249,247,243)]">
      <Sidebar links={links} {...{ sideOpen, setSideOpen }} />
      <BannerAnnouncement/>
      <main className="grow flex flex-col w-full lg:w-[79.5%]">
        <Nav pages={links} {...{ sideOpen, setSideOpen }} />
        <div className="px-3 md:px-6 overflow-hidden grow overflow-y-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
