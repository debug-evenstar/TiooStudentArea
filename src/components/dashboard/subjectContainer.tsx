import React, { useState } from "react";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useGetSubjectsQuery } from "../../services/api/subjectSlice";
import { SubjectSkelLoader } from "../Ui/SkeltonLoader";

const SubjectContainer = () => {
  const { data: subjects, isLoading, isError, refetch } = useGetSubjectsQuery();
  const navigate = useNavigate();
  const [isClosed, setClosed] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(true);
  const closeContainer = () => {
    setClosed(true);
    setTimeout(() => {
      setOpen(!open);
      setClosed(false);
    }, 450);
  };
  const gotoSubDetail = (id: any) => {
    navigate(`/home/subjects/${id}`);
  };

  const SubjectItem = ({ item }: any) => {
    return (
      <div
        className="subject-con hover:scale-105 duration-100 cursor-pointer"
        onClick={() => gotoSubDetail(item.name)}
      >
        <img src={item.image} alt={item.naming} className="w-full h-[130px]" />
        <div className="min-h-[100px] p-3">
          <p className="fw-600">{item.naming}</p>
          <p className="fs-400">{item.description}</p>
        </div>
      </div>
    );
  };
  return (
    <>
      <div className="border border rounded-[18px] overflow-hidden rue">
        <div className="flex items-center p-5 bg-brown justify-between">
          <div className="flex items-center gap-x-2">
            <p className="fw-600 lg:text-2xl">Subjects</p>
            <p className="lg:text-2xl">(5)</p>
          </div>
          <div>
            {open ? (
              <FaAngleDown
                className="text-xl cursor-pointer"
                onClick={closeContainer}
              />
            ) : (
              <FaAngleUp
                className="text-xl cursor-pointer"
                onClick={() => setOpen(true)}
              />
            )}
          </div>
        </div>
        {open && (
          <div className={`${
            isClosed ? "dropoff" : "dropin"
          }`}>
            <div
              className={`bg-white grid lg:grid-cols-3 p-8 gap-12`}
            >
              {subjects &&
                !!subjects?.subjects?.length &&
                subjects.subjects.map((item: any, index: number) => (
                  <SubjectItem item={item} key={index} />
                ))}
            </div>
            {isLoading && <SubjectSkelLoader />}
            {subjects && !subjects?.subjects.length || isError  && "Empty"}
          </div>
        )}
      </div>
    </>
  );
};

export default SubjectContainer;

const dummy = [
  {
    name: "Basic Science",
    img: "https://res.cloudinary.com/dic7regoe/image/upload/v1689279991/praxeum/image_14_jeqsjo.png",
    content: "Everything science, the environment, and phenomenon.",
    id: 1,
  },
  {
    name: "Mathematics",
    img: "https://res.cloudinary.com/dic7regoe/image/upload/v1689279991/praxeum/image_14_jeqsjo.png",
    content:
      "Calculations made easier. Learn to add, multiply, divide & subtract.",
    id: 2,
  },
  {
    name: "Programming",
    img: "https://res.cloudinary.com/dic7regoe/image/upload/v1689279991/praxeum/image_14_jeqsjo.png",
    content: "Understand Programming languages.",
    id: 3,
  },
  {
    name: "English - Grammar",
    img: "https://res.cloudinary.com/dic7regoe/image/upload/v1689279991/praxeum/image_14_jeqsjo.png",
    content:
      "Learners will develop their speaking and listening skills to communicate",
    id: 4,
  },
  {
    name: "Computer",
    img: "https://res.cloudinary.com/dic7regoe/image/upload/v1689279991/praxeum/image_14_jeqsjo.png",
    content:
      "Calculations made easier. Learn to add, multiply, divide & subtract.",
    id: 5,
  },
];
