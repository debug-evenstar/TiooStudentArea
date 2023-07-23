import React, { useState } from "react";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useGetSubjectsQuery } from "../../services/api/subjectSlice";
import { SubjectSkelLoader } from "../Ui/SkeltonLoader";
import { dummy } from "../dashboard/subjectContainer";

const SyllabusContainer = () => {
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
    navigate(`/library/subjects/${id}`);
  };

  const SubjectItem = ({ item }: any) => {
    return (
      <div
        className="subject-con hover:scale-105 duration-100 cursor-pointer"
        onClick={() => gotoSubDetail(item.name)}
      >
        <img src={item.img} alt={item.naming} className="w-full h-[130px]" />
        <div className="min-h-[100px] p-3">
          <p className="fw-600">{item.name}</p>
          <p className="fs-400">{item.content}</p>
        </div>
      </div>
    );
  };
  return (
    <>
      <div className="border border rounded-[18px] overflow-hidden rue">
        <div className="flex items-center p-5 bg-brown justify-between">
          <div className="flex items-center gap-x-2">
            <p className="fw-600 lg:text-2xl">School syllabus</p>
            <p className="lg:text-2xl text-[#1E1B1B80]">({dummy.length})</p>
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
            {isLoading && <SubjectSkelLoader />}
            {/* {dummy && !dummy.length || isError  && <p className="fw-600 p-5 bg-white">Empty</p>} */}
            <div
              className={`bg-white grid lg:grid-cols-3 p-8 gap-12`}
            >
              {dummy &&
                !!dummy?.length &&
                dummy.map((item: any, index: number) => (
                  <SubjectItem item={item} key={index} />
                ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default SyllabusContainer;