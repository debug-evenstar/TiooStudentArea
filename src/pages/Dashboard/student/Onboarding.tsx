import React, { FC } from "react";
import { BiArrowToRight } from "react-icons/bi";
import { FaArrowRight } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { selectSidebar } from "../../../redux/reducers/sidebarReducer";
import { dashboardApiSlice } from "../../../services/api/dashboardSlice";
import { examsApiSlice } from "../../../services/api/examsSlice";
import Skeleton from "react-loading-skeleton";
import { FaClock } from "react-icons/fa6";

interface UniversityCardProps {
  name: string;
  image_path: string;
  id?: number | string;
}
const UniversityCard: FC<UniversityCardProps> = ({ name, id, image_path }) => {
  const navigate = useNavigate();

  const isDisabled = false;

  const sidebar = useSelector(selectSidebar);

  const handleClick = () => {
    if (isDisabled) return;

    if (sidebar.examFlag) {
      // return navigate(`/student/dashboard/${id}`);
    }
    return navigate(`/student/dashboard/onboarding/university/${id}`);
  };

  return (
    <div
      onClick={handleClick}
      className="rounded-[20px] px-2 py-3 flex gap-3 w-full bg-white shadow"
      style={{
        // backgroundColor: color,
        cursor: isDisabled ? "not-allowed" : "pointer",
      }}
    >
      <div className="w-[6rem] p-2 rounded-[20px] bg-white">
        <img src={image_path} alt="" className="w-full" />
      </div>
      <div className="flex flex-col py-4 justify-between">
        <p className="font-bold text-black">{name}</p>
        <div className="flex items-center gap-x-10 mr-10 text-black justify-between">
          <span>{isDisabled ? "Coming soon" : "Examination"}</span>
          {/* <FaArrowRight color={isDisabled ? color : "white"} /> */}
        </div>
      </div>
    </div>
  );
};

interface ExamCardProps {
  name?: string;
  color?: string;
  image_path?: any;
  id?: any;
}

const ExamCard: FC<ExamCardProps> = ({ name, color, id, image_path }) => {
  const navigate = useNavigate();

  const isDisabled = !name?.toLowerCase().includes("jamb");

  const sidebar = useSelector(selectSidebar);

  const handleClick = () => {
    if (isDisabled) return;

    if (sidebar.examFlag) {
      return navigate(`/student/dashboard/exam/${id}`);
    }
    return navigate(`/student/dashboard/onboarding/admissions/${id}`, {
      state: { color: color },
    });
  };

  return (
    <div
      onClick={handleClick}
      className="rounded-[20px] px-2 py-3 flex gap-3 w-full h-[7rem] lg:w-fit"
      style={{
        backgroundColor: color,
        cursor: isDisabled ? "not-allowed" : "pointer",
      }}
    >
      <div className="w-[6rem] p-2 rounded-[20px] bg-white">
        <img src={image_path} alt="" className="w-full" />
      </div>
      <div className="flex flex-col py-4 justify-between">
        <p className="font-bold text-white">{name}</p>
        <div className="flex items-center gap-x-10 mr-10 text-white justify-between">
          <span>{isDisabled ? "Coming soon" : "Examination"}</span>
          <FaArrowRight color={isDisabled ? color : "white"} />
        </div>
      </div>
    </div>
  );
};

export default function Onboarding() {
  // routes set to # is disabled
  const exams: ExamCardProps[] = [
    {
      color: "#17C880",
    },
    {
      color: "#F1BB87",
    },
    {
      color: "#A288A6",
    },
    {
      color: "#03D8A6",
    },
    {
      color: "#823886",
    },
  ];

  const { data: admissionExams, isLoading: isLoadingAdmissionExams } =
    dashboardApiSlice.useGetExamsQuery("admission");
  const { data: universities, isLoading: isLoadingUni } =
    examsApiSlice.useGetUniversitiesQuery("");

  return (
    <div className="mt-7 pb-12">
      <div className=" mb-12">
        {/* <div className="border-b relative w-full border-gray-800">
        </div>
        <h1 className="text-center text-lg font-[500] px-2 bottom-3 w-fit mx-auto relative bg-[#f9f7f3] urbanist">Select your </h1> */}
      </div>
      <div>
        <p className="mb-4 text-2xl">Pre-University Exams</p>
        <div className="gap-5 grid grid-cols-1 lg:grid-cols-3">
          {!isLoadingAdmissionExams ? (
            admissionExams?.data?.map((exam: ExamCardProps, index: number) => (
              <ExamCard
                key={exam.name}
                id={exam.id}
                {...exam}
                color={exams[index % exams.length]?.color}
              />
            ))
          ) : (
            <>
              <Skeleton
                className="w-full"
                borderRadius={20}
                height={130}
                width={300}
              />
              <Skeleton
                className="w-full"
                borderRadius={20}
                height={130}
                width={300}
              />
              <Skeleton
                className="w-full"
                borderRadius={20}
                height={130}
                width={300}
              />
            </>
          )}
        </div>
      </div>

      <div className="mt-12">
        <p className="mb-4 text-2xl">University Exams</p>
        <div
          className={`gap-5 ${
            universities?.data?.length > 10 ? "grid" : "w-full"
          } lg:grid-cols-3 grid-cols-1`}
        >
          {!isLoadingUni ? (
            universities?.data.length > 10 ? (
              universities?.data?.map(
                (uni: UniversityCardProps, index: number) => (
                  <UniversityCard id={uni.id} key={uni.name} {...uni} />
                )
              )
            ) : (
              <div className=" mx-auto w-full">
                <p className="text-center py-24 rounded-[18px] border-2 shadow mx-auto w-full border-gray-300 text-4xl text-gray-500">
                 Coming soon
                </p>
              </div>
            )
          ) : (
            <>
              <Skeleton className="w-full" borderRadius={20} height={130} />
              <Skeleton className="w-full" borderRadius={20} height={130} />
              <Skeleton className="w-full" borderRadius={20} height={130} />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
