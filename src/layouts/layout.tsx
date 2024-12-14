import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Nav from "../components/layouts/nav";
import Sidebar from "../components/layouts/sidebar";
import { useEffect, useRef, useState } from "react";
import { studentPages, parentPages } from "../constants/sidelinks";
import { dashboardApiSlice } from "../services/api/dashboardSlice";
import { useDispatch, useSelector } from "react-redux";
import { selectSidebar, setExamFlag } from "../redux/reducers/sidebarReducer";
import { ExamIcon } from "../components/Icons";
import BannerAnnouncement from "../components/Common/Announcement";
import {
  selectStudyPlans,
  setUserMetaData,
  setUserStudyPlan,
  setUserStudyPlans,
} from "../redux/reducers/userReducer";
import { studyPlanSlice } from "../services/api/studyPlanSlice";
import { examsApiSlice } from "../services/api/examsSlice";

export default function DashboardLayout({ pages }: any) {
  const [sideOpen, setSideOpen] = useState(false);
  const { data, isLoading, isSuccess } =
    dashboardApiSlice.useGetMetaDataQuery();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const outletRef = useRef<any>();
  const { pathname } = useLocation();

  const studyPlanRequest = studyPlanSlice.useGetStudyPlansQuery(null);
  // const registeredExamsRequests = examsApiSlice.useGetAccountExamsQuery(null);
  const userPlans = useSelector(selectStudyPlans);
  const registeredExamsRequests = examsApiSlice.useGetAccountExamsQuery(null);

  useEffect(() => {
    const subLinks = registeredExamsRequests?.data?.data?.map((e: any) => ({
      name: e.name,
      id: e.id,
      route: `/student/dashboard/exam/${e.id}`,
    }));

    const examLink = {
      name: "Exam prep",
      Icon: ExamIcon,
      route: "/student/dashboard",
      submenu: subLinks ?? [],
    };

    if (subLinks?.length) {
      const copied = [...pages];
      copied.splice(1, 0, examLink);
      setLinks(copied);
    }
  }, [registeredExamsRequests.data]);

  useEffect(() => {
    dispatch(setUserStudyPlans(studyPlanRequest.data?.data));
  }, [studyPlanRequest]);

  useEffect(() => {}, [pathname]);

  useEffect(() => {
    // check if the student has gone through exam onboarding
    if (isSuccess && !isLoading) {
      if (!data?.data?.exam_data) {
        navigate("/student/dashboard");
      } else {
        dispatch(setUserMetaData(data.data));
        dispatch(setExamFlag(true));
      }
    }
  }, [data, isLoading, isSuccess]);

  const [links, setLinks] = useState(pages);
  const sidebar = useSelector(selectSidebar);

  useEffect(() => {
    setLinks(pages);
  }, [pages]);

  useEffect(() => {
    outletRef.current?.scrollTo({
      top: 0,
      left: 0,
    });
  }, [pathname]);

  return (
    <div className="flex h-screen overflow-hidden outfit-font bg-[#f9f7f3]s bg-[rgb(249,247,243)]">
      <Sidebar links={links} {...{ sideOpen, setSideOpen }} />
      <main className="grow flex flex-col w-full lg:w-[79.5%]">
        <Nav pages={links} {...{ sideOpen, setSideOpen }} />
        <div
          className="px-3 md:px-6 overflow-hidden grow overflow-y-auto"
          ref={outletRef}
        >
          <Outlet />
        </div>
      </main>
    </div>
  );
}

// import { Outlet, useLocation, useNavigate } from "react-router-dom";
// import Nav from "../components/layouts/nav";
// import Sidebar from "../components/layouts/sidebar";
// import { useEffect, useRef, useState } from "react";
// import { studentPages, parentPages } from "../constants/sidelinks";
// import { dashboardApiSlice } from "../services/api/dashboardSlice";
// import { useDispatch, useSelector } from "react-redux";
// import { selectSidebar, setExamFlag } from "../redux/reducers/sidebarReducer";
// import { ExamIcon } from "../components/Icons";
// import BannerAnnouncement from "../components/Common/Announcement";
// import { setUserMetaData, setUserStudyPlan } from "../redux/reducers/userReducer";
// import { studyPlanSlice } from "../services/api/studyPlanSlice";

// export default function DashboardLayout({ pages }: any) {
//   const [sideOpen, setSideOpen] = useState(false);
//   const { data, isLoading, isSuccess } =
//     dashboardApiSlice.useGetMetaDataQuery();
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const outletRef = useRef<any>();
//   const { pathname } = useLocation();

//   const studyPlanRequest = studyPlanSlice.useGetStudyPlanQuery(null);

//   useEffect(() => {
//     dispatch(setUserStudyPlan(studyPlanRequest.data?.data));
//   }, [studyPlanRequest]);

//   useEffect(() => {
//     // check if the student has gone through exam onboarding
//     if (isSuccess && !isLoading) {
//       if (!data?.data?.exam_data) {
//         navigate("/student/dashboard");
//       } else {
//         dispatch(setUserMetaData(data.data));
//         dispatch(setExamFlag(true));
//       }
//     }
//   }, [data, isLoading, isSuccess]);

//   const [links, setLinks] = useState(pages);
//   const sidebar = useSelector(selectSidebar);

//   const examLink = {
//     name: "Exam prep",
//     Icon: ExamIcon,
//     route: "/student/dashboard",
//     submenu: [
//       {
//         name: "JAMB",
//         route: "/student/dashboard/home",
//       },
//     ],
//   };

//   useEffect(() => {
//     setLinks(pages);
//   }, [pages]);

//   useEffect(() => {
//     setTimeout(() => {
//       if (sidebar.examFlag) {
//         const copied = [...pages];
//         copied.splice(1, 0, examLink);
//         setLinks(copied);
//       }
//     }, 2000);
//   }, [sidebar.examFlag]);

//   useEffect(() => {
//     outletRef.current?.scrollTo({
//       top: 0,
//       left: 0,
//       // behavior: "smooth", // Optional if you want to skip the scrolling animation
//     });
//   }, [pathname]);

//   return (
//     <div className="flex h-screen overflow-hidden outfit-font bg-[#f9f7f3]s bg-[rgb(249,247,243)]">
//       <Sidebar links={links} {...{ sideOpen, setSideOpen }} />
//       <main className="grow flex flex-col w-full lg:w-[79.5%]">
//         <Nav pages={links} {...{ sideOpen, setSideOpen }} />
//         <div className="px-3 md:px-6 overflow-hidden grow overflow-y-auto" ref={outletRef}>
//           <Outlet />
//         </div>
//       </main>
//     </div>
//   );
// }
