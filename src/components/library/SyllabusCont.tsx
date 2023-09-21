import React, { useState } from "react";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useGetSubjectsQuery } from "../../services/api/subjectSlice";
import { SubjectSkelLoader } from "../Ui/SkeltonLoader";
import { dummy } from "../dashboard/subjectContainer";
import { EmptyState1 } from "../Ui/EmptyStates";

const SyllabusContainer = () => {
  const { data: subjects, isLoading, } = useGetSubjectsQuery();
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
  const [isClosed2, setClosed2] = useState<boolean>(false);
  const [open2, setOpen2] = useState<boolean>(true);
  const closeContainer2 = () => {
    setClosed2(true);
    setTimeout(() => {
      setOpen2(!open);
      setClosed2(false);
    }, 450);
  };

  const [isClosed3, setClosed3] = useState<boolean>(false);
  const [open3, setOpen3] = useState<boolean>(true);
  const closeContainer3 = () => {
    setClosed3(true);
    setTimeout(() => {
      setOpen3(!open);
      setClosed3(false);
    }, 450);
  };
  const gotoSubDetail = (id: any) => {
    // navigate(`/library/subjects/${id}`);
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
        onClick={() => gotoSubDetail(item.name)}
      >
        <img src={img} alt={item.naming} className="w-full h-[100px] lg:h-[130px]" />
        <div className="min-h-[100px] p-3">
          <p className="fw-600 fs-500 lg:fs-600">{item.naming}</p>
          <p className="fs-400">{item.description}</p>
        </div>
      </div>
    );
  };
  const syllabus = looks.filter((where) => where.tab === 1)
  const curricular = looks.filter((where) => where.tab === 2)
  const games = looks.filter((where) => where.tab === 3)
  return (
    <>
      <div className="border border rounded-[18px] overflow-hidden rue">
        <div className="flex items-center p-5 bg-brown justify-between">
          <div className="flex items-center gap-x-2">
            <p className="fw-600 lg:text-2xl">School syllabus</p>
            <p className="lg:text-2xl text-[#1E1B1B80]">({syllabus?.length})</p>
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
            {(syllabus && !syllabus.length) && <div className="py-6 bg-white"><EmptyState1 size={240} msg="No Games Available Yet"/></div>}
            <div
              className={`bg-white grid grid-cols-2 lg:grid-cols-3 px-2 py-6 gap-4 lg:p-8 lg:gap-12`}
            >
              {syllabus &&
                !!syllabus?.length &&
                syllabus.map((item: any, index: number) => {
                  const imgIndex = index % banner.length;
                  const img = banner[imgIndex];
                  return (
                  <SubjectItem item={item} key={index} img={img} />
                  )
                })}
            </div>
          </div>
        )}
      </div>
      <div className="border border rounded-[18px] mt-5 lg:mt-12 overflow-hidden rue">
        <div className="flex items-center p-5 bg-brown justify-between">
          <div className="flex items-center gap-x-2">
            <p className="fw-600 lg:text-2xl">Co-Curricula</p>
            <p className="lg:text-2xl text-[#1E1B1B80]">({curricular?.length})</p>
          </div>
          <div>
            {open2 ? (
              <FaAngleDown
                className="text-xl cursor-pointer"
                onClick={closeContainer2}
              />
            ) : (
              <FaAngleUp
                className="text-xl cursor-pointer"
                onClick={() => setOpen2(true)}
              />
            )}
          </div>
        </div>
        {open2 && (
          <div className={`${
            isClosed2 ? "dropoff" : "dropin"
          }`}>
            {isLoading && <SubjectSkelLoader />}
            {(curricular && !curricular.length) && <div className="py-6 bg-white"><EmptyState1 size={240} msg="No Games Available Yet"/></div>}
            <div
              className={`bg-white grid grid-cols-2 lg:grid-cols-3 px-2 py-6 gap-4 lg:p-8 lg:gap-12`}
            >
              {curricular &&
                !!curricular?.length &&
                curricular.map((item: any, index: number) => {
                  const imgIndex = index % banner.length;
                  const img = banner[imgIndex];
                  return (
                  <SubjectItem item={item} key={index} img={img} />
                  )
                })}
            </div>
          </div>
        )}
      </div>
      <div className="border border rounded-[18px] mt-5 lg:mt-12 overflow-hidden rue">
        <div className="flex items-center p-5 bg-brown justify-between">
          <div className="flex items-center gap-x-2">
            <p className="fw-600 lg:text-2xl">Games</p>
            <p className="lg:text-2xl text-[#1E1B1B80]">({games?.length})</p>
          </div>
          <div>
            {open3 ? (
              <FaAngleDown
                className="text-xl cursor-pointer"
                onClick={closeContainer3}
              />
            ) : (
              <FaAngleUp
                className="text-xl cursor-pointer"
                onClick={() => setOpen3(true)}
              />
            )}
          </div>
        </div>
        {open3 && (
          <div className={`${
            isClosed3 ? "dropoff" : "dropin"
          }`}>
            {isLoading && <SubjectSkelLoader />}
            {(games && !games.length) && <div className="py-6 bg-white"><EmptyState1 size={240} msg="No Games Available Yet"/></div>}
            <div
              className={`bg-white grid grid-cols-2 lg:grid-cols-3 px-2 py-6 gap-4 lg:p-8 lg:gap-12`}
            >
              {games &&
                !!games?.length &&
                games.map((item: any, index: number) => {
                  const imgIndex = index % banner.length;
                  const img = banner[imgIndex];
                  return (
                  <SubjectItem item={item} key={index} img={img} />
                  )
                })}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default SyllabusContainer;

const looks = [
  {
    id: 27,
    naming: "Four Classe library",
    description: "desctipion can be empty",
    library: true,
    tab: 1,
    library_status: null,
    subject_category: null,
    SchoolManagementId: 1,
    lessons: 0,
    class: 4
},
{
    id: 28,
    naming: "Seventh Classe library",
    description: "desctipion can be empty",
    library: true,
    tab: 1,
    library_status: null,
    subject_category: null,
    SchoolManagementId: 1,
    lessons: 0,
    class: 4
},
{
    id: 29,
    naming: "Ninth Classe library",
    description: "desctipion can be empty",
    library: true,
    tab: 1,
    library_status: null,
    subject_category: null,
    SchoolManagementId: 1,
    lessons: 0,
    class: 4
},
{
    id: 30,
    naming: "Tenth Classe library",
    description: "desctipion can be empty",
    library: true,
    tab: 2,
    library_status: null,
    subject_category: null,
    SchoolManagementId: 1,
    lessons: 0,
    class: 4
},
{
    id: 31,
    naming: "Tenth Classe library",
    description: "desctipion can be empty",
    library: true,
    tab: 2,
    library_status: null,
    subject_category: 5,
    SchoolManagementId: 1,
    lessons: 0,
    class: 4
}
]