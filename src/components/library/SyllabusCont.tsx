import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SubjectSkelLoader } from "../Ui/SkeltonLoader";
import { EmptyState1 } from "../Ui/EmptyStates";
import { LibraryTextbookType } from "../../utils/dataTypes/library";
import { useGetLibraryQuery } from "../../services/api/librarySlice";

const SyllabusContainer = () => {
  const { data: library, isLoading } = useGetLibraryQuery();

  const navigate = useNavigate();

  const gotoSubDetail = (id: any) => {
    navigate(`/library/subjects/${id}`);
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
        <img
          src={img}
          alt={item.naming}
          className="w-full h-[100px] lg:h-[130px]"
        />
        <div className="min-h-[100px] p-3">
          <p className="fw-600 fs-500 lg:fs-600">{item.naming}</p>
          <p className="fs-400">{item.description}</p>
        </div>
      </div>
    );
  };
  const syllabus = library?.data.filter(
    (where: LibraryTextbookType) => where.tab === 0
  );
  const curricular = library?.data.filter(
    (where: LibraryTextbookType) => where.tab === 1
  );
  const games = library?.data.filter(
    (where: LibraryTextbookType) => where.tab === 2
  );
    useEffect(() => {
      setSylls(syllabus)
      // eslint-disable-next-line
    }, [library])
  const textBookOptions = () => {
    const matchingLogs = categoryOptions?.filter((obj) => {
      // You can specify your filter condition here.
      return syllabus?.some((obj2: any) => obj.id === obj2.subject_category);
    });
    return matchingLogs;
  };
  const [sylls, setSylls] = useState<LibraryTextbookType[]>(syllabus);
  const FilterSylls = (id: any) => {
    if (Number(id) === 0) {
      setSylls(syllabus);
    } else {
      setSylls(syllabus.filter((where: any) => where.subject_category === Number(id)));
    }
  };

  return (
    <>
      <div className="border border rounded-[18px] overflow-hidden rue">
        <div className="flex items-center p-5 bg-brown justify-between">
          <div className="flex items-center gap-x-2">
            <p className="fw-600 lg:text-2xl">School Books</p>
            <p className="lg:text-2xl text-[#1E1B1B80]">({syllabus?.length})</p>
          </div>
          <div>
            <select
              onChange={(e) => FilterSylls(e.target.value)}
              className="p-2 bg-transparent fw-600 lg:text-xl outline-none text-right"
            >
              <option value={0}>All Subjects</option>
              {textBookOptions().map((itm, i) => (
                <option value={itm.id} key={i}>{itm.name}</option>
              ))}
            </select>
          </div>
        </div>
        <div>
          {isLoading && <SubjectSkelLoader />}
          {syllabus && !syllabus.length && (
            <div className="py-6 bg-white">
              <EmptyState1 size={240} msg="No School Book Available Yet" />
            </div>
          )}
          <div
            className={`bg-white grid grid-cols-2 lg:grid-cols-3 px-2 py-6 gap-4 lg:p-8 lg:gap-12`}
          >
            {sylls &&
              !!sylls?.length &&
              sylls.map((item: any, index: number) => {
                let imgIndex = Math.floor(Math.random() * banner.length);
                // const imgIndex = index % banner.length;
                const img = banner[imgIndex];
                return <SubjectItem item={item} key={index} img={img} />;
              })}
          </div>
        </div>
      </div>
      <div className="border border rounded-[18px] mt-5 lg:mt-12 overflow-hidden rue">
        <div className="flex items-center p-5 bg-brown justify-between">
          <div className="flex items-center gap-x-2">
            <p className="fw-600 lg:text-2xl">Extra-Curricula</p>
            <p className="lg:text-2xl text-[#1E1B1B80]">
              ({curricular?.length})
            </p>
          </div>
          <div></div>
        </div>
        <div>
          {isLoading && <SubjectSkelLoader />}
          {curricular && !curricular.length && (
            <div className="py-6 bg-white">
              <EmptyState1 size={240} msg="No Extra-Curricula Available Yet" />
            </div>
          )}
          <div
            className={`bg-white grid grid-cols-2 lg:grid-cols-3 px-2 py-6 gap-4 lg:p-8 lg:gap-12`}
          >
            {curricular &&
              !!curricular?.length &&
              curricular.map((item: any, index: number) => {
                const imgIndex = index % banner.length;
                const img = banner[imgIndex];
                return <SubjectItem item={item} key={index} img={img} />;
              })}
          </div>
        </div>
      </div>
      <div className="border border rounded-[18px] mt-5 lg:mt-12 overflow-hidden rue">
        <div className="flex items-center p-5 bg-brown justify-between">
          <div className="flex items-center gap-x-2">
            <p className="fw-600 lg:text-2xl">Games</p>
            <p className="lg:text-2xl text-[#1E1B1B80]">({games?.length})</p>
          </div>
          <div></div>
        </div>
        <div>
          {isLoading && <SubjectSkelLoader />}
          {games && !games.length && (
            <div className="py-6 bg-white">
              <EmptyState1 size={240} msg="No Games Available Yet" />
            </div>
          )}
          <div
            className={`bg-white grid grid-cols-2 lg:grid-cols-3 px-2 py-6 gap-4 lg:p-8 lg:gap-12`}
          >
            {games &&
              !!games?.length &&
              games.map((item: any, index: number) => {
                const imgIndex = index % banner.length;
                const img = banner[imgIndex];
                return <SubjectItem item={item} key={index} img={img} />;
              })}
          </div>
        </div>
      </div>
    </>
  );
};

export default SyllabusContainer;
const categoryOptions = [
  { id: 1, name: "Mathematics" },
  { id: 2, name: "English" },
  { id: 3, name: "Basic Science" },
  { id: 4, name: "Quantitative Reasoning" },
  { id: 5, name: "Verbal Reasoning" },
  { id: 6, name: "CRK" },
  { id: 7, name: "History" },
  { id: 8, name: "Civic Education" },
  { id: 9, name: "Security" },
  { id: 10, name: "Business Studies" },
  { id: 11, name: "Visual Arts" },
  { id: 12, name: "Geography" },
];
