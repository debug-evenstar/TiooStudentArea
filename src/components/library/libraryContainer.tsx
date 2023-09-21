import React, { useState } from "react";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useGetSubjectsQuery } from "../../services/api/subjectSlice";
import { SubjectSkelLoader } from "../Ui/SkeltonLoader";

const libraryContainer = () => {
  const { data: subjects, isLoading, isError } = useGetSubjectsQuery();
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
  const banner: string[] = [
    "https://res.cloudinary.com/dic7regoe/image/upload/v1693303588/praxeum/image_14_1_uedshj.png",
    "https://res.cloudinary.com/dic7regoe/image/upload/v1693303621/praxeum/image_16_ayp3uy.png",
    "https://res.cloudinary.com/dic7regoe/image/upload/v1693303621/praxeum/Frame_1000004400_1_j1coy2.png",
    "https://res.cloudinary.com/dic7regoe/image/upload/v1693303599/praxeum/Frame_1000004400_ug7wgi.png",
    "https://res.cloudinary.com/dic7regoe/image/upload/v1693303582/praxeum/image_17_hou0nj.png",
  ];
  const SubjectItem = ({ item, img }: any) => {
    return (
      <div
        className="subject-con hover:scale-105 duration-100 cursor-pointer"
        onClick={() => gotoSubDetail(item.id)}
      >
        <img src={img} alt={item.naming} className="w-full h-[130px]" />
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
            <p className="lg:text-2xl text-[#1E1B1B80]">({subjects?.subjects.length})</p>
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
            {((subjects && !subjects?.subjects.length) || isError)  && <p className="fw-600 p-5 bg-white">Empty</p>}
            <div
              className={`bg-white grid grid-cols-2 lg:grid-cols-3 px-2 py-6 gap-4 lg:p-8 lg:gap-12`}
            >
              {(subjects &&
                !!subjects?.subjects?.length) &&
                subjects.subjects.map((item: any, index: number) => {
                  const imgIndex = index % banner.length;
                  const img = banner[imgIndex];
                return ( <SubjectItem item={item} key={index} img={img} />)
})}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default libraryContainer;

