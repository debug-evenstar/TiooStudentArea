import React, { FC } from "react";
import { BiArrowToRight } from "react-icons/bi";
import { FaArrowRight } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { selectSidebar } from "../../../redux/reducers/sidebarReducer";

interface ExamCardProps {
  title: string;
  color: string;
  image: any;
  link: string;
}

const ExamCard: FC<ExamCardProps> = ({ title, color, image, link }) => {
  const navigate = useNavigate();

  const isDisabled = link == "#";

  const sidebar = useSelector(selectSidebar);

  const handleClick = () => {
    if (sidebar.examFlag) {
      return navigate("/student/dashboard/home");
    }

    if (link !== "#") navigate(link);
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
        <img src={image} alt="" className="w-full" />
      </div>
      <div className="flex flex-col py-4 justify-between">
        <p className="font-bold text-white">{title}</p>
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
      title: "JAMB/UTME",
      image: "/images/exams/jamb.png",
      color: "#17C880",
      link: "/student/dashboard/onboarding/jamb",
    },
    {
      title: "WAEC",
      image: "/images/exams/waec.png",
      color: "#F1BB87",
      link: "#",
    },
    {
      title: "NECO",
      image: "/images/exams/neco.png",
      color: "#A288A6",
      link: "#",
    },
  ];
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
          {exams.map((exam: ExamCardProps) => (
            <ExamCard key={exam.title} {...exam} />
          ))}
        </div>
      </div>
    </div>
  );
}
