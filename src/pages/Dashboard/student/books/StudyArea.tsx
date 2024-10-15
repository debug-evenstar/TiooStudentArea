import React, { useCallback, useEffect, useState } from "react";
import StudyResourceCard from "../../../../components/dashboard/common/StudyResourceCard";
import StudyHighlightCard from "../../../../components/dashboard/common/StudyHighlightsCard";
import { BiChevronDown } from "react-icons/bi";
import robot from "../../../../assets/icons/robot.svg";
import StudyLessonAccordion from "../../../../components/dashboard/common/StudyLessonAccordion";
import StudyRelationsCard from "../../../../components/dashboard/common/StudyRelationsCard";
import StudyCreditsCard from "../../../../components/dashboard/common/StudyCreditsCard";
import { useNavigate, useParams } from "react-router-dom";
import { libraryApiSlice } from "../../../../services/api/librarySlice";
import "react-loading-skeleton/dist/skeleton.css";
import Skeleton from "react-loading-skeleton";

const SaveButton = () => {
  return (
    <button className="bg-white shadow active:scale-95 flex relative justify-center mb-5 ">
      <div className="quicksand flex py-2.5 items-center flex-col">
        <p className="uppercase text-primary font-[600] texl-[24px]">
          SAVED TO MY SHELF
        </p>
        <p className="text-sm text-primary ">tap to unsave</p>
      </div>
      <span className="inline-block absolute right-4 -top-2">
        <svg
          className="w-9"
          width="48"
          height="59"
          viewBox="0 0 48 59"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4.01813 58.4469C5.54063 58.4469 6.33188 57.5969 9.37938 54.7269L22.5631 42.0706C23.2369 41.4544 23.5881 41.2794 23.9981 41.2794C24.4081 41.2794 24.8181 41.4844 25.4331 42.0706L40.4044 56.4831C41.5769 57.5981 42.4844 58.4469 43.9794 58.4469C45.8244 58.4469 47.2294 57.3344 47.2294 54.6681V4.71687C47.2294 -1.37688 44.2131 -4.45312 38.1481 -4.45312H9.84813C3.81313 -4.45312 0.765625 -1.37813 0.765625 4.71687V54.6669C0.765625 57.3344 2.20188 58.4469 4.01813 58.4469Z"
            fill="#9C29B2"
          />
        </svg>
      </span>
    </button>
  );
};

const CurrentLessonBar = ({ data }: any) => {
  const navigate = useNavigate();
  const bookId = data?.id;
  const [currentLesson, setCurrentLesson] = useState<any>(null);
  const [currentChapter, setCurrentChapter] = useState<any>(null);
  const [nextLesson, setNextLesson] = useState<any>(null);
  const lesson_progress = data?.lesson_progress;

  const processLessonData = (id: any) => {
    let res = { lesson: null, chapter: null, next_lesson: null };
    let found = false;
    data?.chapters?.forEach((chapter: any, index: number) => {
      chapter?.lessons?.forEach((less: any) => {
        if (less.id == id) {
          res.chapter = { chapter_number: index + 1, ...chapter };
          res.lesson = less;
          // the commented out section is responsible for setting 
          // the actual next lesson. but i'm not too sure of the next up is 
          // the lesson to resume to or literally the next lesson after the current lesson
          // res.next_lesson = less;
          if (!found) {
            res.next_lesson = less;
          }
          found = true;
        }
      });
    });
    return res;
  };

  const latest_record = lesson_progress?.reduce((latest: any, current: any) => {
    return new Date(current.updated_at) > new Date(latest.updated_at)
      ? current
      : latest;
  });


  useEffect(() => {
    if (lesson_progress && lesson_progress.length) {

      const { lesson, chapter, next_lesson } = processLessonData(
        latest_record?.lesson_id
      );
      setCurrentLesson(lesson);
      setCurrentChapter(chapter);
      setNextLesson(next_lesson);
    } else {
      // setCurrentLesson(data?.chapters[0]?.lessons[0]);
    }
  }, [lesson_progress, latest_record]);

  const handleOpenLesson = useCallback(() => {
    navigate(`/books/${bookId}/study`, {
      state: { currentLesson, tag: "resume" },
    });
  }, [navigate, bookId, currentLesson]);

  return (
    <div className="mb-6 mx-auto quicksand  text-primary bg-white items-center shadow-md rounded-md flex justify-between px-4 py-3">
      <div className="flex flex-col gap-3">
        <div className="text-gray-600 text-sm font-semibold">
          <span className="uppercase">
            Chapter {currentChapter?.chapter_number}
          </span>
          &nbsp; | {currentChapter?.name}
        </div>
        <div className="flex items-center space-x-4">
          <div className="text-primary font-semibold">
            NEXT UP:{" "}
            <span className="">
              {nextLesson?.topic} 
            </span>
          </div>
        </div>
      </div>

      <button
        onClick={handleOpenLesson}
        className="bg-primary text-[16px] urbanist active:scale-95 text-white h-10 font-bold py-2 px-8 rounded-md transition duration-300"
      >
        RESUME
      </button>
    </div>
  );
};

const resourcesData = [
  {
    title: "Section summaries",
    resources: [
      {
        name: "Fundamental of quadratic equation summary",
        link: "/path/to/download",
      },
      { name: "Unit and Hehehehehehe summary", link: "/path/to/download" },
    ],
  },
  {
    title: "Additional resources",
    resources: [
      {
        name: "Fundamental of quadratic equation summary",
        link: "/path/to/download",
      },
    ],
  },
];

const relatedTextbooks = [
  { name: "Fundamental of quadratic equation and summary" },
];

const highlights: string[] = [
  "Section summaries",
  "hhshbdhjeklelokn nxhjdmdnnxjkz",
  "tehhnx namkskdjnx  z z z nsjsjkskal",
];

const relations = [
  {
    name: "Fundamental of quadratic equation and summary",
    link: "#",
  },
  {
    name: "Fundamental of quadratic equation and summary",
    link: "#",
  },
  {
    name: "Fundamental of quadratic equation and summary",
    link: "#",
  },
];
const credits = [
  {
    name: "Hay you",
    role: "Content creator",
  },
  {
    name: "James kelly",
    role: "Editor",
  },
  {
    name: "Sarah Wilhem",
    role: "Reviewer",
  },
];

export default function StudyArea() {
  const { bookId } = useParams();
  const [isFreshStart, setFreshStart] = useState(false);
  const { data, isLoading, refetch } = libraryApiSlice.useGetLibraryBookQuery(
    bookId ?? "0"
  );



  const checkFreshStart = () => {
    let res = true;
    data?.data.chapters?.forEach((chapter: any) => {
      chapter.lessons.forEach((lesson: any) => {
        if (lesson.has_started && lesson.status != "LOCKED") {
          res = false;
        }
      });
    });
    return res;
  };

  useEffect(() => {
    setFreshStart(checkFreshStart());
  }, [data]);

  useEffect(() => {
    refetch();
  }, []);


  return (
    <div className="w-full flex flex-col lg:flex-row justify-between px-4 lg:px-12 pt-12 pb-20">
      <div className="h-full lg:w-[68%]">
        <div className="mb-2 flex items-center gap-5">
          {data?.data?.cover_photo ? (
            <div className="w-14 h-14 rounded-full shrink-0 border overflow-hidden">
              <img className="w-full" src={data?.data?.cover_photo} alt="" />
            </div>
          ) : (
            <div className="w-14">
              <Skeleton circle className="w-14 h-14 " />
            </div>
          )}
          <div className="items-center w-10/12">
            {data?.data?.name ? (
              <h1 className="text-primary urbanist font-[500] text-[25px] lg:text-[30px]">
                {data?.data?.name}
              </h1>
            ) : (
              <Skeleton className="w-full h-10" />
            )}
          </div>
        </div>
        <p className="text-base mb-16 urbanist font-[400] text-[#470454]">
          {data?.data?.description || <Skeleton width={500} />}
        </p>
        <div className=" border-t border-black">
          {/* Icon and Divider */}
          <img
            src={robot}
            alt=""
            className="w-14 relative px-2 -top-6 mx-auto bg-[#f9f7f3]"
          />
        </div>

        {data?.data?.lesson_progress?.length &&
        !isFreshStart &&
        data?.data?.chapters?.length ? (
          <CurrentLessonBar data={data?.data} />
        ) : null}

        {data?.data ? (
          data?.data.chapters?.map((chapter: any, index: number) => (
            <StudyLessonAccordion
              key={index}
              bookId={bookId}
              chapter={chapter}
            />
          ))
        ) : (
          <div className="min-h-[10rem]">
            <Skeleton
              className="w-full h-full mb-6"
              borderRadius={16}
              height={240}
            />
            <Skeleton
              className="w-full h-full"
              borderRadius={16}
              height={240}
            />
          </div>
        )}

        {/* <SectionAccordion /> */}
      </div>

      <div className="h-full lg:w-[27%] mt-10 lg:mt-0 flex-col flex gap-y-5">
        {data?.data ? <SaveButton /> : <Skeleton height={60} />}
        <div className="flex flex-col gap-y-6 ">
          <StudyResourceCard sections={resourcesData} />
          <StudyHighlightCard items={highlights} />
          <StudyRelationsCard items={relations} />
          <StudyCreditsCard items={credits} />
        </div>
      </div>
    </div>
  );
}
