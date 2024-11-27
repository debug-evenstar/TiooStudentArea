import React, { FC } from "react";
import { BiArrowToRight } from "react-icons/bi";
import { FaArrowRight } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { selectSidebar } from "../../../redux/reducers/sidebarReducer";
import { dashboardApiSlice } from "../../../services/api/dashboardSlice";
import { examsApiSlice } from "../../../services/api/examsSlice";
import Skeleton from "react-loading-skeleton";

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
      // return navigate("/student/dashboard/home");
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

  const isDisabled = false;

  const sidebar = useSelector(selectSidebar);

  const handleClick = () => {
    if (isDisabled) return;

    if (sidebar.examFlag) {
      // return navigate("/student/dashboard/home");
    }
    return navigate(`/student/dashboard/onboarding/admissions/${id}`, {
      state: { color: color },
    });
    // return navigate(link);
  };

  return (
    <div
      onClick={handleClick}
      className="rounded-[20px] px-2 py-3 flex gap-3 w-full lg:w-fit"
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
  ];

  const { data: admissionExams, isLoading: isLoadingAdmissionExams } =
    dashboardApiSlice.useGetExamsQuery("admission");
  const { data: universities, isLoading: isLoadingUni } =
    examsApiSlice.useGetUniversitiesQuery("");

  return (
    <div className="mt-7">
      <div className=" mb-12">
        {/* <div className="border-b relative w-full border-gray-800">
        </div>
        <h1 className="text-center text-lg font-[500] px-2 bottom-3 w-fit mx-auto relative bg-[#f9f7f3] urbanist">Select your </h1> */}
      </div>
      <div>
        <p className="mb-4 text-2xl">University Admission Exams</p>
        <div className="flex gap-5 flex-col lg:flex-row">
          {!isLoadingAdmissionExams ? (
            admissionExams?.data?.map((exam: ExamCardProps, index: number) => (
              <ExamCard
                key={exam.name}
                id={exam.id}
                {...exam}
                color={exams[index]?.color}
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
        <div className="gap-5 grid lg:grid-cols-3 grid-cols-1">
          {!isLoadingUni ? (
            universities?.data?.map(
              (uni: UniversityCardProps, index: number) => (
                <UniversityCard id={uni.id} key={uni.name} {...uni} />
              )
            )
          ) : (
            <>
              <Skeleton
                className="w-full"
                borderRadius={20}
                height={130}
              />
              <Skeleton
                className="w-full"
                borderRadius={20}
                height={130}
              />
              <Skeleton
                className="w-full"
                borderRadius={20}
                height={130}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
